import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000'; // Ganti sesuai backend Anda
export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login gagal');

      // Simpan token dan info admin ke localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin', JSON.stringify({
        id: data.id,
        email: data.email,
        username: data.username,
      }));

      // Redirect ke halaman dashboard admin
      window.location.href = '/NaraStocksm/admin/dashboard';
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="adminEmail">
            Email
          </label>
          <input
            id="adminEmail"
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="adminPassword">
            Password
          </label>
          <input
            id="adminPassword"
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-2 rounded hover:bg-gray-800 transition"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}