import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  deskripsi: { type: String },
  harga: { type: Number, required: true },
  gambar: { type: String },
  kategori: { type: String },
  stok: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);
