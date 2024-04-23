const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <p>&copy; {new Date().getFullYear()} Ayam Semesta. All rights reserved.</p>
        <p>Follow us on:
          <a href="https://instagram.com/ayamsemesta" target="_blank" rel="noopener noreferrer">Instagram</a>,
          <a href="https://twitter.com/ayamsemesta" target="_blank" rel="noopener noreferrer">Twitter</a>,
          <a href="https://facebook.com/ayamsemesta" target="_blank" rel="noopener noreferrer">Facebook</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
