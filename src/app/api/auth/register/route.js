import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, phone, password, address } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "Vui lòng điền đầy đủ họ tên, email và mật khẩu." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email này đã được đăng ký tài khoản. Vui lòng đăng nhập." },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : "",
      password: password, // In production, hash with bcrypt
      address: address ? address.trim() : "",
      role: "customer",
      memberLevel: "Thành viên Mới",
      points: 50,
    });

    const safeUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      address: newUser.address,
      memberLevel: newUser.memberLevel,
      points: newUser.points,
    };

    return NextResponse.json({
      success: true,
      message: "Tạo tài khoản thành công! Tặng bạn 50 điểm tích lũy thành viên.",
      data: safeUser,
    });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Lỗi khi đăng ký tài khoản vào database." },
      { status: 500 }
    );
  }
}
