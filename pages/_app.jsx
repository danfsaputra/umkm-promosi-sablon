// pages/_app.jsx
import "../styles/App.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>UMKM GYANI'HOUSE | Produk Sablon Asli Surabaya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="UMKM Gyani's House menjual kaos sablon, tote bag kreatif, dan asli Surabaya." />
        <meta name="keywords" content="UMKM Gyani's House, kaos sablon, tote bag, aksesoris, kota kama, Surabaya" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (untuk tampilan saat dibagikan ke media sosial) */}
        <meta property="og:title" content="UMKM Kultura | Produk Kerajinan Bucket Asli Surabaya" />
        <meta property="og:description" content="UMKM Gyani's House menjual kaos sablon, tote bag kreatif, dan asli Surabaya." />
        <meta property="og:url" content="https://gyani.umkmkremsel.shop" />
        <meta property="og:image" content="https://gyani.umkmkremsel.shop/LOGO%20AJA.png" />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/LOGO%20AJA.png" type="image/png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
