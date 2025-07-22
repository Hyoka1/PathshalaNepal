import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById, clearSelectedBook } from "../../store/slices/bookSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import "./BookDetails.css";

// Utility to check for a cookie by name
function hasCookie(name) {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(name + "="));
}

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    selectedBook: book,
    loading,
    error,
  } = useSelector((state) => state.books);
  // Custom isAuthenticated logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (user && hasCookie("access-token")) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Fetch bookmark status for this book
  useEffect(() => {
    const fetchBookmark = async () => {
      if (!isAuthenticated || !book) {
        setIsBookmarked(false);
        setBookmarkId(null);
        return;
      }
      try {
        const res = await axios.get(
          `${API_BASE_URL}/bookmark?BookId=${book.id}&PageSize=1`,
          { withCredentials: true }
        );
        if (Array.isArray(res.data) && res.data.length > 0) {
          setIsBookmarked(true);
          setBookmarkId(res.data[0].id);
        } else {
          setIsBookmarked(false);
          setBookmarkId(null);
        }
      } catch {
        setIsBookmarked(false);
        setBookmarkId(null);
      }
    };
    fetchBookmark();
  }, [isAuthenticated, book]);

  useEffect(() => {
    dispatch(fetchBookById(id));
    return () => dispatch(clearSelectedBook());
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to cart");
      navigate("/login");
      return;
    }
    const safeQuantity = Math.max(1, quantity);
    try {
      await axios.post(
        `${API_BASE_URL}/cart/items`,
        {
          bookId: book.id,
          quantity: safeQuantity,
        },
        { withCredentials: true }
      );
      // Fetch the updated cart
      const cartRes = await axios.get(`${API_BASE_URL}/cart`, {
        withCredentials: true,
      });
      const cart = cartRes.data;
      toast.success(
        `Book added to cart! Total items: ${cart.items.length}, Total: Rs ${cart.totalAmount}`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to wishlist");
      navigate("/login");
      return;
    }
    if (!isBookmarked) {
      // Add bookmark
      try {
        const res = await axios.post(
          `${API_BASE_URL}/bookmark`,
          {
            bookId: book.id,
            note: "Added from UI",
          },
          { withCredentials: true }
        );
        toast.success("Book added to wishlist!");
        setIsBookmarked(true);
        setBookmarkId(res.data.id);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to add to wishlist."
        );
      }
    } else {
      // Remove bookmark
      try {
        await axios.delete(`${API_BASE_URL}/bookmark/${bookmarkId}`, {
          withCredentials: true,
        });
        toast.success("Book removed from wishlist!");
        setIsBookmarked(false);
        setBookmarkId(null);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to remove from wishlist."
        );
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="error">Book not found</div>;

  const discountedPrice =
    book.onSale && book.discountPercentage
      ? book.price * (1 - book.discountPercentage / 100)
      : book.price;

  return (
    <div className="book-details-container">
      <div className="book-details-content">
        <div className="book-image-section">
          <div className="book-image">
            {/* Add book cover image here */}
            <div className="book-placeholder">📚</div>
          </div>
          {book.onSale && book.discountPercentage && (
            <div className="discount-badge">{book.discountPercentage}% OFF</div>
          )}
        </div>

        <div className="book-info-section">
          <h1>{book.title}</h1>
          <p className="author">by {book.author}</p>
          <p className="category">Category: {book.category}</p>

          <div className="price-section">
            {book.onSale && book.discountPercentage ? (
              <>
                <span className="original-price">
                  Rs.{book.price.toFixed(2)}
                </span>
                <span className="discounted-price">
                  Rs.{discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="price">Rs.{book.price.toFixed(2)}</span>
            )}
          </div>

          <p className="description">{book.description}</p>

          <div className="inventory-info">
            <p
              className={
                book.inventoryQuantity > 0 ? "in-stock" : "out-of-stock"
              }
            >
              {book.inventoryQuantity > 0 ? "In Stock" : "Out of Stock"}
            </p>
            {book.inventoryQuantity > 0 && (
              <p className="quantity">Available: {book.inventoryQuantity}</p>
            )}
          </div>

          {book.inventoryQuantity > 0 && (
            <div className="actions-section">
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(book.inventoryQuantity, quantity + 1))
                  }
                  disabled={quantity >= book.inventoryQuantity}
                >
                  +
                </button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button
                className="add-to-wishlist-btn"
                onClick={handleToggleWishlist}
              >
                {isBookmarked ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
