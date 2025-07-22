import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { discountService } from "../../services/discountService";
import "./AdminDashboard.css";

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    mode: "add",
    discount: null,
  });
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    fetchDiscounts();
  }, []);

  // Get current date in YYYY-MM-DDThh:mm format
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    // Reset end time if it's before new start time
    const endTimeInput = e.target.form.endTime;
    if (endTimeInput.value && endTimeInput.value < e.target.value) {
      endTimeInput.value = e.target.value;
    }
  };

  const handleEndTimeChange = (e) => {
    // Prevent end time from being before start time
    if (e.target.value < startTime) {
      e.target.value = startTime;
      toast.warning("End time cannot be before start time");
    }
  };

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response = await discountService.getAll();
      setDiscounts(response);
    } catch (error) {
      toast.error("Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate end time is after start time
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");
    if (endTime < startTime) {
      toast.error("End time must be after start time");
      return;
    }

    const discountData = {
      discountPercentage: parseFloat(formData.get("discountPercentage")),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      isStackable: formData.get("isStackable") === "on",
      onSale: true,
      minimumOrderQuantity: parseInt(formData.get("minimumOrderQuantity")) || 0,
      minimumSuccessfulOrders:
        parseInt(formData.get("minimumSuccessfulOrders")) || 0,
    };

    try {
      if (modal.mode === "add") {
        await discountService.create(discountData);
        toast.success("Discount added successfully");
      } else {
        await discountService.update(modal.discount.id, discountData);
        toast.success("Discount updated successfully");
      }
      closeModal();
      fetchDiscounts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save discount");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this discount?"))
      return;
    try {
      await discountService.delete(id);
      toast.success("Discount deleted successfully");
      fetchDiscounts();
    } catch (error) {
      toast.error("Failed to delete discount");
    }
  };

  const openAdd = () => {
    setStartTime("");
    setModal({ open: true, mode: "add", discount: null });
  };

  const openEdit = (discount) => {
    setStartTime(discount.startTime);
    setModal({ open: true, mode: "edit", discount });
  };

  const closeModal = () => {
    setStartTime("");
    setModal({ open: false, mode: "add", discount: null });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="admin-books">
      <div className="page-header">
        <h2>Manage Discounts</h2>
        <button className="btn-add" onClick={openAdd}>
          Add New Discount
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Discount %</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Stackable</th>
                <th>Min. Order Qty</th>
                <th>Min. Orders</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td>{discount.discountPercentage}%</td>
                  <td>{formatDate(discount.startTime)}</td>
                  <td>{formatDate(discount.endTime)}</td>
                  <td>
                    <span
                      className={`status ${
                        discount.onSale ? "active" : "inactive"
                      }`}
                    >
                      {discount.onSale ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        discount.isStackable ? "success" : "info"
                      }`}
                    >
                      {discount.isStackable ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>{discount.minimumOrderQuantity}</td>
                  <td>{discount.minimumSuccessfulOrders}</td>
                  <td>
                    <button onClick={() => openEdit(discount)}>Edit</button>
                    <button onClick={() => handleDelete(discount.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {modal.mode === "add" ? "Add New Discount" : "Edit Discount"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Discount Percentage</label>
                <input
                  type="number"
                  name="discountPercentage"
                  min="0"
                  max="100"
                  step="0.01"
                  defaultValue={modal.discount?.discountPercentage || ""}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  min={getCurrentDateTime()}
                  defaultValue={
                    modal.discount?.startTime
                      ? new Date(modal.discount.startTime)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={handleStartTimeChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  min={startTime || getCurrentDateTime()}
                  defaultValue={
                    modal.discount?.endTime
                      ? new Date(modal.discount.endTime)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={handleEndTimeChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Minimum Order Quantity</label>
                <input
                  type="number"
                  name="minimumOrderQuantity"
                  min="0"
                  defaultValue={modal.discount?.minimumOrderQuantity || "0"}
                />
              </div>
              <div className="form-group">
                <label>Minimum Successful Orders</label>
                <input
                  type="number"
                  name="minimumSuccessfulOrders"
                  min="0"
                  defaultValue={modal.discount?.minimumSuccessfulOrders || "0"}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isStackable"
                    defaultChecked={modal.discount?.isStackable || false}
                  />
                  <span>Stackable with other discounts</span>
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit">
                  {modal.mode === "add" ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discounts;
