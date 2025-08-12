import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth);
  };

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
      {/* Left: Brand */}
      <div style={{ fontSize: '1.5rem', fontWeight: '600', letterSpacing: '0.5px' }}>
        RoadsideTracker
      </div>

      {/* Center: Username if logged in */}
      <div style={{ fontSize: '1rem', fontWeight: '500' }}>
        {user ? `Welcome, ${user.displayName || user.email}` : ''}
      </div>

      {/* Right: Nav links */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/find" style={linkStyle}>Find a Shop</Link>
        <Link to="/diy" style={linkStyle}>DIY Fixes</Link>
        <Link to="/about" style={linkStyle}>About</Link>

        {/* Auth buttons */}
        {user ? (
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={buttonStyle}>Login</Link>
            <Link to="/signup" style={buttonStyle}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '500'
};

const buttonStyle = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  padding: '0.4rem 0.8rem',
  borderRadius: '5px',
  textDecoration: 'none',
  fontWeight: '500',
  border: 'none',
  cursor: 'pointer'
};

export default Navbar;
