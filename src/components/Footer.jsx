function Footer() {
  return (
    <footer style={{
      padding: '1rem 2rem',
      backgroundColor: '#f3f4f6',
      textAlign: 'center',
      color: '#4b5563'
    }}>
      <p>&copy; {new Date().getFullYear()} Roadside Repair Tracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
