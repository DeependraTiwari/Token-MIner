import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../AuthProvider';
import './AllUsers.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { callFunction } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      const userList = await callFunction.get_all_users();
      console.log('Fetched users:', userList);
      setUsers(userList);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [callFunction]);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, [fetchUsers, refreshTrigger]);

  const manualRefresh = () => {
    setLoading(true);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>👥 All Registered Users</h2>
          <button
            onClick={manualRefresh}
            style={styles.refreshBtn}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 0 15px rgba(0, 247, 255, 0.8)'}
            onMouseLeave={(e) => e.target.style.boxShadow = styles.refreshBtn.boxShadow}
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p style={styles.status}>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={styles.status}>No users found.</p>
        ) : (
          <div style={styles.cardGrid}>
            {users.map(([principal, balance], idx) => (
              <UserCard key={idx} principal={principal} balance={balance} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const UserCard = ({ principal, balance }) => {
  return (
    <div style={styles.userCard} className="userCard">
      <p style={styles.userPrincipal}>{principal}</p>
      <p style={styles.userBalance}>💰 {balance}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: 'linear-gradient(135deg, #05080f 0%, #000000 100%)', // darker base
    minHeight: '100vh',
    fontFamily: `'Inter', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: '100%',
    maxWidth: '1000px',
    background: 'rgba(0, 0, 0, 0.55)',
    border: '1px solid rgba(0, 247, 255, 0.25)', // brighter cyan edge
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    boxShadow: '0 0 25px rgba(0, 247, 255, 0.1), 0 25px 50px rgba(0, 0, 0, 0.6)',
    padding: '30px 40px',
    animation: 'fadeIn 0.6s ease-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 247, 255, 0.25)',
    paddingBottom: '12px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#00f7ff',
    letterSpacing: '1.2px',
    textShadow: '0 0 8px rgba(0, 247, 255, 0.8)',
  },
  refreshBtn: {
    padding: '8px 14px',
    fontSize: '14px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #06b6d4, #22d3ee)',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(0, 247, 255, 0.8)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  status: {
    fontSize: '17px',
    color: '#b3faff', // soft cyan-tinted gray
    marginTop: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  userCard: {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(0, 247, 255, 0.2)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 0 12px rgba(0, 247, 255, 0.15)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  userCardHover: {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 0 20px rgba(0, 247, 255, 0.8), 0 0 40px rgba(0, 247, 255, 0.4)',
  },
  userPrincipal: {
    fontSize: '14px',
    color: '#00f7ff',
    marginBottom: '10px',
    wordBreak: 'break-all',
    textShadow: '0 0 6px rgba(0, 247, 255, 0.5)',
  },
  userBalance: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#e0faff',
  },
};

// Inject animation styles
const animationStyles = `
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(8px); 
    filter: drop-shadow(0 0 5px rgba(0, 247, 255, 0.5));
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
    filter: drop-shadow(0 0 12px rgba(0, 247, 255, 0.8));
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = animationStyles;
  document.head.appendChild(styleEl);
}

export default AllUsers;
