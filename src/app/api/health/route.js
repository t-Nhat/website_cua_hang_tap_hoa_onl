import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDatabase();
    const state = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const stateMap = {
      0: "Chưa kết nối (Disconnected)",
      1: "Đã kết nối thành công (Connected)",
      2: "Đang kết nối (Connecting)",
      3: "Đang ngắt kết nối (Disconnecting)",
    };

    const uri = process.env.MONGODB_URI || "";
    const clusterMatch = uri.match(/@([^/?]+)/);
    const clusterHost = clusterMatch ? clusterMatch[1] : "Cluster0";

    return NextResponse.json({
      status: "success",
      database: "MongoDB Atlas",
      readyState: state,
      stateDescription: stateMap[state] || "Unknown",
      cluster: clusterHost,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        hint: "Vui lòng kiểm tra lại <db_username> và mật khẩu trong file .env.local",
      },
      { status: 500 }
    );
  }
}
