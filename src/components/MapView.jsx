import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapView({ isDark }) {
  const [position, setPosition] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [radiusMiles, setRadiusMiles] = useState(20);
  const types = ['Diesel', 'Trailer', 'Towing', 'General'];
  const [selectedType, setSelectedType] = useState('All');

  const [trustedShops, setTrustedShops] = useState(() => {
    const stored = localStorage.getItem('trustedShops');
    return stored ? JSON.parse(stored) : [];
  });

 
  function getReviews(shopName) {
    const saved = JSON.parse(localStorage.getItem('reviews') || '{}');
    return saved[shopName] || [];
  }

  function saveReview(shopName, newReview) {
    const saved = JSON.parse(localStorage.getItem('reviews') || '{}');
    if (!saved[shopName]) saved[shopName] = [];
    saved[shopName].push(newReview);
    localStorage.setItem('reviews', JSON.stringify(saved));
  }

  function toggleTrusted(shopName) {
    setTrustedShops(prev =>
      prev.includes(shopName)
        ? prev.filter(name => name !== shopName)
        : [...prev, shopName]
    );
  }

  useEffect(() => {
    localStorage.setItem('trustedShops', JSON.stringify(trustedShops));
  }, [trustedShops]);

  async function fetchMechanicsNearby(lat, lon) {
    const radiusInMeters = radiusMiles * 1609.34;
    const query = `
      [out:json];
      (
        node["shop"="car_repair"](around:${radiusInMeters},${lat},${lon});
        node["amenity"="garage"](around:${radiusInMeters},${lat},${lon});
        node["service"="vehicle_repair"](around:${radiusInMeters},${lat},${lon});
      );
      out body;
    `;

    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });
      const data = await res.json();
      return data.elements.map(el => ({
        name: el.tags.name || "Unnamed Shop",
        lat: el.lat,
        lon: el.lon,
        type: types[Math.floor(Math.random() * types.length)]
      }));
    } catch (err) {
      console.error('Failed to fetch Overpass data:', err);
      return [];
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      err => console.error("Geolocation error:", err)
    );
  }, []);

  useEffect(() => {
    if (!position) return;
    const [lat, lon] = position;
    fetchMechanicsNearby(lat, lon).then(shops => setNearbyShops(shops));
  }, [position, radiusMiles]);

  const filteredShops = selectedType === 'All'
    ? nearbyShops
    : nearbyShops.filter(shop => shop.type === selectedType);

  return (
    <section style={{ padding: '2rem' }}>
      <h3 style={{ textAlign: 'center' }}>Your Location & Nearby Mechanics</h3>

      {position ? (
        <>
          
          <div style={{
            position: 'sticky', top: '0', zIndex: '10',
            backgroundColor: isDark ? '#1f2937' : '#fff',
            padding: '1rem', borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            marginBottom: '1rem',
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            justifyContent: 'center', alignItems: 'center'
          }}>
            <div>
              <label>Search radius:</label>
              <input type="range" min="1" max="50" value={radiusMiles}
                onChange={e => setRadiusMiles(Number(e.target.value))}
                style={{ width: '150px', marginLeft: '0.5rem' }} />
              <span>{radiusMiles} miles</span>
            </div>
            <div>
              <label>Filter by Service:</label>
              <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
                style={{
                  marginLeft: '0.5rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: isDark ? '#334155' : '#f9f9f9',
                  color: isDark ? '#f9f9f9' : '#111'
                }}>
                <option value="All">All</option>
                <option value="Diesel">Diesel</option>
                <option value="Trailer">Trailer</option>
                <option value="Towing">Towing</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

         
          <MapContainer center={position} zoom={13} scrollWheelZoom style={{ height: '400px', width: '100%', marginBottom: '1rem' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' />
            <Marker position={position}><Popup>You are here</Popup></Marker>
            {filteredShops.map((shop, i) => (
              <Marker key={i} position={[shop.lat, shop.lon]}>
                <Popup>{shop.name}</Popup>
              </Marker>
            ))}
          </MapContainer>

          
          <div style={{
            backgroundColor: isDark ? '#2d3748' : '#f9f9f9',
            color: isDark ? '#f9f9f9' : '#111',
            border: isDark ? '1px solid #444' : '1px solid #ddd',
            padding: '1rem', borderRadius: '0.5rem'
          }}>
            <h4>Nearby Shops:</h4>
            {filteredShops.length === 0 ? (
              <p>No shops found within {radiusMiles} miles.</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem', marginTop: '1rem'
              }}>
                {filteredShops.map((shop, idx) => (
                  <div key={idx} style={{
                    border: isDark ? '1px solid #444' : '1px solid #ddd',
                    borderRadius: '8px', padding: '1rem',
                    backgroundColor: isDark ? '#2d3748' : '#fff',
                    color: isDark ? '#f9f9f9' : '#111',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}>
                    <h4>{shop.name}</h4>

                    
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lon}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-block', marginTop: '0.5rem',
                        padding: '0.4rem 0.8rem', fontSize: '0.9rem',
                        backgroundColor: '#2563eb', color: '#fff',
                        borderRadius: '4px', textDecoration: 'none'
                      }}>Get Directions</a>

                    
                    <button onClick={() => toggleTrusted(shop.name)} style={{
                      marginTop: '0.5rem', marginLeft: '0.5rem',
                      padding: '0.4rem 0.8rem', fontSize: '0.9rem',
                      backgroundColor: trustedShops.includes(shop.name) ? '#10b981' : '#d1d5db',
                      color: trustedShops.includes(shop.name) ? '#fff' : '#111',
                      border: 'none', borderRadius: '4px', cursor: 'pointer'
                    }}>{trustedShops.includes(shop.name) ? '✅ Trusted' : 'Mark as Trusted'}</button>

                   
                    <h5 style={{ marginTop: '0.7rem' }}>Reviews:</h5>
                    <ul style={{ fontSize: '0.9rem', maxHeight: '80px', overflowY: 'auto' }}>
                      {getReviews(shop.name).length === 0 && <li>No reviews yet.</li>}
                      {getReviews(shop.name).map((rev, i) => <li key={i}>• {rev}</li>)}
                    </ul>

          
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const review = e.target.review.value.trim();
                      if (review) {
                        saveReview(shop.name, review);
                        e.target.reset();
                        window.location.reload();
                      }
                    }}>
                      <textarea name="review" placeholder="Write a review..." rows="2"
                        style={{ width: '100%', marginTop: '0.5rem' }}></textarea>
                      <button type="submit" style={{
                        marginTop: '0.3rem', padding: '0.4rem 0.8rem',
                        fontSize: '0.9rem', backgroundColor: '#2563eb',
                        color: '#fff', border: 'none', borderRadius: '4px',
                        cursor: 'pointer'
                      }}>Submit Review</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : <p style={{ textAlign: 'center' }}>Getting your location...</p>}
    </section>
  );
}

export default MapView;
