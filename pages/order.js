import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Order() {
  return (
    <div>
      <Navbar />
      <main className="main">
        <h1>Order Your Favorite Chicken</h1>
        <p>Please fill out the form below to complete your order.</p>
        <form className="form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Address" required />
          <button type="submit" className="btn">Place Order</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
