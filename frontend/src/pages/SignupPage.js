import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form.username, form.email, form.password);
    if (res.error) {
      setError(res.error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-80">
        <input name="username" placeholder="Username" onChange={handleChange} className="p-2 mb-3 border rounded" required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="p-2 mb-3 border rounded" required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="p-2 mb-3 border rounded" required />
        <button className="bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
