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

            {nearbyShops.map((shop, index) => (
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
                {nearbyShops.map((shop, index) => (
                  <div key={index} style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '1rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>{shop.name}</h4>
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
