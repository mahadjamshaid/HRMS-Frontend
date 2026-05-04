import { useState } from "react";
import { forgotPassword } from "../api/auth.api";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg-image.png";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import type { FormEvent } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);

    if (!res.ok) {
      setError(res.error || res.message || "Something went wrong");
      return;
    }

    setMsg("If this email exists, a reset link has been sent.");
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
          <h1 className="auth-hero-title">Recover your<br />account</h1>
          <p className="auth-hero-subtitle">Reset your password in a few simple steps</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <h2 className="auth-header-title">Forgot Password?</h2>
          <p className="auth-header-subtitle">Enter your email to receive a reset link</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-field-group">
              <label className="label-text">Your Email</label>
              <input 
                type="email"
                className="input-field"
                placeholder="info@xnerds.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {error && <p className="error-text">{error}</p>}
            </div>

            {msg && <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-100 text-center">{msg}</p>}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <p className="auth-footer">
            Remembered your password?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
