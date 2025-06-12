import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './components/auth/admin/admin-login/admin-login-page';
import Header from './components/common/header';
import HomePage from './components/home/homepage';
import Footer from './components/common/footer';
import Prediksi from './components/prediksi/prediksi';
import ContactPage from './components/contact/contactPage';
import TentangPage from './components/tentang/tentangPage';
import ArticlePage from './components/article/articlePage';
import UserSignUpPage from './components/auth/user/user-register/user-signup-page';
import UserLoginPage from './components/auth/user/user-login/user-login-page';
import AdminDashboard from './components/auth/admin/admin-login/dashboard';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Fitur', path: '/fitur' },
    { name: 'Article', path: '/article' },
    { name: 'Prediksi', path: '/prediksi' },
    { name: 'Tentang', path: '/tentang' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <Router basename="/NaraStocksm">
      <Routes>
        {/* Semua route user, render header & footer */}
        <Route
          path="/"
          element={
            <>
              <Header
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                setMenuOpen={setMenuOpen}
                menuItems={menuItems}
              />
              <main>
                <HomePage />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/prediksi"
          element={
            <>
              <Header
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                setMenuOpen={setMenuOpen}
                menuItems={menuItems}
              />
              <main>
                <Prediksi />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                setMenuOpen={setMenuOpen}
                menuItems={menuItems}
              />
              <main>
                <ContactPage />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/tentang"
          element={
            <>
              <Header
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                setMenuOpen={setMenuOpen}
                menuItems={menuItems}
              />
              <main>
                <TentangPage />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/article"
          element={
            <>
              <Header
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                setMenuOpen={setMenuOpen}
                menuItems={menuItems}
              />
              <main>
                <ArticlePage />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                setMenuOpen={setMenuOpen}
                menuItems={menuItems}
              />
              <main>
                <UserSignUpPage />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                setMenuOpen={setMenuOpen}
                menuItems={menuItems}
              />
              <main>
                <UserLoginPage />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/hayolo"
          element={
            <main>
              <AdminLoginPage />
            </main>
          }
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;