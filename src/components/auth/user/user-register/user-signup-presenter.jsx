// user-signup-presenter.js
import { registerUser } from '../../../../services/Model';

class SignUpPresenter {
  constructor() {
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  async handleSignUpAttempt(fullName, email, password) {
    this.view.showLoading(true);
    this.view.clearErrorMessage();

    if (!fullName || !email || !password) {
      this.view.showErrorMessage('Semua kolom harus diisi.');
      this.view.showLoading(false);
      return;
    }

    if (!this.isValidEmail(email)) {
      this.view.showErrorMessage('Format email tidak valid.');
      this.view.showLoading(false);
      return;
    }

    if (password.length < 6) {
      this.view.showErrorMessage('Password minimal 6 karakter.');
      this.view.showLoading(false);
      return;
    }

    try {
      const userData = {
        username: fullName,
        email,
        password,
      };

      await registerUser(userData);

      this.view.showSignUpSuccess();
    } catch (error) {
      this.view.showErrorMessage(error.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      this.view.showLoading(false);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default SignUpPresenter;
