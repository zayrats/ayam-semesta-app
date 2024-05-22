import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/Dashboard.module.css';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', imageBase64: '' });
  const [message, setMessage] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewItem(prevState => ({ ...prevState, imageBase64: reader.result.split(',')[1] }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        const newItemData = await res.json();
        setMenuItems([...menuItems, newItemData]);
        setNewItem({ name: '', price: '', description: '', imageBase64: '' });
        setMessage({ type: 'success', text: 'Menu item added successfully' });
      } else {
        const errorData = await res.json();
        console.error('Error adding menu item:', errorData.message);
        setMessage({ type: 'error', text: 'Error adding menu item' });
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
      setMessage({ type: 'error', text: 'Error adding menu item' });
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMenuItems(menuItems.filter(item => item.id !== id));
        setMessage({ type: 'success', text: 'Menu item deleted successfully' });
      } else {
        setMessage({ type: 'error', text: 'Error deleting menu item' });
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setMessage({ type: 'error', text: 'Error deleting menu item' });
    }
  };

  const handleUpdateItem = async (id, updatedItem) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (res.ok) {
        setMenuItems(menuItems.map(item => (item.id === id ? updatedItem : item)));
        setMessage({ type: 'success', text: 'Menu item updated successfully' });
      } else {
        setMessage({ type: 'error', text: 'Error updating menu item' });
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
      setMessage({ type: 'error', text: 'Error updating menu item' });
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setNewItem(item);
  };

  return (
    <div>
      <main className={styles.main}>
        <h1>Admin Dashboard</h1>
        {message && <p className={message.type === 'success' ? styles.success : styles.error}>{message.text}</p>}
        <div className={styles.addItem}>
          <h2>{editItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newItem.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          <button className='edit' onClick={editItem ? () => handleUpdateItem(editItem.id, newItem) : handleAddItem}>
            {editItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
        <div className={styles.menuItems}>
          <h2>Menu Items</h2>
          {menuItems.length > 0 ? (
            menuItems.map(item => (
              <div key={item.id} className={styles.menuItem}>
                <img src={`data:image/jpeg;base64,${item.imageBase64}`} alt={item.name} />
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, { ...item, name: e.target.value })}
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handleUpdateItem(item.id, { ...item, price: e.target.value })}
                />
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleUpdateItem(item.id, { ...item, description: e.target.value })}
                />
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
