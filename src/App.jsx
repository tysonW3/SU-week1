import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import Home from './pages/Home';
import FindShop from './pages/FindShop';
import About from './pages/About';
import DIYFixes from './pages/DIYFixes';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{
      backgroundColor: isDark ? '#1f2937' : '#fff',
      color: isDark ? '#f9f9f9' : '#111',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      <Navbar />
      <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<FindShop isDark={isDark} />} />
          <Route path="/diy" element={<DIYFixes />} />
          <Route path="/about" element={<About />} />

          {/* Protect favorites so only logged-in users can access */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
