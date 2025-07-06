import { useEffect, useState } from "react";
import { MessageCircle, Phone, MapPin, Star } from "lucide-react";
import { useRouter } from "next/router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from your database API
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleWhatsAppOrder = (productName = "") => {
    const phone = "6281234567890"; // Replace with actual WhatsApp number
    const message = productName 
      ? `Halo! Saya ingin memesan ${productName}. Bisa dibantu?`
      : "Halo! Saya ingin bertanya tentang produk UMKM Es Kopi Gula Aren.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">DANI CAFE</h1>
              <p className="text-sm text-gray-600">Es Kopi Gula Aren</p>
            </div>
          </div>
          <button
            className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors font-semibold"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop" 
              alt="Foto Es Kopi Gula Aren" 
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm">4.9 (150+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Nikmati Kesegaran<br />
                <span className="text-amber-600">Es Kopi Gula Aren</span><br />
                Asli Indonesia
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-semibold">✓</span>
                  Bahan berkualitas tinggi tanpa pengawet
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-semibold">✓</span>
                  Gula aren asli dari petani lokal
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-semibold">✓</span>
                  Kopi robusta pilihan dengan cita rasa khas
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => handleWhatsAppOrder()}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Pesan Sekarang via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">PRODUK KAMI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilihan terbaik minuman segar dengan cita rasa autentik Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          ) : products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={product.gambar || "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop"}
                    alt={product.nama}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Stok: {product.stok}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.nama}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.deskripsi}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-amber-600">
                      Rp {Number(product.harga).toLocaleString("id-ID")}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleWhatsAppOrder(product.nama)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Pesan via WhatsApp
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak Ada Produk</h3>
              <p className="text-gray-500">Produk sedang dalam persiapan. Silakan cek kembali nanti!</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Hubungi Kami</h3>
              <p className="mb-6 opacity-90">
                Punya pertanyaan atau ingin memesan dalam jumlah besar? 
                Jangan ragu untuk menghubungi kami!
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Jl. Contoh No. 123, Surabaya, Jawa Timur</span>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <button 
                onClick={() => handleWhatsAppOrder()}
                className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Chat WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <span className="text-lg font-semibold">UMKM Es Kopi Gula Aren</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 UMKM Es Kopi Gula Aren. Dibuat dengan ❤️ untuk Indonesia
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppOrder()}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}