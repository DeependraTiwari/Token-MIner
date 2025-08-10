import React, { useState } from 'react';
import { useAuth } from '../../AuthProvider';
import coinIcon from '../../assets/coin-purse.png'; // use your uploaded icon path

const Balance = () => {
  const [principal, setPrincipal] = useState('');
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { callFunction } = useAuth();

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setBalance(null);

    try {
      const result = await callFunction.check_balance_of(principal);
      setBalance(result);
      setStatus('✅ Balance fetched successfully.');
    } catch (err) {
      console.error("Error fetching balance:", err);
      setStatus('❌ Failed to fetch balance. Check the Principal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icon */}
        <img src={coinIcon} alt="Coin Purse Icon" style={styles.icon} />

        <h2 style={styles.title}> Check Balance</h2>
        <form onSubmit={handleCheckBalance} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Principal ID:</label>
            <textarea
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
              style={styles.principalBox}
              placeholder="Enter principal ID"
              rows={2}
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? '⚡ Checking...' : '💰 Check Balance'}
          </button>
        </form>
        {status && <p style={styles.status}>{status}</p>}
        {balance !== null && (
          <div style={styles.resultBox}>
            <strong>💰 Balance:</strong> {balance}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: 'linear-gradient(to bottom right, #111827, #000000)', // bg-gradient-to-br from-gray-900 to-black
    minHeight: '100vh',
    fontFamily: `'Inter', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    background: 'rgba(0, 0, 0, 0.5)', // bg-black bg-opacity-50
    backdropFilter: 'blur(16px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)', // border border-white border-opacity-10
    boxShadow: '0 0 10px #00f7ff', // drop-shadow-[0_0_10px_#00f7ff]
    padding: '30px 40px',
    color: '#ffffff', // text-white
    textAlign: 'center',
  },
  icon: {
    width: '120px',
    marginBottom: '15px',
    animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
  },
  title: {
    fontSize: '26px',
    marginBottom: '25px',
    fontWeight: 700,
    color: '#00f7ff', // text-cyan-400
    borderBottom: '2px solid rgba(0, 247, 255, 0.4)',
    paddingBottom: '10px',
    textShadow: '0 0 6px #00f7ff', // drop-shadow-[0_0_6px_#00f7ff]
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    fontSize: '16px',
    color: '#00f7ff',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  principalBox: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontFamily: 'monospace',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#00f7ff',
    boxShadow: '0 0 8px #00f7ff',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    background: '#06b6d4', // bg-cyan-500
    color: '#000000', // text-black
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 0 10px #00f7ff',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  status: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#00f7ff',
    textShadow: '0 0 6px #00f7ff',
  },
  resultBox: {
    marginTop: '15px',
    fontSize: '17px',
    color: '#00f7ff',
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '10px 15px',
    borderRadius: '8px',
    wordBreak: 'break-word',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 6px #00f7ff',
  },
};

// Animations
const animationStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes glow {
  0% { filter: drop-shadow(0 0 3px #00f7ff) drop-shadow(0 0 6px #00f7ff); }
  100% { filter: drop-shadow(0 0 8px #00f7ff) drop-shadow(0 0 15px #00f7ff); }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = animationStyles;
  document.head.appendChild(styleEl);
}

export default Balance;

