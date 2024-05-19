import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Payment.module.css'; // Mengimpor file CSS untuk styling

export default function Payment() {
  const [orderData, setOrderData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    const storedSelectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    setOrderData(storedOrderData);
    setSelectedItems(storedSelectedItems);
    calculateTotalPrice(storedSelectedItems);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedItems = selectedItems.map(item =>
      item.id === productId ? { ...item, quantity: quantity } : item
    );
    setSelectedItems(updatedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  const handleRemoveItem = (productId) => {
    const updatedItems = selectedItems.filter(item => item.id !== productId);
    setSelectedItems(updatedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  const handleProceedToPayment = () => {
    setShowPopup(true);
  };

  const handlePaymentConfirmation = async () => {
    if (orderData) {
      const message = `Terima kasih telah melakukan pemesanan. Berikut detail pesanan Anda:\n\n${selectedItems.map(item => `${item.name} x ${item.quantity}: ${item.price * item.quantity} IDR`).join('\n')}\n\nTotal: ${totalPrice} IDR\n\nTerima kasih!`;
      const phoneNumber = orderData.phone.startsWith('0') ? `62${orderData.phone.slice(1)}` : orderData.phone;

      // Mengirim pesan WhatsApp (hanya contoh, implementasi sesungguhnya memerlukan API WhatsApp atau layanan pihak ketiga)
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleBackToMenu = () => {
    router.push('/menu');
  };

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <h1>Payment</h1>
        <h2>Order Details</h2>
        {orderData && (
          <div className={styles.orderDetails}>
            <p><strong>Name:</strong> {orderData.name}</p>
            <p><strong>Email:</strong> {orderData.email}</p>
            <p><strong>Address:</strong> {orderData.address}</p>
            <p><strong>Phone:</strong> {orderData.phone}</p>
          </div>
        )}
        <h2>Selected Items</h2>
        <div className={styles.items}>
          {selectedItems.map(item => (
            <div key={item.id} className={styles.item}>
              <p>{item.name}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className={styles.input}
              />
              <p>{item.price * item.quantity} IDR</p>
              <button onClick={() => handleRemoveItem(item.id)} className={styles.removeButton}>Remove</button>
            </div>
          ))}
        </div>
        <h2>Total Price: {totalPrice} IDR</h2>
        <div className={styles.buttons}>
          <button className={styles.backButton} onClick={handleBackToMenu}>Kembali ke Menu</button>
          <button className={styles.button} onClick={handleProceedToPayment}>Selesaikan Pembayaran</button>
        </div>

        {showPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h3>Scan QR Code to Pay</h3>
              <img src="/images/qrcode.png" alt="QR Code" className={styles.qrcode} />
              <button className={styles.confirmButton} onClick={handlePaymentConfirmation}>Sudah Bayar</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
