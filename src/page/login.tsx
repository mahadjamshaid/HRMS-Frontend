import { loginUser } from "../api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { setToken } from "../utils/auth.utils";
import bgImage from "../assets/bg-image.png";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import type { FormEvent } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

type LoginFormErrors = Partial<Record<"email" | "password" | "login", string>>;

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const error: LoginFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if ((field === "email" || field === "password") && !error[field]) {
          error[field] = issue.message
        }
      })
      setErr(error);
      return
    }

    setErr({})
    setLoading(true)
    const res = await loginUser({ email, password });
    setLoading(false)

    if (!res || !res.ok || !res.data) {
      const errorMsg = res.message || res.error || "Login failed. Please check your connection.";
      setErr({ login: errorMsg });
      return
    }

    const { token, role } = res.data;

    if (!token || !role) {
      setErr({ login: "Invalid server response" });
      return;
    }

    setToken(token)
    localStorage.setItem("role", role);

    if (role === "admin") {
      navigate("/dashboard", { replace: true });
    } else if (role === "employee") {
      navigate("/employee/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="auth-page-container">
      {/* Left Panel */}
      <div className="auth-side-panel" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="auth-overlay"></div>
        <div className="brand-wrapper flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
            <img src={logo} alt="xNerds Logo" className="h-6 w-auto invert brightness-0" />
          </div>
          <span className="brand-text text-3xl">xNerds</span>
        </div>
        <div className="auth-hero-section">
          <h1 className="auth-hero-title">Empower your<br />workforce</h1>
          <p className="auth-hero-subtitle">The next-generation human resource management system for high-performance teams.</p>
          <div className="carousel-indicators">
            <div className="indicator-bar bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>
            <div className="indicator-dot"></div>
            <div className="indicator-dot"></div>
          </div>
        </div>
        <div className="relative z-10 p-8 glass-card rounded-[2.5rem] flex items-center justify-between animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-xl">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl">+2k</div>
          </div>
          <p className="text-xs font-bold text-white/80">Trusted by over 2,000+ companies worldwide.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="mb-12">
            <h2 className="auth-header-title">Welcome Back!</h2>
            <p className="auth-header-subtitle">Sign in to manage your workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-field-group">
              <label className="label-text">Business Email</label>
              <input type="email"
                className="input-field"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {err.email && <p className="error-text ml-1 font-bold">{err.email}</p>}
            </div>

            <div className="form-field-group">
              <label className="label-text">Password</label>
              <div className="relative group">
                <input type={showPassword ? "text" : "password"}
                  className="input-field pr-12 group-focus-within:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-2.228-2.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {err.password && <p className="error-text ml-1 font-bold">{err.password}</p>}
            </div>

            <div className="auth-options-row">
              <label className="checkbox-label group">
                <input type="checkbox" className="checkbox-input group-hover:border-indigo-400" />
                Keep me logged in
              </label>
              <Link to="/forgot-password" className="forgot-password-link">Recover Access</Link>
            </div>

            {err.login && <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl text-rose-600 text-sm font-bold animate-in fade-in zoom-in duration-300 text-center">{err.login}</div>}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? "Authenticating..." : "Continue to Dashboard"}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-400">Secure SSO Login</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" type="button" className="w-full h-[52px]" icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z" /><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.806l-4.04 3.134a11.97 11.97 0 0010.763 6.581c3.085 0 5.834-1.018 7.77-2.753l-3.73-3.234z" /><path fill="#4A90E2" d="M19.98 12c0-.85-.148-1.664-.405-2.433H12v4.542h4.526c-.234 1.488-1.099 2.766-2.486 3.655l3.731 3.234c2.196-2.023 3.465-5 3.465-8.998z" /><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z" /></svg>}>
                Google
              </Button>
              <Button variant="secondary" type="button" className="w-full h-[52px]" icon={<svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>}>
                Facebook
              </Button>
            </div>
          </form>

          <p className="auth-footer text-base font-medium">
            New to xNerds?{" "}
            <Link to="/signup" className="text-indigo-600 font-black hover:underline tracking-tight">Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
