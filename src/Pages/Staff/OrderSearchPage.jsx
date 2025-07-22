import React, { useState } from "react";
import axios from "axios";
import styles from "./StaffDashboard.module.css";
import { API_ENDPOINTS } from "../../constants/api";

const OrderSearchPage = () => {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Add status mapping
  const getStatusString = (statusCode) => {
    const statusMap = {
      1: "Pending", // OrderStatus.Pending
      2: "Processing", // OrderStatus.Processing
      3: "Completed", // OrderStatus.Cancelled
      4: "Cancelled", // OrderStatus.Cancelled
    };
    return statusMap[statusCode] || "Unknown";
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a claim code");
      return;
    }

    setOrder(null);
    setError("");
    setIsProcessing(true);

    try {
      const response = await axios.get(
        `https://localhost:7067/api/order/claim/${query}`,
        { withCredentials: true }
      );

      if (response.data?.data) {
        setOrder(response.data.data);
      } else {
        setError("No order found with this claim code.");
      }
    } catch (error) {
      console.error("Error searching for order:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to find order. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessOrder = async () => {
    if (!order) return;

    setError("");
    setIsProcessing(true);

    try {
      const response = await axios.post(
        `https://localhost:7067/api/order/claim/${order.claimCode}`,
        {},
        { withCredentials: true }
      );

      if (response.data?.data) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.error("Error processing order:", error);

      // Handle specific error cases from backend
      if (error.response?.status === 400) {
        if (error.response.data === "Order is already processed") {
          setError("This order has already been processed");
          // Refresh order details to get current status
          try {
            const refreshResponse = await axios.get(
              `https://localhost:7067/api/order/claim/${order.claimCode}`,
              { withCredentials: true }
            );
            if (refreshResponse.data?.data) {
              setOrder(refreshResponse.data.data);
            }
          } catch (refreshError) {
            console.error("Error refreshing order details:", refreshError);
          }
        } else {
          setError(error.response.data);
        }
      } else if (error.response?.data === "Invalid claim code") {
        setError("Invalid claim code");
      } else if (error.response?.data === "Order is cancelled") {
        setError("This order has been cancelled");
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to process order. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComplete = async () => {
    if (!order) return;

    setIsProcessing(true);
    setError("");

    try {
      const response = await axios.post(
        `https://localhost:7067/api/order/claim/${order.claimCode}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data?.data) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.error("Error completing order:", error);
      if (error.response?.status === 400) {
        if (error.response.data === "Order is already completed") {
          setError("This order has already been completed");
          // Refresh order details to get current status
          try {
            const refreshResponse = await axios.get(
              `https://localhost:7067/api/order/claim/${order.claimCode}`,
              { withCredentials: true }
            );
            if (refreshResponse.data?.data) {
              setOrder(refreshResponse.data.data);
            }
          } catch (refreshError) {
            console.error("Error refreshing order details:", refreshError);
          }
        } else {
          setError(error.response.data);
        }
      } else if (error.response?.data === "Invalid claim code") {
        setError("Invalid claim code");
      } else if (error.response?.data === "Order is cancelled") {
        setError("This order has been cancelled");
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to complete the order. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Pending" || status === "Processing") {
      return styles.statusPending;
    } else if (status === "Completed") {
      return styles.statusCompleted;
    } else if (status === "Cancelled") {
      return styles.statusCancelled;
    }
    return styles.statusPending;
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Order Processing</h1>
      <p className={styles.welcomeMessage}>
        Enter a claim code to process or view an order
      </p>

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter Claim Code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className={styles.searchInput}
            disabled={isProcessing}
          />
          <button
            onClick={handleSearch}
            className={styles.searchButton}
            disabled={isProcessing}
          >
            {isProcessing ? "Searching..." : "Search"}
          </button>
        </div>

        <div className={styles.searchInstructions}>
          <p>
            Enter the claim code provided by the member to process or view their
            order
          </p>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {isProcessing && !order && (
        <div className={styles.loadingState}>Processing claim code...</div>
      )}

      {order && (
        <div className={styles.orderDetailsSection}>
          <div className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h2>Order #{order.id || "N/A"}</h2>
              <div className={styles.statusContainer}>
                <span className={getStatusClass(getStatusString(order.status))}>
                  {getStatusString(order.status)}
                </span>
              </div>
            </div>

            <div className={styles.orderInfo}>
              <div className={styles.infoGroup}>
                <h3>Order Information</h3>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Claim Code:</span>
                  <span className={styles.value}>
                    {order.claimCode || "N/A"}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Order Date:</span>
                  <span className={styles.value}>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className={styles.infoGroup}>
                <h3>Member Information</h3>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Member ID:</span>
                  <span className={styles.value}>{order.userId || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className={styles.booksSection}>
              <h3>Books</h3>
              {order.orderItems && order.orderItems.length > 0 ? (
                <ul className={styles.booksList}>
                  {order.orderItems.map((item, index) => (
                    <li key={index} className={styles.bookItem}>
                      <span className={styles.bookTitle}>
                        Book ID: {item.bookId || "N/A"}
                      </span>
                      <span className={styles.bookQuantity}>
                        Quantity: {item.quantity || 0}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyState}>No books in this order</p>
              )}
            </div>

            <div className={styles.financialDetails}>
              <h3>Financial Details</h3>
              <div className={styles.financialItem}>
                <span className={styles.label}>Subtotal:</span>
                <span className={styles.value}>
                  Rs. {order.totalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
              {order.discountAmount > 0 && (
                <div className={styles.financialItem}>
                  <span className={styles.label}>Discount:</span>
                  <span className={styles.value}>
                    {(order.discountAmount * 100).toFixed(0)}% (Rs.{" "}
                    {(order.totalAmount * order.discountAmount).toFixed(2)})
                  </span>
                </div>
              )}
              <div className={`${styles.financialItem} ${styles.finalAmount}`}>
                <span className={styles.label}>Final Amount:</span>
                <span className={styles.value}>
                  Rs. {order.finalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>

            <div className={styles.actionArea}>
              {order && (
                <>
                  {order.status === 1 && !order.isCancelled && (
                    <button
                      onClick={handleProcessOrder}
                      className={styles.processButton}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Process Order"}
                    </button>
                  )}
                  {order.status === 2 && !order.isCancelled && (
                    <button
                      onClick={handleComplete}
                      className={styles.fulfillButton}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Completing..." : "Complete Order"}
                    </button>
                  )}
                  {order.status === 3 && (
                    <div className={styles.completedMessage}>
                      This order has been completed
                    </div>
                  )}
                  {order.isCancelled ||
                    (order.status === 4 && (
                      <div className={styles.cancelledMessage}>
                        This order has been cancelled
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSearchPage;
