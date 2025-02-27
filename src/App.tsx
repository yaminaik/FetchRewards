import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import { Toaster } from "react-hot-toast"; 
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/search" replace /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />
          }
        />
        <Route
  path="/search"
  element={isAuthenticated ? <SearchPage onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/" replace />}
/>

           <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
