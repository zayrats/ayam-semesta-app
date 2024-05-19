import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Login failed. Please check your credentials or register an account.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
        <p className={styles.redirect}>
          Don't have an account? <Link href="/register" legacyBehavior><a>Register</a></Link>
        </p>
      </form>
    </div>
  );
}
