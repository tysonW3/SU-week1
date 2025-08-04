import React, { useEffect, useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get trusted shops list from localStorage
    const stored = JSON.parse(localStorage.getItem('trustedShops')) || [];
    setFavorites(stored);
  }, []);

  return (
    <section style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>My Trusted Shops</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>You have not marked any shops as trusted yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favorites.map((shopName, index) => (
            <li key={index} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '0.7rem',
              backgroundColor: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}>
              <strong>{shopName}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Favorites;
