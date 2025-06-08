import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '1rem',
      padding: '1rem 2rem',
      backgroundColor: '#1f2937',
      color: '#fff'
    }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
      <Link to="/find" style={{ color: '#fff', textDecoration: 'none' }}>Find a Shop</Link>
      <Link to="/submit" style={{ color: '#fff', textDecoration: 'none' }}>Submit Shop</Link>
      <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
    </nav>
  );
}

export default Navbar;
