import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { DEFAULT_GROCERY_PRODUCTS } from "@/data/groceryData";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("query");

    let filter = {};
    if (category && category !== "Tất cả") {
      filter.category = category;
    }
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    // If database is empty, return default mock products
    if (products.length === 0 && !category && !query) {
      return NextResponse.json({
        data: DEFAULT_GROCERY_PRODUCTS,
        source: "fallback_defaults",
      });
    }

    return NextResponse.json({
      data: products.map((p) => ({
        id: p._id.toString(),
        ...p.toObject(),
      })),
      source: "mongodb",
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    // Return defaults gracefully if DB is not configured yet
    return NextResponse.json({
      data: DEFAULT_GROCERY_PRODUCTS,
      source: "fallback_error",
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const slug = body.slug || `${slugify(body.name)}-${Date.now().toString().slice(-4)}`;

    const newProduct = await Product.create({
      ...body,
      slug,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: newProduct._id.toString(),
        ...newProduct.toObject(),
      },
    });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
