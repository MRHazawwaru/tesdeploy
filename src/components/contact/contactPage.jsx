// contactPage.jsx
import React from 'react';
import useContactPresenter from './contactPresenter';
import './contact.css'; // Import custom CSS untuk hal-hal yang tidak bisa dicakup Tailwind

const ContactPage = () => {
  const {
    formData,
    isLoading,
    successMessage,
    errors,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  } = useContactPresenter();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <section className="animate-fade-in-up">
        <header className="mb-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Mari{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8cff3f] to-[#7de832] animate-glow">
              Terhubung
            </span>
            <br />
            dengan Tim Ahli
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            Punya pertanyaan tentang strategi investasi saham atau butuh konsultasi personal? <br />
            Tim kami siap membantu Anda meraih target finansial yang optimal.
          </p>
        </header>

        {successMessage && (
          <div className="success-message show flex items-center justify-center mx-auto max-w-xl animate-fade-in-up">
            <i className="fas fa-check-circle text-2xl mr-2" aria-hidden="true"></i>
            <span>{successMessage}</span>
          </div>
        )}
        {errors.form && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4 text-center max-w-xl mx-auto">
            {errors.form}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          <form onSubmit={handleSubmit} className="form-container p-8 space-y-6 flex-1" noValidate>
            <div className="form-group">
              <input
                type="text"
                id="fullname"
                name="fullname"
                className={`form-input w-full ${
                  errors.fullname ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                }`}
                placeholder=" "
                required
                aria-required="true"
                aria-describedby="fullnameHelp"
                autoComplete="name"
                value={formData.fullname}
                onChange={handleChange}
              />
              <label htmlFor="fullname" className="form-label">
                Nama Lengkap
              </label>
              <p id="fullnameHelp" className="sr-only">
                Masukkan nama lengkap Anda
              </p>
              {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input w-full ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                }`}
                placeholder=" "
                required
                aria-required="true"
                aria-describedby="emailHelp"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <p id="emailHelp" className="sr-only">
                Masukkan alamat email yang valid
              </p>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input w-full ${
                  errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                }`}
                placeholder=" "
                aria-describedby="phoneHelp"
                autoComplete="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
              <label htmlFor="phone" className="form-label">
                Nomor WhatsApp
              </label>
              <p id="phoneHelp" className="sr-only">
                Masukkan nomor WhatsApp dengan format +62 di depan
              </p>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <select
                id="subject"
                name="subject"
                className={`form-select w-full ${
                  errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                }`}
                required
                aria-required="true"
                aria-describedby="subjectHelp"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Pilih kategori pertanyaan
                </option>
                <option value="portfolio">Informasi detail Saham</option>
                <option value="technical">Bantuan Platform &amp; Tools</option>
                <option value="partnership">Kemitraan Bisnis</option>
                <option value="education">Program Edukasi</option>
                <option value="feedback">Feedback &amp; Testimonial</option>
              </select>
              <p id="subjectHelp" className="sr-only">
                Pilih kategori pertanyaan Anda
              </p>
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 text-base">
                Detail Pertanyaan atau Kebutuhan
              </label>
              <textarea
                id="message"
                name="message"
                className={`form-textarea w-full ${
                  errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                }`}
                placeholder="Ceritakan secara detail tentang situasi investasi Anda saat ini, target yang ingin dicapai, atau pertanyaan spesifik yang ingin didiskusikan dengan tim ahli kami..."
                required
                aria-required="true"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
              <button
                type="submit"
                id="submitBtn"
                className={`btn-primary font-bold shadow-lg relative overflow-hidden ${
                  isLoading ? 'btn-loading' : ''
                }`}
                aria-live="polite"
                aria-busy={isLoading ? 'true' : 'false'}
                disabled={isLoading}
              >
                <span id="btnText">{isLoading ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
              </button>
              <p className="text-xs text-gray-500 mt-4 sm:mt-0 flex items-center max-w-xs">
                <i className="fas fa-shield-alt mr-2" aria-hidden="true"></i>
                Data Anda 100% aman dan akan dijaga kerahasiaannya
              </p>
            </div>
          </form>

          <section className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              <article className="contact-card" tabIndex="0" aria-label="Email Support">
                <div className="flex items-center mb-3">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-[#8cff3f] to-[#7de832] rounded-lg flex items-center justify-center mr-3"
                    aria-hidden="true"
                  >
                    <i className="fas fa-envelope text-black text-lg"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">Email Support</h3>
                </div>
                <p className="text-gray-600 font-medium">narastocks@gmail.com</p>
                <p className="text-sm text-gray-500 mt-1">Response time: 2-4 jam</p>
              </article>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              <article className="contact-card" tabIndex="0" aria-label="Jam Operasional">
                <div className="flex items-center mb-3">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-[#8cff3f] to-[#7de832] rounded-lg flex items-center justify-center mr-3"
                    aria-hidden="true"
                  >
                    <i className="fas fa-clock text-black text-lg"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">Jam Operasional</h3>
                </div>
                <p className="text-gray-600 font-medium">Senin - Jumat</p>
                <p className="text-gray-600 font-medium">09:00 - 18:00 WIB</p>
                <p className="text-sm text-gray-500 mt-1">Weekend: Emergency only</p>
              </article>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              <article className="contact-card" tabIndex="0" aria-label="Kantor Pusat">
                <div className="flex items-center mb-3">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-[#8cff3f] to-[#7de832] rounded-lg flex items-center justify-center mr-3"
                    aria-hidden="true"
                  >
                    <i className="fas fa-map-marker-alt text-black text-lg"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">Kantor Pusat</h3>
                </div>
                <p className="text-gray-600 font-medium">Yogyakarta, Indonesia</p>
                <p className="text-sm text-gray-500 mt-1">Special Economic Zone</p>
              </article>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              <article className="contact-card" tabIndex="0" aria-label="Ikuti Kami">
                <div className="flex items-center mb-3">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-[#8cff3f] to-[#7de832] rounded-lg flex items-center justify-center mr-3"
                    aria-hidden="true"
                  >
                    <i className="fas fa-users text-black text-lg"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">Ikuti Kami</h3>
                </div>
                <nav className="flex space-x-3 mt-3" aria-label="Social media links">
                  <a
                    href="#"
                    className="social-icon hover:scale-110"
                    aria-label="GitHub"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="#"
                    className="social-icon hover:scale-110"
                    aria-label="Instagram"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="social-icon hover:scale-110"
                    aria-label="Twitter"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="social-icon hover:scale-110"
                    aria-label="LinkedIn"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </nav>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
