import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import "./history.css";

const ORDER_STATUS = {
  1: "Pending",
  2: "Processing",
  3: "Completed",
  4: "Cancelled",
};

function History() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    bookId: null,
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/order`, {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (err) {
        setError("Failed to load purchase history.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.post(
        `${API_BASE_URL}/order/${orderId}/cancel`,
        {},
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: 4, isCancelled: true } : o
        )
      );
    } catch {
      alert("Failed to cancel order.");
    }
  };

  const openReviewModal = (bookId) => {
    setReviewModal({
      isOpen: true,
      bookId,
      rating: 0,
      comment: "",
    });
  };

  const closeReviewModal = () => {
    setReviewModal({
      isOpen: false,
      bookId: null,
      rating: 0,
      comment: "",
    });
  };

  const handleSubmitReview = async () => {
    if (!reviewModal.bookId || reviewModal.rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      await axios.post(
        `https://localhost:7067/api/review`,
        {
          bookId: reviewModal.bookId,
          rating: reviewModal.rating,
          comment: reviewModal.comment,
        },
        { withCredentials: true }
      );

      // Update the local state to mark the book as reviewed
      setOrders((prev) =>
        prev.map((order) => ({
          ...order,
          isReviewed: order.orderItems.some(
            (item) => item.bookId === reviewModal.bookId
          )
            ? true
            : order.isReviewed,
        }))
      );

      alert("Review submitted successfully!");
      closeReviewModal();
    } catch (err) {
      alert("Failed to submit review. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!orders.length)
    return <div className="empty-history">No purchase history found.</div>;

  return (
    <div className="history-container">
      <h2>Purchase History</h2>
      {orders.map((order) => {
        const discountPercent = order.discountAmount
          ? order.discountAmount * 100
          : 0;
        const discountValue =
          order.totalAmount && order.discountAmount
            ? order.totalAmount * order.discountAmount
            : 0;
        const finalTotal =
          order.finalAmount !== undefined
            ? order.finalAmount
            : order.totalAmount - discountValue;

        return (
          <div key={order.id} className="order-card">
            <div>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              {ORDER_STATUS[order.status] || order.status}
            </div>
            <div>
              <strong>Claim Code:</strong> {order.claimCode}
            </div>
            {order.status === 4 && order.cancellationTime && (
              <div>
                <strong>Cancelled At:</strong>{" "}
                {new Date(order.cancellationTime).toLocaleString()}
              </div>
            )}
            <div>
              <strong>Subtotal:</strong> Rs {order.totalAmount?.toFixed(2)}
            </div>
            <div>
              <strong>Discount:</strong> {discountPercent}% (Rs{" "}
              {discountValue.toFixed(2)})
            </div>
            <div>
              <strong>Total after discount:</strong> Rs {finalTotal.toFixed(2)}
            </div>
            <div>
              <strong>Books:</strong>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.bookId}>
                    {item.bookTitle || item.bookId} (Qty: {item.quantity})
                    {order.status === 3 && !order.isReviewed && (
                      <button
                        className="review-btn"
                        onClick={() => openReviewModal(item.bookId)}
                      >
                        Review
                      </button>
                    )}
                    {order.status === 3 && order.isReviewed && (
                      <span className="reviewed-badge">✓ Reviewed</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {order.status === 1 && (
              <button
                className="cancel-btn"
                onClick={() => handleCancel(order.id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        );
      })}

      {/* Review Modal */}
      {reviewModal.isOpen && (
        <div className="modal-overlay">
          <div className="review-modal">
            <h3>Write a Review</h3>
            <div className="rating-container">
              <label>Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      star <= reviewModal.rating ? "active" : ""
                    }`}
                    onClick={() =>
                      setReviewModal((prev) => ({ ...prev, rating: star }))
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="comment-container">
              <label>Comment:</label>
              <textarea
                value={reviewModal.comment}
                onChange={(e) =>
                  setReviewModal((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                placeholder="Write your review here..."
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeReviewModal}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmitReview}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
