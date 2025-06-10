function HowItWorks() {
  const steps = [
    "Detect your location",
    "Show nearby shops",
    "Get help fast",
  ];

  return (
    <section style={{ padding: '2rem', background: '#fff', textAlign: 'center' }}>
      <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>How It Works</h3>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            width: '200px',
            backgroundColor: '#f9fafb'
          }}>
            <p style={{ fontSize: '1.1rem' }}>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
