import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Navbar />
      <main className="main">
        <h1>About Ayam Semesta</h1>
        <p>Ayam Semesta has been serving delicious fried chicken since 2020. Our mission is to bring you the best fried chicken experience.</p>
      </main>
      <Footer />
    </div>
  );
}
