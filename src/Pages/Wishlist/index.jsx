import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaBook } from "react-icons/fa";
import { wishlistService } from "../../services/wishlistService";
import "./index.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const items = await wishlistService.getAll();
      setWishlistItems(items);
    } catch (err) {
      setError("Failed to load wishlist.");
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (bookmarkId) => {
    try {
      await wishlistService.remove(bookmarkId);
      setWishlistItems((prev) => prev.filter((item) => item.id !== bookmarkId));
      toast.success("Item removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <FaBook className="loading-icon" />
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-wishlist">
        <FaBook size={48} className="empty-icon" />
        <h2>Your wishlist is empty</h2>
        <p>Looks like you haven't added any books to your wishlist yet.</p>
        <Link to="/books" className="browse-books-btn">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="book-icon">
              <FaBook size={24} />
            </div>
            <div className="book-details">
              <h3>{item.bookTitle || "Unknown Book"}</h3>
              <div className="metadata">
                <span className="date">
                  Added: {new Date(item.createdAt).toLocaleDateString()}
                </span>
                {item.note && <p className="note">{item.note}</p>}
              </div>
              <div className="item-actions">
                <Link to={`/book/${item.bookId}`} className="view-btn">
                  View Details
                </Link>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
