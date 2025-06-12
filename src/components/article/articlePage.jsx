import React, { useState, useEffect } from 'react';
import { getArticles } from './articlePresenter';
import './article.css';

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 3; // Maksimal 3 berita per halaman

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ambil data dari backend
        const response = await getArticles(currentPage, articlesPerPage);
        // Jika backend mengirim { data: [...], total: ... }
        const dataArr = response.data || response;
        setTotalArticles(response.total || response.count || dataArr.length);
        const mapped = dataArr.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt || item.content?.slice(0, 100) || '',
          imageUrl: item.image || 'https://via.placeholder.com/600x320?text=No+Image',
          imageAlt: item.title,
          author: item.author_email || 'Unknown',
          date: item.created_at ? new Date(item.created_at).toLocaleDateString() : '',
          tags: [],
        }));
        setArticles(mapped);
      } catch (err) {
        setError(err.message || 'Failed to load articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalArticles / articlesPerPage));

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    if (totalPages > 0) {
      pageNumbers.push(1);
      if (totalPages >= 2) pageNumbers.push(2);
    }
    if (currentPage > 3 && totalPages > 5) {
      pageNumbers.push('...');
    }
    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pageNumbers.includes(i) && i > 0) {
        pageNumbers.push(i);
      }
    }
    if (currentPage < totalPages - 2 && totalPages > 5) {
      if (!pageNumbers.includes(totalPages - 1) && !pageNumbers.includes(totalPages)) {
        pageNumbers.push('...');
      }
    }
    if (totalPages >= 2 && !pageNumbers.includes(totalPages - 1)) {
      pageNumbers.push(totalPages - 1);
    }
    if (totalPages >= 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }
    return pageNumbers.map((number, index) => (
      <li key={index}>
        {number === '...' ? (
          <span className="select-none text-sm font-normal text-gray-500">...</span>
        ) : (
          <button
            aria-current={currentPage === number ? 'page' : undefined}
            onClick={() => handlePageClick(number)}
            className={`pagination-btn ${currentPage === number ? 'aria-[current=page]' : ''}`}
            disabled={currentPage === number}
          >
            {number}
          </button>
        )}
      </li>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading articles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">{error}</div>
    );
  }

  return (
    <div className="bg-[#f3f5f9] text-gray-700 font-montserrat">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        <h2 className="text-black mb-8 select-none font-semibold text-lg">Narastocks Article</h2>
        <section aria-label="Article list" className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col card-hover animate-fadeSlideUp"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <img
                alt={article.imageAlt}
                className="w-full h-48 object-cover img-hover-zoom"
                height="320"
                src={article.imageUrl}
                width="600"
              />
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-[13px] text-[#7cff36] mb-1 select-none font-semibold">
                  {article.author} • {article.date}
                </p>
                <h3 className="text-black mb-2 text-lg font-semibold">{article.title}</h3>
                <p className="text-gray-500 flex-grow mb-4 leading-relaxed text-sm">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 text-[11px] font-semibold">
                    {article.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className={`rounded-full px-2 py-[2px] select-none`}
                        style={{ backgroundColor: `#${tag.bgColor}`, color: `#${tag.textColor}` }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      aria-label="Bookmark this article"
                      className="icon-btn focus:outline-none"
                    >
                      <i className="fas fa-bookmark"></i>
                    </button>
                    <button
                      aria-label="Comment on this article"
                      className="icon-btn focus:outline-none"
                    >
                      <i className="fas fa-comment-alt"></i>
                    </button>
                  </div>
                </div>
                <button className="selengkapnya-btn mt-4 self-start focus:outline-none text-sm font-semibold">
                  Selengkapnya
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </article>
          ))}
        </section>

        <nav
          aria-label="Pagination"
          className="flex justify-between items-center text-gray-500 text-sm mt-12 px-2 select-none"
        >
          <button
            aria-label="Previous"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 hover:text-[#7cff36] transition transform hover:scale-105 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-chevron-left"></i>
            Previous
          </button>
          <ul className="flex items-center gap-3 text-center font-semibold text-sm">
            {renderPaginationButtons()}
          </ul>
          <button
            aria-label="Next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 hover:text-[#7cff36] transition transform hover:scale-105 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <i className="fas fa-chevron-right"></i>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default ArticlePage;