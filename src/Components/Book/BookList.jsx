import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setFilters, setPage } from "../../store/slices/bookSlice";
import { Link } from "react-router-dom";
import "./BookList.css";

// BookCategory enum to match backend
export const BookCategory = {
  Fiction: 1,
  NonFiction: 2,
  Science: 3,
  History: 4,
  Biography: 5,
};

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, filters, totalPages } = useSelector(
    (state) => state.books
  );

  // Local state for all filters
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortDescending, setSortDescending] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [validationError, setValidationError] = useState("");

  // On first mount, fetch all books (no filters)
  useEffect(() => {
    dispatch(
      setFilters({
        searchTerm: "",
        category: null,
        minPrice: null,
        maxPrice: null,
        sortBy: "title",
        sortDescending: false,
        onSale: false,
        pageNumber: 1,
      })
    );
    dispatch(
      fetchBooks({
        searchTerm: "",
        category: null,
        minPrice: null,
        maxPrice: null,
        sortBy: "title",
        sortDescending: false,
        onSale: false,
        pageNumber: 1,
      })
    );
    // Reset local state as well
    setSearchInput("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("title");
    setSortDescending(false);
    setOnSale(false);
  }, [dispatch]);

  const handleSearch = (e) => setSearchInput(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    if (
      maxPrice &&
      e.target.value &&
      parseFloat(e.target.value) > parseFloat(maxPrice)
    ) {
      setValidationError("Min price cannot be greater than max price.");
    } else {
      setValidationError("");
    }
  };
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    if (
      minPrice &&
      e.target.value &&
      parseFloat(minPrice) > parseFloat(e.target.value)
    ) {
      setValidationError("Min price cannot be greater than max price.");
    } else {
      setValidationError("");
    }
  };
  const handleSortChange = (e) => {
    const [sort, desc] = e.target.value.split("-");
    setSortBy(sort);
    setSortDescending(desc === "desc");
  };
  const handleOnSaleChange = (e) => setOnSale(e.target.checked);

  const handleApplyFilters = () => {
    dispatch(
      setFilters({
        searchTerm: searchInput,
        category: category ? Number(category) : null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        sortBy,
        sortDescending,
        onSale,
        pageNumber: 1,
      })
    );
    dispatch(
      fetchBooks({
        searchTerm: searchInput,
        category: category ? Number(category) : null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        sortBy,
        sortDescending,
        onSale,
        pageNumber: 1,
      })
    );
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    dispatch(
      fetchBooks({
        searchTerm: searchInput,
        category: category ? Number(category) : null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        sortBy,
        sortDescending,
        onSale,
        pageNumber: page,
      })
    );
  };

  return (
    <div className="book-list-container">
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search books..."
          value={searchInput}
          onChange={handleSearch}
          className="search-input"
        />

        <select
          value={category}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value={BookCategory.Fiction}>Fiction</option>
          <option value={BookCategory.NonFiction}>NonFiction</option>
          <option value={BookCategory.Science}>Science</option>
          <option value={BookCategory.History}>History</option>
          <option value={BookCategory.Biography}>Biography</option>
        </select>

        <div className="price-range">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="price-input"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="price-input"
          />
        </div>
        {validationError && (
          <div style={{ color: "red", marginTop: 4, marginBottom: 4 }}>
            {validationError}
          </div>
        )}

        <select
          value={`${sortBy}-${sortDescending ? "desc" : "asc"}`}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>

        <label className="on-sale-filter">
          <input
            type="checkbox"
            checked={onSale}
            onChange={handleOnSaleChange}
          />
          On Sale
        </label>
        <button
          className="btn btn-primary"
          style={{ marginLeft: 12 }}
          onClick={handleApplyFilters}
          disabled={!!validationError}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading books...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Try Again
          </button>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <h3>No books found</h3>
          <p>Try adjusting your search or filter criteria.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              // Reset all filters
              setSearchInput("");
              setCategory("");
              setMinPrice("");
              setMaxPrice("");
              setSortBy("title");
              setSortDescending(false);
              setOnSale(false);
              handleApplyFilters();
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="books-grid">
            {books.map((book) => (
              <Link to={`/book/${book.id}`} key={book.id} className="book-card">
                <div className="book-image">
                  {book.imageUrl ? (
                    <img src={book.imageUrl} alt={book.title} />
                  ) : (
                    <div className="book-placeholder">📚</div>
                  )}
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">by {book.author}</p>
                  <p className="price">
                    Rs. {book.price}
                    {book.onSale && book.discountPercentage && (
                      <span className="discount-badge">
                        -{book.discountPercentage}%
                      </span>
                    )}
                  </p>
                  <p className="category">{book.category}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-button ${
                  page === filters.pageNumber ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;
