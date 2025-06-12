import React, { useState, useEffect, useRef } from 'react';
import LoginPresenter from './user-login-presenter'; // Import the new LoginPresenter
import './user-login.css'; // Reusing the same CSS file for styling

const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const presenter = useRef(new LoginPresenter());
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  useEffect(() => {
    presenter.current.setView({
      showErrorMessage: (message) => setErrorMessage(message),
      clearErrorMessage: () => setErrorMessage(''),
      showLoading: (loading) => setIsLoading(loading),
      onLoginSuccess: () => {
        setShowSuccessPopup(true);
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setTimeout(() => {
          setShowSuccessPopup(false);
          window.location.href = '/NaraStocksm/prediksi';
        }, 1500); // Popup tampil 1.5 detik lalu redirect
      },
    });

    return () => { };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    presenter.current.handleLoginAttempt(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex flex-col md:flex-row w-full max-w-full mx-auto mt-6 px-6 gap-10 md:gap-20 font-montserrat pb-20">
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg px-8 py-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-green-600">Login Berhasil!</h3>
            <p className="text-gray-700">Anda akan diarahkan ke halaman prediksi...</p>
          </div>
        </div>
      )}
      <section className="md:w-1/2 rounded-3xl overflow-hidden relative max-w-md md:max-w-none mx-auto md:mx-0">
        <img
          alt="Abstract colorful waves in pink and blue on black background"
          className="w-full h-full object-cover rounded-3xl md:block hidden"
          height="900"
          src="https://storage.googleapis.com/a1aa/image/9730b24f-242b-42d5-0b08-478de36d5724.jpg"
          width="720"
        />
        <img
          alt="Abstract colorful waves in pink and blue on black background, partially visible on left side behind form on small screens"
          className="w-40 h-40 object-cover rounded-3xl absolute top-10 left-4 md:hidden"
          height="160"
          src="https://storage.googleapis.com/a1aa/image/9730b24f-242b-42d5-0b08-478de36d5724.jpg"
          width="160"
        />
        <h1 className="text-white text-5xl leading-[1.1] absolute bottom-8 left-8 max-w-[280px] md:block hidden font-montserrat">
          Welcome
          <br />
          Back
          <br />
          To Your Journey
        </h1>
      </section>
      <section className="md:w-1/2 max-w-md mx-auto md:mx-0 relative">
        <div className="flex justify-center mb-6"></div>
        <h2 className="text-3xl text-center mb-2 font-semibold text-[#121212] font-montserrat">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-600 mb-10">
          Enter your email and password to log in
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm text-gray-900 font-normal" htmlFor="emailInput">
              Email
            </label>
            <input
              className="w-full rounded-lg bg-gray-100 text-gray-600 placeholder-gray-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black custom-focus-ring"
              id="emailInput"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <label className="block mb-1 text-sm text-gray-900 font-normal" htmlFor="passwordInput">
              Password
            </label>
            <input
              className="w-full rounded-lg bg-gray-100 text-gray-600 placeholder-gray-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10 custom-focus-ring"
              id="passwordInput"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </span>
          </div>
          {errorMessage && (
            <div id="errorMessage" className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          <button
            className="w-full bg-[#121212] text-white font-semibold rounded-lg py-3 text-sm hover:brightness-110 transition btn-gradient-transition"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-10">
          Don't have an account?
          <a className="font-semibold text-black hover:underline" href="/NaraStocksm/signup">
            Sign Up
          </a>
        </p>
      </section>
    </main>
  );
};

export default UserLoginPage;
