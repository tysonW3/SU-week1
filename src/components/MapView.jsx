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

  //nearby mechanic shops
  async function fetchMechanicsNearby(lat, lon) {
    const radius = 32186;
const query = `
  [out:json];
  (
    node["shop"="car_repair"](around:${radius},${lat},${lon});
    node["amenity"="garage"](around:${radius},${lat},${lon});
    node["service"="vehicle_repair"](around:${radius},${lat},${lon});
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

        const shops = await fetchMechanicsNearby(latitude, longitude);
        setNearbyShops(shops);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  return (
    <section style={{ padding: '2rem' }}>
      <h3 style={{ textAlign: 'center' }}>Your Location & Nearby Mechanics</h3>

      {position ? (
        <>
          <MapContainer
            center={position}
            zoom={14}
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
              <p>No shops found nearby.</p>
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
                  <p style={{ color: '#555' }}></p>
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
