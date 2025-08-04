import React from 'react';

function DIYFixes() {
  const diyLinks = [
    { title: "Replace Engine Air Filter (Freightliner Cascadia)", url: "https://www.youtube.com/watch?v=qhUm33RfMNI" },
    { title: "Change Semi Truck Air Filters (General)", url: "https://www.youtube.com/watch?v=Gfmc6MasP30" },
    { title: "Replace Trailer Clearance Light", url: "https://www.youtube.com/watch?v=1w37qrUHyK8" },
    { title: "Fix Trailer Light Wiring (Easy Repair)", url: "https://www.youtube.com/watch?v=iOIo1E91BFU" },
    { title: "Diagnose No Running Lights on Trailer", url: "https://www.youtube.com/watch?v=waYRd0vV5io" },
    { title: "Fix Tail Light Flicker (Cascadia)", url: "https://www.youtube.com/watch?v=CXgeVxCW2i0" },
    { title: "Replace Trailer Pigtail Harness", url: "https://www.youtube.com/watch?v=2H7dSenR2xE" },
    { title: "Maintenance Minute: Changing Marker Lights", url: "https://www.youtube.com/watch?v=0DMni2Ar0UU" },
    { title: "Jump Start a Semi Truck Safely", url: "https://www.youtube.com/watch?v=example7" },
    { title: "Temporary Coolant Leak Fix", url: "https://www.youtube.com/watch?v=example8" },
    { title: "Replace Wiper Blades on Freightliner", url: "https://www.youtube.com/watch?v=7VvBazTxB_g" },
    { title: "Trailer Air Line Repair Basics", url: "https://www.youtube.com/watch?v=example10" },
    { title: "Diagnosing Air Brake Leaks", url: "https://www.youtube.com/watch?v=example4" },
  ];

  return (
    <section style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>DIY Fixes & Repair Guides</h2>
      <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        These are trusted repair videos picked from real mechanic experience—
        helpful for simple fixes that can save time and money!
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem"
        }}
      >
        {diyLinks.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: "600",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {item.title} ↗
          </a>
        ))}
      </div>
    </section>
  );
}

export default DIYFixes;
