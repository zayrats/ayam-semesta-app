import { useState } from 'react';
import styles from '../styles/ProductCard.module.css';

export default function ProductCard({ product, onAddToCart, isLoggedIn, isOrderFilled }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      const success = onAddToCart(product, quantity);
      if (success) {
        setMessage('Added to cart successfully!');
      } else {
        setMessage('Failed to add to cart.');
      }
      setTimeout(() => setMessage(''), 2000); // Hapus pesan setelah 2 detik
    } else {
      setMessage('Please login and fill the order form to add items to cart.');
      setTimeout(() => setMessage(''), 2000); // Hapus pesan setelah 2 detik
    }
  };

  return (
    <div className={styles.card}>
      <img src={`data:image/jpeg;base64,${product.imageBase64}`} alt={product.name} className={styles.image} />
      <div className={styles.details}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price} IDR</p>
        <div className={styles.quantity}>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className={styles.input}
          />
        </div>
        <button 
          onClick={handleAddToCart} 
          className={styles.button} 
          disabled={!isLoggedIn || !isOrderFilled}
        >
          Add to Cart
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
