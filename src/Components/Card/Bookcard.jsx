import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import bookImage from "./book.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import React, { useEffect, useState } from "react";

// Utility to check for a cookie by name
function hasCookie(name) {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(name + "="));
}

function Bookcard({ book, bookId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Determine the book id to use
  const id = book?.id || bookId;

  // Check auth (same as elsewhere)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
      if (!isAuthenticated || !id) {
        setIsBookmarked(false);
        setBookmarkId(null);
        return;
      }
      try {
        const res = await axios.get(
          `${API_BASE_URL}/bookmark?BookId=${id}&PageSize=1`,
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
  }, [isAuthenticated, id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to cart");
      return;
    }
    const safeQuantity = Math.max(1, quantity);
    try {
      await axios.post(
        `${API_BASE_URL}/cart/items`,
        {
          bookId: id,
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
      return;
    }
    if (!isBookmarked) {
      // Add bookmark
      try {
        const res = await axios.post(
          `${API_BASE_URL}/bookmark`,
          {
            bookId: id,
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

  return (
    <Card style={{ width: "18rem" }}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={book?.image || bookImage}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{book?.title || "Muna Madan"}</Card.Title>

        <div className="mb-3">
          <span className="fw-bold fs-5 text-primary">
            Rs {book?.price || 59.99}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="quantity-selector d-flex align-items-center">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddToCart}
          >
            <CiShoppingCart size={20} />
          </button>
        </div>
        <button
          className="btn btn-outline-secondary mt-2 w-100"
          onClick={handleToggleWishlist}
        >
          {isBookmarked ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </Card.Body>
    </Card>
  );
}

export default Bookcard;
