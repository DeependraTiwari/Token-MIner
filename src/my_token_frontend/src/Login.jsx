import React from 'react';
import { useAuth } from './AuthProvider';
import DT_Logo from './assets/Dt_Token.png'; // make sure this file exists in src/assets
import './Login.css'; // CSS file for animations

const Login = () => {
  const { login } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <img src={DT_Logo} alt="DT_Logo" style={styles.logo} />
        </div>
        <h2 style={styles.title}>
          Welcome to <span style={styles.coinName}>Deep</span>
          <span style={styles.coinNameX}>Token</span>
        </h2>
        <p style={styles.subtitle}>
          Your secure gateway to Decentralized Token System.
        </p>
        <button
          onClick={login}
          style={styles.button}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 0 20px rgba(0, 247, 255, 0.85)'}
          onMouseLeave={(e) => e.target.style.boxShadow = styles.button.boxShadow}
        >
          Log in with Internet Identity
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: 'radial-gradient(circle at center, #000000 0%, #0a0a0a 100%)',
    minHeight: '100vh',
    fontFamily: `'Inter', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: 'rgba(0, 247, 255, 0.05)', // subtle cyan tint
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 20px 50px rgba(0, 128, 153, 0.5)', // dark cyan shadow
    padding: '40px 30px',
    textAlign: 'center',
    border: '1px solid rgba(0, 247, 255, 0.3)', // neon cyan border
    animation: 'fadeIn 0.6s ease-out',
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logo: {
    height: '70px',
    width: '70px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 10px rgba(0, 247, 255, 0.7))',
    animation: 'spinLogo 8s linear infinite', // keep as is
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '10px',
    color: '#00f7ff',
    textShadow: '0 0 8px rgba(0, 247, 255, 0.6)',
  },
  coinName: {
    color: '#00f7ff',
    fontWeight: 800,
    letterSpacing: '1px',
  },
  coinNameX: {
    color: '#00f7ff',
    fontWeight: 800,
    letterSpacing: '1px',
    textShadow: '0 0 12px rgba(0, 247, 255, 0.9)',
  },
  subtitle: {
    fontSize: '16px',
    color: '#7dd9f9',
    marginBottom: '30px',
  },
  button: {
    padding: '14px 30px',
    fontSize: '16px',
    background: 'linear-gradient(90deg, #00f7ff, #22d3ee)', // cyan gradient
    color: '#000',
    fontWeight: 700,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 247, 255, 0.6)',
    transition: 'all 0.3s ease',
  },
};

export default Login;