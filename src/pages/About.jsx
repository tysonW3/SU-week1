import React from 'react';

function About() {
  return (
    <section style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>About Roadside Repair Tracker</h2>
      
      <p>
        <strong>Roadside Repair Tracker</strong> is a location based web application developed as part of a senior capstone project 
        for the Bachelor of Science in Computer Science program at Lewis University. This project demonstrates full stack development skills 
        while addressing a real world need within the transportation and logistics industries.
      </p>

      <p>
        The goal of this application is to assist truck drivers, transportation professionals and everyday travelers in locating 
        nearby mechanic shops during unexpected breakdowns or roadside emergencies. By using real time location tracking and map 
        integration, users can easily find and access repair services within a selected search radius.
      </p>

      <p>
        In addition to helping users, this platform also highlights and supports local businesses. Shops listed on the map are pulled 
        from open data and displayed to give visibility to independent and small repair businesses in the user’s area.
      </p>

      <p><strong>Key features include:</strong></p>
      <ul style={{ paddingLeft: '1.2rem' }}>
        <li>Real time location detection</li>
        <li>Adjustable radius for nearby shop search</li>
        <li>Interactive map with mechanic shop markers</li>
        <li>Modern, user friendly design for easy navigation</li>
      </ul>

      <p>
        The application was built using modern web technologies, including <strong>React</strong>, <strong>Vite</strong>, <strong>React Router</strong>,
        <strong>Leaflet</strong> for mapping, and <strong>OpenStreetMap’s Overpass API</strong> for shop data. Styling is handled using basic 
        responsive design techniques with inline and component based styles.
      </p>

      <p>
        Whether you're a long haul trucker, a delivery driver or a family on a road trip, Roadside Repair Tracker is built to provide 
        quick access to repair services, improve safety on the road and give back to local communities.
      </p>

      <p style={{ marginTop: '2rem', fontStyle: 'italic', textAlign: 'center' }}>
        Created by <strong>Tyson Wargin</strong> as part of the Capstone Project for a B.S. in Computer Science.<br />
        Built for truckers, travelers.
      </p>
    </section>
  );
}

export default About;
