import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Menu.module.css'; // Mengimpor file CSS untuk styling

// Example product data
const products = [
  { id: 1, name: 'Classic Fried Chicken', description: 'Crispy and juicy fried chicken', price: 50000, imageUrl: '/images/Chicken_Wings(1).jpeg' },
  { id: 2, name: 'Spicy Fried Chicken', description: 'Hot and spicy flavor', price: 55000, imageUrl: '/images/Chicken_Wings(2).jpeg' },
  // ... other products
];

export default function Menu() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrderFilled, setIsOrderFilled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (token) {
      setIsLoggedIn(true);
    }
    if (orderData) {
      setIsOrderFilled(true);
    }
  }, []);

  const handleAddToCart = (product, quantity) => {
    try {
      setSelectedItems((prevItems) => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });
      return true;
    } catch (error) {
      console.error("Failed to add to cart", error);
      return false;
    }
  };

  const handleProceedToPayment = () => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems)); // Simpan data produk yang dipilih di localStorage
    router.push('/payment'); // Arahkan ke halaman payment
  };

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <h1>Our Menu</h1>
        <div className={styles.cartIcon}>
          <span>{selectedItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
          <img src="/images/cart-icon.png" alt="Cart" />
        </div>
        <div className={styles.products}>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={isLoggedIn && isOrderFilled ? handleAddToCart : null} 
              isLoggedIn={isLoggedIn} 
              isOrderFilled={isOrderFilled}
            />
          ))}
        </div>
        {isLoggedIn && isOrderFilled && (
          <button className={styles.button} onClick={handleProceedToPayment}>Proceed to Payment</button>
        )}
      </main>
      <Footer />
    </div>
  );
}
