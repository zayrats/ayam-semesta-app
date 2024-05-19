import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Order.module.css'; // Mengimpor file CSS untuk styling

export default function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
      setName(userData?.name || '');
      setEmail(userData?.email || '');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { name, email, address, phone };
    localStorage.setItem('orderData', JSON.stringify(orderData)); // Simpan data order di localStorage
    router.push('/menu'); // Arahkan ke halaman menu
  };

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Order Your Favorite Chicken</h1>
        <p className={styles.description}>Please fill out the form below to complete your order.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Proceed to Menu</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
