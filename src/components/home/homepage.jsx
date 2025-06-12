// components/home/homepage.jsx
import React from 'react';
import heroImage from '../../assets/homenarastock.png';
import useHomePresenter from './homepresenter';

function HomePage() {
  const { handleMulaiPrediksiClick } = useHomePresenter();

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-12 sm:pb-24 relative">
        {/* Decorative elements */}
        <div className="absolute top-16 sm:top-32 right-8 sm:right-16 w-4 sm:w-6 h-4 sm:h-6 bg-lime-500 opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-32 sm:top-48 left-6 sm:left-12 w-3 sm:w-4 h-3 sm:h-4 bg-gray-400 opacity-30 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-48 sm:top-72 right-16 sm:right-32 w-2 sm:w-3 h-2 sm:h-3 bg-lime-500 opacity-15 rounded-full animate-float animation-delay-1000"></div>

        <div className="text-center">
          <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-5xl leading-tight text-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
            Prediksi Pasar Saham Mingguan Untuk
          </h1>
          <h2 className="font-instrument italic font-bold text-3xl sm:text-5xl lg:text-6xl mt-1 leading-tight text-lime-500">
            Investor Pemula
          </h2>
          <p className="text-black text-sm sm:text-base lg:text-lg mt-4 max-w-xl mx-auto opacity-90">
            Mudahkan keputusan investasi Anda dengan prediksi yang sederhana, akurat, dan mudah
            dipahami.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <i className="fas fa-shield-alt text-lime-500"></i>
            <span>Terpercaya</span>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-chart-line text-lime-500"></i>
            <span>Akurasi Terpercaya</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button
            className="w-full sm:w-auto bg-lime-500 text-black font-bold rounded-full px-6 py-3 shadow-[0_20px_40px_rgba(159,255,74,0.4)] hover:shadow-[0_25px_50px_rgba(159,255,74,0.5)] transition-all duration-300 transform hover:scale-105"
            onClick={handleMulaiPrediksiClick}
          >
            <i className="fas fa-rocket mr-2"></i>
            Mulai Prediksi
          </button>
          <button className="w-full sm:w-auto bg-white text-black font-bold rounded-full px-6 py-3 shadow-lg hover:shadow-xl border-2 border-lime-500 hover:bg-lime-500 transition-all duration-300">
            <i className="fas fa-play mr-2"></i>
            Pelajari Fitur
          </button>
        </div>

        {/* Hero Image */}
        <div className="mt-8 sm:mt-12 mx-auto max-w-[577px]">
          <img
            src={heroImage}
            alt="Stock monitor displaying various stock charts and graphs with green and red candlesticks and data indicators"
            className="w-full rounded-3xl shadow-2xl object-cover aspect-video"
            draggable={false}
            loading="lazy"
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#e8e8e8] py-16 sm:py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-300 to-transparent opacity-30 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-gray-300 to-transparent opacity-20 rounded-full translate-x-24 translate-y-24"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-6">
              Why Choose Insight
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fff4a] via-[#7dd83f] to-[#5cb82e]">
                NaraStock App
              </span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">
              NARASTOCK adalah platform prediksi pasar berbasis data yang membantu pengguna memahami
              pergerakan USD/EUR secara real-time melalui analisis machine learning, grafik
              interaktif, dan insight terkini—memberikan keputusan finansial yang lebih cerdas dan
              terarah.
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-4 italic">
              "Satu Pandangan, Seribu Peluang — Powered by NARASTOCK"
            </p>
          </div>

          {/* Features Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gray-400 h-full hidden lg:block"></div>

            {/* Feature 1: Accuracy */}
            <div className="relative flex flex-col lg:flex-row items-center mb-16 lg:mb-20">
              <div className="lg:w-1/2 lg:pr-12 text-center lg:text-right mb-8 lg:mb-0 order-2 lg:order-1">
                <div className="flex items-center justify-center lg:justify-end mb-4">
                  <i className="fas fa-quote-left text-2xl text-gray-400 mr-3"></i>
                  <h3 className="font-bold text-2xl sm:text-3xl text-black">Accuracy</h3>
                </div>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Menggunakan machine learning untuk memberikan prediksi otomatis dan berbasis data
                </p>
              </div>

              {/* Central Icon */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-[#ffd700] rounded-full flex items-center justify-center shadow-lg mb-8 lg:mb-0 order-1 lg:order-2">
                <i className="fas fa-bullseye text-2xl sm:text-3xl text-black"></i>
              </div>

              <div className="lg:w-1/2 lg:pl-12 order-3"></div>
            </div>

            {/* Feature 2: Integration */}
            <div className="relative flex flex-col lg:flex-row items-center mb-16 lg:mb-20">
              <div className="lg:w-1/2 lg:pr-12 order-1"></div>

              {/* Central Icon */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-[#ffd700] rounded-full flex items-center justify-center shadow-lg mb-8 lg:mb-0 order-2">
                <i className="fas fa-cogs text-2xl sm:text-3xl text-black"></i>
              </div>

              <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left order-3">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <h3 className="font-bold text-2xl sm:text-3xl text-black">Integration</h3>
                  <i className="fas fa-quote-right text-2xl text-gray-400 ml-3"></i>
                </div>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Integrasi langsung dengan data historis dari yfinance tanpa biaya.
                </p>
              </div>
            </div>

            {/* Feature 3: User-friendly */}
            <div className="relative flex flex-col lg:flex-row items-center mb-16 lg:mb-20">
              <div className="lg:w-1/2 lg:pr-12 text-center lg:text-right mb-8 lg:mb-0 order-2 lg:order-1">
                <div className="flex items-center justify-center lg:justify-end mb-4">
                  <i className="fas fa-quote-left text-2xl text-gray-400 mr-3"></i>
                  <h3 className="font-bold text-2xl sm:text-3xl text-black">User-friendly</h3>
                </div>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Antarmuka sederhana dan user-friendly, cocok untuk pemula.
                </p>
              </div>

              {/* Central Icon */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-[#ffd700] rounded-full flex items-center justify-center shadow-lg mb-8 lg:mb-0 order-1 lg:order-2">
                <i className="fas fa-user-friends text-2xl sm:text-3xl text-black"></i>
              </div>

              <div className="lg:w-1/2 lg:pl-12 order-3"></div>
            </div>

            {/* Feature 4: Modernity */}
            <div className="relative flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 order-1"></div>

              {/* Central Icon */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-[#ffd700] rounded-full flex items-center justify-center shadow-lg mb-8 lg:mb-0 order-2">
                <i className="fas fa-rocket text-2xl sm:text-3xl text-black"></i>
              </div>

              <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left order-3">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <h3 className="font-bold text-2xl sm:text-3xl text-black">Modernity</h3>
                  <i className="fas fa-quote-right text-2xl text-gray-400 ml-3"></i>
                </div>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Dikembangkan dengan teknologi modern (React, FastAPI, Scikit-Learn).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default HomePage;
