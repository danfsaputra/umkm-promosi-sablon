import { useEffect, useState } from "react";
import { MessageCircle, Phone, MapPin, Star, Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const sections = ['beranda', 'produk', 'kontak'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWhatsAppOrder = (productName = "") => {
    const phone = "+6281333955548";
    const message = productName
      ? `Halo! Saya ingin bertanya mengenai produk ${productName}, bisa dibantu?`
      : "Halo! Saya ingin bertanya tentang produk UMKM GYANI'S HOUSE.";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  const navigationItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'produk', label: 'Produk' },
    { id: 'kontak', label: 'Kontak' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/LOGO%20AJA.png"
                  alt="Logo UMKM GYANI'S HOUSE"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800">UMKM GYANI'S HOUSE</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Sablon Kaos dan Aksesoris</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                    activeSection === item.id ? 'text-amber-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors font-semibold text-sm"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-amber-600 focus:outline-none"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  className="bg-amber-600 text-white py-2 px-3 rounded-lg font-semibold text-sm"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/login");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop={true}
              className="rounded-2xl h-64 sm:h-80"
            >
              {[
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
                "/images%20(1).jpeg",
                "/ramen.jpeg"
              ].map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="relative h-64 sm:h-80">
                    <img
                      src={src}
                      alt={`Slide ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right side - Content */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                UMKM Kreatif Spesialis Sablon<br />
                <span className="text-amber-600">GYANI'S HOUSE</span><br />
                <span className="text-lg sm:text-xl lg:text-2xl">Asli Surabaya</span>
              </h2>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-semibold">✓</span>
                  Kaos Sablon dengan desain unik dan kreatif
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-semibold">✓</span>
                  Desain melekat dengan kota lama surabaya
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-semibold">✓</span>
                  Berkualitas dan menarik untuk segala kalangan
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => handleWhatsAppOrder()}
              className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 sm:gap-3"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              Pesan Sekarang via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">PRODUK KAMI</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Produk Berkualitas dan menarik untuk segala kalangan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
                <div className="h-40 sm:h-48 bg-gray-300"></div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-10 sm:h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          ) : products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={product.gambar}
                    alt={product.nama}
                    className="w-full h-40 sm:h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "";
                    }}
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-amber-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Stok: {product.stok}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{product.nama}</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">{product.deskripsi}</p>
                  
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-amber-600">
                      Rp {Number(product.harga).toLocaleString("id-ID")}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleWhatsAppOrder(product.nama)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 sm:py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Pesan via WhatsApp
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">Tidak Ada Produk</h3>
              <p className="text-sm sm:text-base text-gray-500">Produk sedang dalam persiapan. Silakan cek kembali nanti!</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Hubungi Kami</h3>
              <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base">
                Punya pertanyaan atau ingin memesan dalam jumlah besar? 
                Jangan ragu untuk menghubungi kami!
              </p>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">+62 813-3395-5548</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">Jl. Krembangan Timur No. 32, Surabaya, Jawa Timur</span>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <button 
                onClick={() => handleWhatsAppOrder()}
                className="bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Chat WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/LOGO%20AJA.png"
                alt="Logo UMKM Kultura"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-base sm:text-lg font-semibold">UMKM GYANI'S HOUSE</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 UMKM GYANI'S HOUSE. Dibuat dengan ❤️ untuk momen anda
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppOrder()}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}