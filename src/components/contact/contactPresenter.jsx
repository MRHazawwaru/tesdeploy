// contactPresenter.jsx
import { useState } from 'react';

const useContactPresenter = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+62\d{8,15}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Hapus error untuk field ini saat pengguna mulai mengetik
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Hapus semua non-digit
    // Logika untuk memformat nomor telepon menjadi +62
    if (value.startsWith('62')) {
      value = '+' + value;
    } else if (value.startsWith('0')) {
      value = '+62' + value.substring(1);
    } else if (value && !value.startsWith('+62') && value.length > 0) {
      value = '+62' + value;
    }
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
    if (errors.phone) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: '',
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Nama Lengkap wajib diisi.';
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email tidak valid.';
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Nomor WhatsApp harus diawali +62 dan formatnya valid.';
    }
    if (!formData.subject) {
      newErrors.subject = 'Pilih kategori pertanyaan.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Detail pertanyaan atau kebutuhan wajib diisi.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Mengembalikan true jika tidak ada error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Hapus pesan sukses sebelumnya
    if (!validateForm()) {
      return; // Jangan lanjutkan jika validasi gagal
    }

    setIsLoading(true);
    // Simulasikan panggilan API
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulasi penundaan jaringan
      console.log('Form submitted:', formData);
      setSuccessMessage('Pesan berhasil dikirim! Terima kasih telah menghubungi kami.');
      // Reset formulir setelah berhasil
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({}); // Hapus error saat berhasil submit
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        form: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
      // Gulir ke atas halaman untuk menampilkan pesan sukses/error
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return {
    formData,
    isLoading,
    successMessage,
    errors,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  };
};

export default useContactPresenter;
