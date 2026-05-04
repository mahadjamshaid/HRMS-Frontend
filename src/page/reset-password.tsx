import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth.api";
import bgImage from "../assets/bg-image.png";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import type { FormEvent } from "react";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    const res = await resetPassword({
      token: token || "",
      newPassword: password,
    });
    setLoading(false);

    if (!res.ok) {
      setError(res.error || res.message || "Reset failed");
      return;
    }

    alert("Password reset successful");
    navigate("/login");
  };

  return (
    <div className="auth-page-container">
      {/* Left Panel */}
      <div className="auth-side-panel" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="auth-overlay"></div>
        <div className="brand-wrapper">
          <img src={logo} alt="xNerds Logo" className="brand-logo-img" />
          <span className="brand-text">xNerds</span>
        </div>
        <div className="auth-hero-section">
          <h1 className="auth-hero-title">Secure your<br />account</h1>
          <p className="auth-hero-subtitle">Create a new strong password</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <h2 className="auth-header-title">Reset Password</h2>
          <p className="auth-header-subtitle">Enter your new password below</p>

          <form onSubmit={handleReset} className="space-y-5">
            <div className="form-field-group">
              <label className="label-text">New Password</label>
              <input 
                type="password"
                className="input-field"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              {error && <p className="error-text">{error}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
