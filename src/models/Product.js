import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá bán"],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, "Vui lòng nhập URL hình ảnh sản phẩm"],
    },
    category: {
      type: String,
      required: [true, "Vui lòng chọn ngành hàng"],
    },
    unit: {
      type: String,
      default: "Gói",
    },
    stock: {
      type: Number,
      default: 100,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      default: "Việt Nam",
    },
    origin: {
      type: String,
      default: "Việt Nam",
    },
    description: {
      type: String,
      default: "",
    },
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isFlashSale: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from recreating model on hot-reload
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
