import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Navbar />
      <main className="main-about fadeInUp">
        <h1>Welcome to Ayam Semesta</h1>
        <p>
          Discover the story behind our passion for creating the best fried
          chicken experiences.
        </p>
        <div className="gallery">
          <img src="/images/Chicken_Wings(2).jpeg" alt="Gallery Image 1" />
          <img src="/images/Chicken_Wings(2).jpeg" alt="Gallery Image 2" />
          <img src="/images/Chicken_Wings(2).jpeg" alt="Gallery Image 3" />
        </div>
        <div className="timeline">
          <div className="timeline-entry">
            <p>
              <strong>2020 - Pembukaan Lokasi Pertama</strong>
            </p>
            <p>
              Ayam Semesta membuka pintunya untuk pertama kali di Jakarta,
              menyuguhkan ayam goreng klasik yang segera menjadi favorit lokal.
            </p>
          </div>
          <div className="timeline-entry">
            <p>
              <strong>2021 - Peluncuran Ayam Pedas</strong>
            </p>
            <p>
              Menanggapi permintaan yang tinggi dari para penggemar pedas, kami
              memperkenalkan varian baru: Ayam Pedas yang gurih.
            </p>
          </div>
          <div className="timeline-entry">
            <p>
              <strong>2022 - Ekspansi ke Kota Lain dan Penghargaan</strong>
            </p>
            <p>
              Ayam Semesta melebarkan sayapnya ke Bandung dan Yogyakarta serta
              meraih penghargaan sebagai 'Ayam Goreng Terbaik' oleh Foodie
              Magazine.
            </p>
          </div>
          <div className="timeline-entry">
            <p>
              <strong>2023 - Inisiatif Ramah Lingkungan</strong>
            </p>
            <p>
              Kami berkomitmen pada keberlanjutan dengan memulai penggunaan
              bahan organik dan kemasan yang ramah lingkungan.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
