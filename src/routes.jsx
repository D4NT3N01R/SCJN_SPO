import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PaginaBase from './pages/paginaBase';
import Login from './components/login';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/protectedRoute'; // Import our new component

const isAuthenticated = () => {
  return localStorage.getItem('authenticated') !== null;
};

export const AppRoutes = () => (
  <Router>
    <Routes>
      {/* GROUP 1: Public Routes
        Routes that do not require authentication.
        The login page should not have the main sidebar/header layout.
      */}
      <Route path="/login" element={
        isAuthenticated() ? <Navigate to="/home" replace /> : <Login />
      } />


      {/* GROUP 2: Protected Routes
        These routes are only accessible after authentication.
        They are wrapped by our ProtectedRoute component.
      */}
      <Route element={<ProtectedRoute />}>
        {/* All routes inside here will first check for authentication. */}
        {/* PaginaBase now acts as the layout for all protected pages. */}
        <Route element={<PaginaBase />}>
          <Route path="/home" element={<Home />} />
          {/* maybe for adding,  other protected pages here. They will automatically get the layout and protection.
            For example:
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/confis" element={<SettingsPage />} />
          */}
        </Route>
      </Route>


      {/* ROOT & CATCH-ALL: Handle initial navigation and unknown paths.
      */}
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
        }
      />
      
      {/* Optional: A 404 Not Found page is better than a redirect loop */}
      <Route path="*" element={<div><h1>404 Not Found</h1></div>} />

    </Routes>
  </Router>
);