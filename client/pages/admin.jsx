import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../lib/productAPI";

export default function AdminDashboard() {
  const [uploadError, setUploadError] = useState(""); // <-- Tambahkan ini
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nama: "",
    harga: 0,
    deskripsi: "",
    gambar: "",
    stok: 0,
  });
  const [editProductId, setEditProductId] = useState(null);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const [selectedFile, setSelectedFile] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
  if (file) {
    // Preview gambar
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewProduct((prev) => ({ ...prev, gambar: ev.target.result }));
    };
    reader.readAsDataURL(file);
  } else {
    setNewProduct((prev) => ({ ...prev, gambar: "" }));
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setUploadError("");

  const formData = new FormData();
  formData.append("nama", newProduct.nama || "");
  formData.append("harga", String(newProduct.harga || "0"));
  formData.append("deskripsi", newProduct.deskripsi || "");
  formData.append("stok", String(newProduct.stok || "0"));
  if (selectedFile) formData.append("gambar", selectedFile);

  let data;
  if (editProductId) {
    data = await updateProduct(editProductId, formData);
  } else {
    data = await createProduct(formData);
  }

  if (data.error) {
    setUploadError(data.error || "Gagal simpan produk");
    return;
  }

  setNewProduct({ nama: "", harga: 0, deskripsi: "", gambar: "", stok: 0 });
  setSelectedFile(null);
  setEditProductId(null);
  fetchProducts();
};


  const handleEdit = (product) => {
    setNewProduct({
      nama: product.nama,
      harga: product.harga,
      deskripsi: product.deskripsi,
      gambar: product.gambar,
      stok: product.stok,
    });
    setEditProductId(product._id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Dashboard Admin - Kelola Produk</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
              <input
                placeholder="Nama Produk"
                value={newProduct.nama}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, nama: e.target.value })
                }
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
              <input
                placeholder="Masukkan harga"
                type="number"
                value={newProduct.harga}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, harga: e.target.value })
                }
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
              <input
                placeholder="Jumlah stok"
                type="number"
                value={newProduct.stok}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stok: e.target.value })
                }
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              placeholder="Deskripsi Produk"
              value={newProduct.deskripsi}
              onChange={(e) =>
                setNewProduct({ ...newProduct, deskripsi: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-3 rounded-md"
          />

          {newProduct.gambar && (
            <img
              src={newProduct.gambar}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-md border mx-auto"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all"
          >
            {editProductId ? "Update Produk" : "Tambah Produk"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow p-4 flex flex-col">
              {product.gambar && (
                <img
                  src={product.gambar}
                  alt={product.nama}
                  className="w-full h-40 object-cover mb-3 rounded-md"
                />
              )}
              <h2 className="text-lg font-bold text-gray-800 mb-1">{product.nama}</h2>
              <p className="text-sm text-gray-600 flex-1">{product.deskripsi}</p>
              <p className="text-blue-600 font-bold mt-2">Rp {Number(product.harga).toLocaleString("id-ID")}</p>
              <p className="text-sm text-gray-700">Stok: {product.stok}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
