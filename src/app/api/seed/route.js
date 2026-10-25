import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import { DEFAULT_GROCERY_PRODUCTS, INITIAL_GROCERY_ORDERS } from "@/data/groceryData";

export async function GET() {
  return handleSeed();
}

export async function POST() {
  return handleSeed();
}

async function handleSeed() {
  try {
    await connectToDatabase();

    // 1. Seed Products
    await Product.deleteMany({});
    const productsToInsert = DEFAULT_GROCERY_PRODUCTS.map((p) => {
      const { id, ...rest } = p;
      return rest;
    });
    const insertedProducts = await Product.insertMany(productsToInsert);

    // 2. Seed Orders
    await Order.deleteMany({});
    const ordersToInsert = INITIAL_GROCERY_ORDERS.map((o) => {
      const { id, ...rest } = o;
      return rest;
    });
    const insertedOrders = await Order.insertMany(ordersToInsert);

    // 3. Seed Users
    await User.deleteMany({});
    const insertedUsers = await User.insertMany([
      {
        name: "Quản Trị Viên Như Ngọc",
        email: "admin@bachhoanhungoc.com",
        phone: "0909123456",
        role: "admin",
        address: "Cửa Hàng Bách Hóa Như Ngọc, TP. Mỹ Tho, Tiền Giang",
        memberLevel: "Kim Cương (Quản trị)",
        points: 9999,
        password: "admin",
      },
      {
        name: "Nguyễn Văn Tuấn",
        email: "khachhang@bachhoanhungoc.com",
        phone: "0908123456",
        role: "customer",
        address: "125 Hùng Vương, Phường 2, TP. Mỹ Tho, Tiền Giang",
        memberLevel: "Thành viên Thân Thiết",
        points: 450,
        password: "123",
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Khởi tạo dữ liệu mẫu MongoDB Atlas thành công!",
      stats: {
        productsCount: insertedProducts.length,
        ordersCount: insertedOrders.length,
        usersCount: insertedUsers.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hint: "Vui lòng kiểm tra lại kết nối MongoDB Atlas trong .env.local",
      },
      { status: 500 }
    );
  }
}
