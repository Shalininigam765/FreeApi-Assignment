import { useState } from "react";

export default function LoginForm({ goToRegister, onLoginSuccess }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
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
            const response = await fetch("https://api.freeapi.app/api/v1/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                onLoginSuccess(data.data.user);
            } else {
                setError(data.message || "Login failed. Try again.");
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
                <div className="form-icon">🔐</div>
                <h2>Welcome Back</h2>
                <p className="form-subtitle">Sign in to your account</p>
            </div>

            {error && <div className="error-box">⚠ {error}</div>}

            <form onSubmit={handleSubmit} className="form-body">
                <div className="input-group">
                    <label>Username</label>
                    <input
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <span className="spinner" /> : "Sign In"}
                </button>
            </form>

            <p className="form-switch">
                Don't have an account?{" "}
                <span onClick={goToRegister}>Register here</span>
            </p>
        </div>
    );
}
