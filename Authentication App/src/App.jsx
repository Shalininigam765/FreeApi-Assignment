import { useState } from "react";
import RegisterForm from "./register.jsx";
import LoginForm from "./login.jsx";

const App = () => {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  return (
    <div className="app-bg">
      <div className="overlay" />

      <div className="app-center">
        {view === "register" && (
          <RegisterForm
            onSuccess={() => setView("login")}
            goToLogin={() => setView("login")}
          />
        )}

        {view === "login" && (
          <LoginForm
            goToRegister={() => setView("register")}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {view === "dashboard" && user && (
          <div className="form-card dashboard-card">
            <div className="form-icon">🎉</div>
            <h2>You're logged in!</h2>
            <p className="form-subtitle">Welcome back, <strong>{user.username}</strong></p>
            <div className="user-info">
              <div className="user-row"><span>Email</span><strong>{user.email}</strong></div>
              <div className="user-row"><span>Role</span><strong>{user.role}</strong></div>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
