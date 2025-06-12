/**
 * Mengambil daftar artikel dari backend Express.
 * @param {number} page - Nomor halaman yang diminta.
 * @param {number} limit - Jumlah artikel per halaman.
 * @returns {Promise<Array>} Promise berisi array objek artikel.
 */
export const getArticles = async (page, limit) => {
  try {
    const response = await fetch(
      `http://localhost:5000/articles?page=${page}&limit=${limit}`
    );
    if (!response.ok) throw new Error('Gagal mengambil artikel');
    const data = await response.json();
    // Data artikel ada di data.data (lihat contoh respons)
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};