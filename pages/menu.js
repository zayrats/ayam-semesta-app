import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Menu.module.css';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrderFilled, setIsOrderFilled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

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
      <main className={styles.main}>
        <h1>Our Menu</h1>
        <div className={styles.cartIcon}>
          <span>{selectedItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
          <img src="/images/cart-icon.png" alt="Cart" />
        </div>
        <div className={styles.products}>
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={isLoggedIn && isOrderFilled ? handleAddToCart : null} 
                isLoggedIn={isLoggedIn} 
                isOrderFilled={isOrderFilled}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
        {isLoggedIn && isOrderFilled && (
          <button className={styles.button} onClick={handleProceedToPayment}>Proceed to Payment</button>
        )}
      </main>
    </div>
  );
}
