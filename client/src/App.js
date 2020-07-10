import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes.jsx';
import { useAuth } from './hooks/auth.hook.js';
import { AuthContext } from './context/AuthContext.js';
import { Navbar } from './components/Navbar.jsx';
import { Loader } from './components/Loader.jsx';
import 'materialize-css';

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <main>
          { routes }
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
