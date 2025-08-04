import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1f2937',
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'Poppins, sans-serif'
    }}>
      {/* Brand / Logo */}
      <div style={{ fontSize: '1.5rem', fontWeight: '600', letterSpacing: '0.5px' }}>
        RoadsideTracker
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
          Home
        </Link>
        <Link to="/find" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
          Find a Shop
        </Link>
        <Link to="/diy" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
          DIY Fixes
        </Link>
        <Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
          About
        </Link>
        <Link to="/favorites" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
        Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
