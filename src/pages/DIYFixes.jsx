function DIYFixes() {
  const resources = [
    { name: "How to Jump Start a Truck", url: "https://example.com/jumpstart" },
    { name: "Fixing a Flat Tire", url: "https://example.com/flattire" },
    { name: "Emergency Engine Troubleshooting", url: "https://example.com/engine" },
    { name: "Trailer Light Wiring Guide", url: "https://example.com/trailerlights" }
  ];

  return (
    <section style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>DIY Fixes & Helpful Links</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {resources.map((item, index) => (
          <li key={index} style={{
            background: '#fff',
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '1.1rem', color: '#2563eb', textDecoration: 'none' }}>
              {item.name} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DIYFixes;
