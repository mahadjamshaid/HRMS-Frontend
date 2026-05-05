import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { signupUser } from "../api/auth.api";
import { setToken } from "../utils/auth.utils";
import bgImage from "../assets/bg-image.png";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import type { FormEvent } from "react";

// schema
const signupSchema = z.object({
  username: z.string().min(1, "Username required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormErrors = Partial<Record<"username" | "email" | "password" | "confirmPassword" | "signup", string>>;


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState<SignupFormErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const result = signupSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,

    });

    if (!result.success) {
      const errors: SignupFormErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (
          (field === "username" ||
            field === "email" ||
            field === "password" ||
            field === "confirmPassword") &&
          !errors[field]
        ) {
          errors[field] = issue.message;
        }
      });

      setErr(errors);
      return;
    }


    setErr({});
    setLoading(true);

    const res = await signupUser({ username, email, password, confirmPassword });

    setLoading(false);

    if (!res || !res.ok || !res.data) {
      const errorMsg = res.message || res.error || "Signup failed. Please check your connection.";
      setErr({ signup: errorMsg });
      return
    }

    setToken(res.data.token);
    console.log("SIGNUP SUCCESS:", res.data);
    const { token, role } = res.data;
    const userRole = role || "employee";
    localStorage.setItem("role", userRole);
    if (userRole === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/employee/dashboard", { replace: true });
    }
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
          <h1 className="auth-hero-title">Empower your<br />workforce</h1>
          <p className="auth-hero-subtitle">Manage HR tasks in just a few clicks</p>
          <div className="carousel-indicators">
            <div className="indicator-dot"></div>
            <div className="indicator-bar"></div>
            <div className="indicator-dot"></div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <h2 className="auth-header-title">Join xNerds Today!</h2>
          <p className="auth-header-subtitle">Create your account</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="form-field-group">
              <label className="label-text">Username</label>
              <input
                className="input-field"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              {err.username && <p className="error-text">{err.username}</p>}
            </div>

            <div className="form-field-group">
              <label className="label-text">Your Email</label>
              <input
                className="input-field"
                placeholder="info@xnerds.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {err.email && <p className="error-text">{err.email}</p>}
            </div>

            <div className="form-field-group">
              <label className="label-text">Password</label>
              <div className="relative">
                <input
                  className="input-field pr-10"
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-2.228-2.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {err.password && <p className="error-text">{err.password}</p>}
            </div>

            <div className="form-field-group">
              <label className="label-text">Confirm Password</label>
              <input
                className="input-field"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              {err.confirmPassword && (
                <p className="error-text">{err.confirmPassword}</p>
              )}
            </div>

            {err.signup && <p className="alert-error">{err.signup}</p>}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? "Signing up..." : "Register Account"}
            </Button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
