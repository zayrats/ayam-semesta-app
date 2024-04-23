import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Untuk navigasi eksternal menggunakan <a> */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/public/assets/images/logo_ayam_semesta.png" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ayam Semesta</span>
        </a>
        
        {/* Link internal menggunakan <Link> tanpa <a> */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/order">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get started
            </button>
          </Link>
        </div>
        
        {/* Navigasi internal tanpa <a> */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 md:p-0 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <Link href="/"><li>Home</li></Link>
            <Link href="/about"><li>About</li></Link>
            <Link href="/services"><li>Services</li></Link>
            <Link href="/contact"><li>Contact</li></Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
