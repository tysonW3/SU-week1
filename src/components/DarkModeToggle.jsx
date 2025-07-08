import React from 'react';

function DarkModeToggle({ isDark, setIsDark }) {
  return (
    <button
      onClick={() => setIsDark(prev => !prev)}
      style={{
        margin: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: isDark ? '#f3f4f6' : '#1f2937',
        color: isDark ? '#111' : '#fff'
      }}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;
