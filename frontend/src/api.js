// src/api.js
const API_BASE = "http://127.0.0.1:8000/api";

export async function register(username, email, password) {
  const res = await fetch(`${API_BASE}/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getProducts() {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_BASE}/products/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
