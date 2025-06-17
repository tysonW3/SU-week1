import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center',
      color: '#fff',
      backgroundImage: 'url("/semi_wallpaper.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
        Stranded? Find Help Fast.
      </h2>
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '2rem',
        maxWidth: '600px',
        textShadow: '0 1px 3px rgba(0,0,0,0.5)'
      }}>
        Instantly locate nearby repair shops and mechanics when you're stuck on the road.
      </p>
      <button
        onClick={() => navigate('/find')}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}
      >
        Find Nearby Repair Shops
      </button>
    </section>
  );
}

export default Hero;
