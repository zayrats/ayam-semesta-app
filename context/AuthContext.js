// // context/AuthContext.js
// import { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const login = (userData, token) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', token);
//     window.dispatchEvent(new Event('storage'));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     window.dispatchEvent(new Event('storage'));
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
