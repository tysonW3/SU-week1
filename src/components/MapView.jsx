import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapView() {
  const [position, setPosition] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [radiusMiles, setRadiusMiles] = useState(20); // in miles
  const types = ['Diesel', 'Trailer', 'Towing', 'General'];
  const [selectedType, setSelectedType] = useState('All');

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

    const url = 'https://overpass-api.de/api/interpreter';

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: query,
      });

      const data = await res.json();
      return data.elements.map((el) => ({
        name: el.tags.name || "Unnamed Shop",
        lat: el.lat,
        lon: el.lon,
        type: types[Math.floor(Math.random() * types.length)] // random type for now
      }));
    } catch (err) {
      console.error('Failed to fetch Overpass data:', err);
      return [];
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  useEffect(() => {
    if (!position) return;

    const [lat, lon] = position;
    fetchMechanicsNearby(lat, lon).then((shops) => {
      setNearbyShops(shops);
    });
  }, [position, radiusMiles]);

  const filteredShops = selectedType === 'All'
  ? nearbyShops
  : nearbyShops.filter(shop => shop.type === selectedType);


  return (
    <section style={{ padding: '2rem' }}>
      <h3 style={{ textAlign: 'center' }}>Your Location & Nearby Mechanics</h3>

      {position ? (
        <>
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <label style={{ marginRight: '0.5rem' }}>Search radius:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={radiusMiles}
              onChange={(e) => setRadiusMiles(Number(e.target.value))}
              style={{ width: '200px' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>{radiusMiles} miles</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1.5rem 0',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <label style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333'
            }}>
              Filter by Service:
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Services</option>
              <option value="Diesel">Diesel</option>
              <option value="Trailer">Trailer</option>
              <option value="Towing">Towing</option>
              <option value="General">General</option>
            </select>
          </div>


          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '400px', width: '100%', marginBottom: '1rem' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>You are here</Popup>
            </Marker>

            {filteredShops.map((shop, index) => (
              <Marker key={index} position={[shop.lat, shop.lon]}>
                <Popup>{shop.name}</Popup>
              </Marker>
            ))}
          </MapContainer>

          <div style={{
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <h4>Nearby Shops:</h4>
            {nearbyShops.length === 0 ? (
              <p>No shops found within {radiusMiles} miles.</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                {filteredShops.map((shop, index) => (
                  <div key={index} style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '1rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>{shop.name}</h4>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.9rem',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '4px'
                      }}
                    >
                      Get Directions
                    </a>

                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p style={{ textAlign: 'center' }}>Getting your location...</p>
      )}
    </section>
  );
}

export default MapView;
