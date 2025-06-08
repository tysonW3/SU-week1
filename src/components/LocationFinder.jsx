import { useState } from 'react';

function LocationFinder() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError('');
      },
      (err) => {
        setError("Unable to retrieve location. Please allow permission.");
      }
    );
  };

  return (
    <section style={{ padding: '2rem', textAlign: 'center' }}>
      <h3>📍 Get Your Location</h3>
      <button
        onClick={handleGetLocation}
        style={{
          padding: '0.5rem 1rem',
          margin: '1rem',
          fontSize: '1rem',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        Show My Location
      </button>

      {location && (
        <div>
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
}

export default LocationFinder;
