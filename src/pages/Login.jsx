import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(form.email, form.password);
      nav("/"); 
    } catch (e) {
      setErr(e.message || "Login failed");
    }
  }

  return (
    <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 420, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.5rem", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
        <h2 style={{ marginTop: 0 }}>Login</h2>
        {err && <p style={{ color: "#b91c1c" }}>{err}</p>}

        <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          required
          style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1px solid #cbd5e1", borderRadius: 8 }}
        />

        <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          required
          style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1px solid #cbd5e1", borderRadius: 8 }}
        />

        <button type="submit" style={{ width: "100%", marginTop: 16, padding: "0.75rem 1rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
          Sign In
        </button>
        <p style={{ marginTop: 12 }}>
          No account?{" "}
          <Link to="/signup" style={{ color: "#2563eb" }}>
            Create one
          </Link>
        </p>
      </form>
    </section>
  );
}
