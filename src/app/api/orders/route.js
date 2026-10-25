import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { INITIAL_GROCERY_ORDERS } from "@/data/groceryData";

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const phone = searchParams.get("phone");

    let filter = {};
    if (code) {
      filter.code = code.trim().toUpperCase();
    }
    if (phone) {
      filter.$or = [
        { "recipientInfo.recipientPhone": { $regex: phone, $options: "i" } },
        { "recipientInfo.senderPhone": { $regex: phone, $options: "i" } },
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    if (orders.length === 0 && !code && !phone) {
      return NextResponse.json({
        data: INITIAL_GROCERY_ORDERS,
        source: "fallback_defaults",
      });
    }

    return NextResponse.json({
      data: orders.map((o) => ({ id: o._id.toString(), ...o.toObject() })),
      source: "mongodb",
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({
      data: INITIAL_GROCERY_ORDERS,
      source: "fallback_error",
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const randomCodeNum = Math.floor(1000 + Math.random() * 9000);
    const code = body.code || `TAPHOA-${randomCodeNum}`;

    const newOrder = await Order.create({
      ...body,
      code,
    });

    return NextResponse.json({
      success: true,
      data: { id: newOrder._id.toString(), ...newOrder.toObject() },
    });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
