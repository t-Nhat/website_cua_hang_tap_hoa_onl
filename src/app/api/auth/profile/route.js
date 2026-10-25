import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export async function PUT(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, email, name, phone, address } = body;

    if (!id && !email) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin nhận diện tài khoản (id hoặc email)." },
        { status: 400 }
      );
    }

    const updateFields = {};
    if (name) updateFields.name = name.trim();
    if (phone) updateFields.phone = phone.trim();
    if (address !== undefined) updateFields.address = address.trim();

    let updatedUser = null;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
    }
    if (!updatedUser && email) {
      updatedUser = await User.findOneAndUpdate(
        { email: email.trim().toLowerCase() },
        updateFields,
        { new: true }
      );
    }

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy người dùng trong database." },
        { status: 404 }
      );
    }

    const safeUser = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      address: updatedUser.address,
      memberLevel: updatedUser.memberLevel,
      points: updatedUser.points,
    };

    return NextResponse.json({
      success: true,
      message: "Cập nhật thông tin tài khoản thành công!",
      data: safeUser,
    });
  } catch (error) {
    console.error("Update profile API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Lỗi cập nhật hồ sơ người dùng." },
      { status: 500 }
    );
  }
}
