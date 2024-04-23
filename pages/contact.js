import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div>
      <Navbar />
      <main className="main">
        <h1>Contact Us</h1>
        <p>Have any questions or feedback? Reach out to us!</p>
        <form className="form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
