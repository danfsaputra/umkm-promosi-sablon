import cloudinaryModule from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import connectDB from "/lib/mongodb"; // pastikan alias path '@/lib' aktif
import Product from "/models/Product";

// Disable default body parser
export const config = {
  api: { bodyParser: false },
};

// Cloudinary config
const cloudinary = cloudinaryModule.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// Middleware helper
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      return result instanceof Error ? reject(result) : resolve(result);
    });
  });
}

// Main handler
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  await connectDB();

  try {
    if (req.method === "GET") {
      const products = await Product.find();
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      await runMiddleware(req, res, upload.single("gambar"));

      const { nama, harga, deskripsi, stok } = req.body;
      const gambar = req.file?.path;

      const newProduct = new Product({ nama, harga, deskripsi, stok, gambar });
      await newProduct.save();

      return res.status(201).json(newProduct);
    }

    if (req.method === "PUT") {
      await runMiddleware(req, res, upload.single("gambar"));
      const { id, nama, harga, deskripsi, stok } = req.body;
      const updateData = { nama, harga, deskripsi, stok };

      if (req.file) updateData.gambar = req.file.path;

      const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ error: "Produk tidak ditemukan" });

      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Produk tidak ditemukan" });

      return res.status(200).json({ message: "Produk berhasil dihapus" });
    }

    return res.status(405).json({ error: `Method ${req.method} tidak diizinkan` });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error", detail: error.message });
  }
}
