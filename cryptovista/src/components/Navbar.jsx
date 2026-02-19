const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">CryptoVista</h2>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? " Light Mode" : " Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
