const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">CryptoVista</h2>
      <button 
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? 'Light' : 'Dark'}
      </button>
    </nav>
  );
};

export default Navbar;