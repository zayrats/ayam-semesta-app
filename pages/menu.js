import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Example product data
const products = [
  { id: 1, name: 'Classic Fried Chicken', description: 'Crispy and juicy fried chicken', price: 50000, imageUrl: '/images/classic.jpg' },
  { id: 2, name: 'Spicy Fried Chicken', description: 'Hot and spicy flavor', price: 55000, imageUrl: '/images/spicy.jpg' }
];

export default function Menu() {
  return (
    <div>
      <Navbar />
      <main className="main">
        <h1>Our Menu</h1>
        <div className="products">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
