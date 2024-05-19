// pages/_app.js
import "../styles/globals.css"; // Sesuaikan path ini berdasarkan struktur folder proyek Anda

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header />
      <Component {...pageProps} />
      <footer />
    </div>
  );
}

export default MyApp;
