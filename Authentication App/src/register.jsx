import { useState } from "react";

const RegisterForm = ({ onSuccess, goToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.freeapi.app/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Please login.");
        onSuccess();
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="form-icon">✨</div>
        <h2>Create Account</h2>
        <p className="form-subtitle">Join us today, it's free!</p>
      </div>

      {error && <div className="error-box">⚠ {error}</div>}

      <form onSubmit={handleSubmit} className="form-body">
        <div className="input-group">
          <label>Username</label>
          <input
            name="username"
            placeholder="Choose a username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <span className="spinner" /> : "Create Account"}
        </button>
      </form>

      <p className="form-switch">
        Already have an account?{" "}
        <span onClick={goToLogin}>Login here</span>
      </p>
    </div>
  );
};

export default RegisterForm;
