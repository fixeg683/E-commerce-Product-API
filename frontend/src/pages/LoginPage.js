import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.username, form.password);
    if (res.access) {
      localStorage.setItem("access", res.access);
      navigate("/products");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-80">
        <input name="username" placeholder="Username" onChange={handleChange} className="p-2 mb-3 border rounded" required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="p-2 mb-3 border rounded" required />
        <button className="bg-green-600 text-white p-2 rounded">Login</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
