import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="main">
        <h1>Welcome to Ayam Semesta!</h1>
        <p>Discover the best fried chicken in town.</p>
      </main>
      <Footer />
    </div>
  );
}
