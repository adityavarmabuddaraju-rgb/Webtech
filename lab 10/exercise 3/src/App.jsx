import { useState, useEffect } from 'react';
import './App.css';

/**
 * Exercise 3: React application that fetches data from an external API (JSONPlaceholder)
 * Handles loading, error, and dynamic list rendering states.
 */
function App() {
  // 1. Manage state using useState Hook
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Perform API calls using useEffect Hook for side effects
  useEffect(() => {
    // 3. Fetch data asynchronously using async/await and JavaScript fetch API
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Introducing a artificial delay for better loading visibility in visual demo
        // await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // 4. Ensure API call runs only once on component load using empty dependency array

  // Logic to handle conditional rendering
  return (
    <div className="app-container">
      <header className="header">
        <h1>Lab 10: Exercise 3</h1>
        <p className="subtitle">Real-time Data Fetching with React Hooks</p>
      </header>

      <main className="content">
        {/* 5. Show loading indicator while data is being fetched */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching amazing users...</p>
          </div>
        )}

        {/* 6. Handle API errors and display error messages */}
        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
          </div>
        )}

        {/* 7. Display the retrieved data dynamically using state-based rendering and list rendering with map() */}
        {!loading && !error && (
          <div className="user-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="card-header">
                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>
                  <h3>{user.name}</h3>
                </div>
                <div className="card-body">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Company:</strong> {user.company.name}</p>
                  <p><strong>Website:</strong> {user.website}</p>
                </div>
                <div className="card-footer">
                  <span className="user-id">#{user.id}</span>
                  <button className="view-details">Profile</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Advanced Web Technologies Lab</p>
      </footer>
    </div>
  );
}

export default App;
