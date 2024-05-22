import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('storage')); // Trigger storage event
    router.push('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center flex-wrap">
        <Link href="/" legacyBehavior>
          <a className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <Image src="/images/logo_ayam.png" width={100} height={32} alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ayam Semesta</span>
          </a>
        </Link>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 md:hidden"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
            <li className="block cursor-pointer">
              <Link href="/" legacyBehavior>
                <a>Home</a>
              </Link>
            </li>
            <li className="block cursor-pointer">
              <Link href="/about" legacyBehavior>
                <a>About</a>
              </Link>
            </li>
            <li className="block cursor-pointer">
              <Link href="/menu" legacyBehavior>
                <a>Menu</a>
              </Link>
            </li>
            <li className="block cursor-pointer">
              <Link href="/order" legacyBehavior>
                <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Order Now
                </a>
              </Link>
            </li>
            {user ? (
              <>
                <li className="block cursor-pointer">
                  <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="block cursor-pointer">
                  <Link href="/login" legacyBehavior>
                    <a className="text-gray-900 dark:text-white">Login</a>
                  </Link>
                </li>
                <li className="block cursor-pointer">
                  <Link href="/register" legacyBehavior>
                    <a className="text-gray-900 dark:text-white">Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
