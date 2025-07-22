import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import "./index.css";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/cart`, {
          withCredentials: true,
        });
        setCart(res.data);
      } catch (err) {
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Remove a single item from cart
  const handleRemoveItem = async (bookId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/items/${bookId}`, {
        withCredentials: true,
      });
      // Refresh cart
      const res = await axios.get(`${API_BASE_URL}/cart`, {
        withCredentials: true,
      });
      setCart(res.data);
    } catch (err) {
      setError("Failed to remove item from cart.");
    }
  };

  // Clear the entire cart
  const handleClearCart = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/cart`, { withCredentials: true });
      setCart({ items: [], totalAmount: 0 });
    } catch (err) {
      setError("Failed to clear cart.");
    }
  };

  const handleCheckout = async () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    try {
      // Prepare the orderItems array as required by your backend
      const orderItems = cart.items.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
      }));

      // Place the order and get the response (which includes discount info)
      const res = await axios.post(
        `${API_BASE_URL}/order`,
        { orderItems },
        { withCredentials: true }
      );

      // Optionally clear the cart after successful order
      await axios.delete(`${API_BASE_URL}/cart`, { withCredentials: true });
      setCart({ items: [], totalAmount: 0 });

      // Show a success message with discount details
      const order = res.data;
      const subtotal = order.totalAmount || 0;
      const discountPercent = order.discountAmount || 0;
      const discountValue = subtotal * discountPercent;
      const finalTotal =
        order.finalAmount !== undefined
          ? order.finalAmount
          : subtotal - discountValue;
      alert(
        `Order placed successfully!\n\n` +
          `Subtotal: Rs ${subtotal.toFixed(2)}\n` +
          `Discount: ${discountPercent * 100}% (Rs ${discountValue.toFixed(
            2
          )})\n` +
          `Total after discount: Rs ${finalTotal.toFixed(2)}\n` +
          (order.claimCode ? `Claim Code: ${order.claimCode}\n` : "")
      );
      // Optionally: navigate to an order confirmation or orders page
      // navigate("/orders");
    } catch (err) {
      setError("Failed to place order.");
    }
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any books to your cart yet.</p>
        <Link to="/" className="btn btn-primary">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.bookId} className="cart-item">
            <div className="item-image">
              {/* You may want to fetch book image by bookId if needed */}
              <img src="/book.jpg" alt={item.bookTitle} />
            </div>
            <div className="item-details">
              <h3>{item.bookTitle}</h3>
              <p className="item-price">Rs {item.unitPrice}</p>
            </div>
            <div className="item-quantity">
              <span>{item.quantity}</span>
            </div>
            <div className="item-total">Rs {item.subtotal}</div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.bookId)}
              title="Remove from cart"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <button
          className="clear-cart-btn"
          onClick={handleClearCart}
          style={{ marginBottom: 12 }}
        >
          Clear Cart
        </button>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>Rs {cart.totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>Rs {cart.totalAmount.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
