function Hero() {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '2rem',
      background: '#f3f4f6',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Stranded? Find Help Fast.</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}>
        Instantly locate nearby repair shops and mechanics when you're stuck on the road.
      </p>
      <button style={{
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer'
      }}>
        Find Nearby Repair Shops
      </button>
    </section>
  );
}

export default Hero;
