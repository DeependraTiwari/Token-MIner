import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import Login from './Login';
import MainApp from './MainApp';

function AppContent() {
  const { isAuth, authUser } = useAuth();

  if (!authUser) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.card}>
          <h2 style={styles.loadingText}>🔄 Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <main style={styles.main}>
      {isAuth ? <MainApp /> : <Login />}
    </main>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const styles = {
  main: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top, #1a1a1a, #0d0d0d)',
    fontFamily: `'Inter', sans-serif`,
  },
  loadingContainer: {
    padding: '40px',
    background: 'radial-gradient(circle at top, #1a1a1a, #0d0d0d)',
    minHeight: '100vh',
    fontFamily: `'Inter', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    background: 'rgba(0, 247, 255, 0.05)',               // light cyan overlay
    borderRadius: '16px',
    boxShadow: '0 0 25px rgba(0, 247, 255, 0.2)',        // cyan glow
    border: '1px solid rgba(0, 247, 255, 0.2)',           // cyan border
    padding: '30px 40px',
    textAlign: 'center',
    backdropFilter: 'blur(12px)',
  },
  loadingText: {
    fontSize: '22px',
    fontWeight: 600,
    color: '#00f7ff',                                      // neon cyan text
    textShadow: '0 0 6px rgba(0, 247, 255, 0.6)',          // cyan glow text shadow
  },
};

export default App;
