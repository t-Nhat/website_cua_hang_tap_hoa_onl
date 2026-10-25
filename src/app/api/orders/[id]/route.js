import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import mongoose from "mongoose";

function generateStatusHistory(currentStatus) {
  const timeNow =
    new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) +
    " - " +
    new Date().toLocaleDateString("vi-VN");

  const stepsDef = [
    {
      status: "pending",
      title: "Đơn hàng đã được tiếp nhận",
      description: "Hệ thống Bách Hóa Như Ngọc đã ghi nhận đơn đặt hàng của bạn.",
    },
    {
      status: "preparing",
      title: "Nhân viên kho đang soạn hàng & đóng thùng",
      description: "Kiểm tra hạn sử dụng và đóng gói cẩn thận các mặt hàng tạp hóa.",
    },
    {
      status: "photo_sent",
      title: "Đã hoàn tất đóng gói & xuất kho",
      description: "Đơn hàng đã được dán mã vận đơn và chuyển sang bộ phận giao vận.",
    },
    {
      status: "delivering",
      title: "Shipper đang trên đường giao hàng",
      description: "Shipper đang vận chuyển đơn hàng tạp hóa tới địa chỉ người nhận.",
    },
    {
      status: "completed",
      title: "Giao hàng thành công & đồng kiểm",
      description: "Khách hàng đồng kiểm tra hàng hoá và nhận hàng thành công.",
    },
  ];

  const statusOrder = ["pending", "preparing", "photo_sent", "delivering", "completed"];
  const targetIdx = statusOrder.indexOf(currentStatus);

  return stepsDef.map((step, idx) => {
    const isCompleted = targetIdx >= 0 && idx < targetIdx;
    const isCurrent = idx === targetIdx;
    return {
      status: step.status,
      title: step.title,
      description: step.description,
      time: isCompleted || isCurrent ? timeNow : "Dự kiến",
      completed: isCompleted || (isCurrent && currentStatus === "completed"),
      current: isCurrent && currentStatus !== "completed",
    };
  });
}

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    let order;
    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findById(id);
    }
    if (!order) {
      order = await Order.findOne({ code: id.toUpperCase() });
    }

    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
    }

    return NextResponse.json({
      data: { id: order._id.toString(), ...order.toObject() },
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

    const updateData = { ...body };
    if (body.orderStatus) {
      updateData.statusHistory = generateStatusHistory(body.orderStatus);
      if (body.orderStatus === "completed" || body.paymentMethod !== "cod") {
        updateData.paymentStatus = "paid";
      }
    }

    let updated;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Order.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      updated = await Order.findOneAndUpdate({ code: id.toUpperCase() }, updateData, { new: true });
    }

    if (!updated) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng để cập nhật" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: updated._id.toString(), ...updated.toObject() },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
