import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const featuredDishes = [
    { id: 1, name: 'Classic Fried Chicken', imageUrl: '/images/dish1.jpeg' },
    { id: 2, name: 'Spicy Fried Chicken', imageUrl: '/images/dish2.jpeg' },
    { id: 3, name: 'Grilled Chicken', imageUrl: '/images/dish3.jpeg' }
  ];

  const testimonials = [
    { id: 1, content: 'Best chicken in town!', author: 'John Doe' },
    { id: 2, content: 'Amazing taste and great service.', author: 'Jane Smith' },
    { id: 3, content: 'I love this place!', author: 'Bob Johnson' }
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Ayam Semesta!</h1>
            <p>Discover the best fried chicken in town.</p>
          </div>
        </section>
        
        <section className="menu-preview py-20">
          <div className="container mx-auto">
            <h2 className="text-4xl text-center font-bold mb-10">Featured Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featuredDishes.map((dish) => (
                <div key={dish.id} className="rounded overflow-hidden shadow-lg">
                  <Image src={dish.imageUrl} alt={dish.name} width={300} height={200} objectFit="cover" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{dish.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonial-section py-20">
          <div className="container mx-auto">
            <h2 className="text-4xl text-center font-bold mb-10">What Our Customers Say</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-6 space-y-6 md:space-y-0">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded shadow-lg p-6 text-center">
                  <p className="text-gray-600">{testimonial.content}</p>
                  <p className="text-gray-900 text-lg mt-4">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="visit-us-section py-20 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-4xl text-center font-bold mb-10">Visit Us</h2>
            <div className="text-center">
              <img src="/images/map-placeholder.png" alt="Map" className="inline-block" />
              <p>Your address goes here</p>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
