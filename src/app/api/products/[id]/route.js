import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    let product;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    return NextResponse.json({
      data: { id: product._id.toString(), ...product.toObject() },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    let updated;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Product.findByIdAndUpdate(id, body, { new: true });
    } else {
      updated = await Product.findOneAndUpdate({ slug: id }, body, { new: true });
    }

    if (!updated) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm để cập nhật" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: updated._id.toString(), ...updated.toObject() },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    let deleted;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deleted = await Product.findByIdAndDelete(id);
    } else {
      deleted = await Product.findOneAndDelete({ slug: id });
    }

    return NextResponse.json({
      success: true,
      message: "Đã xóa sản phẩm thành công",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
