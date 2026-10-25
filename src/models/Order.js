import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    items: [
      {
        product: {
          id: String,
          name: String,
          price: Number,
          image: String,
          category: String,
          unit: String,
          brand: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    recipientInfo: {
      senderName: String,
      senderPhone: String,
      senderEmail: String,
      recipientName: String,
      recipientPhone: String,
      recipientAddress: String,
      recipientCity: String,
      deliveryDate: String,
      deliveryTimeSlot: String,
      note: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "vietqr", "momo"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "preparing", "photo_sent", "delivering", "completed", "cancelled"],
      default: "pending",
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    statusHistory: [
      {
        status: String,
        title: String,
        time: String,
        description: String,
        completed: Boolean,
        current: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
