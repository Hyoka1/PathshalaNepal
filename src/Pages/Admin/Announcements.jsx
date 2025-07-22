import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import "./AdminDashboard.css";

const PAGE_SIZE = 5;
const initialAnnouncements = [
  {
    id: 1,
    message: "Library will be closed on Friday.",
    schedule: "2025-04-18T10:00",
  },
  { id: 2, message: "New books have arrived!", schedule: "2025-04-20T09:00" },
];

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    mode: "add",
    announcement: null,
  });

  // Form state
  const [formData, setFormData] = useState({
    message: "",
    startDate: "",
    endDate: "",
    type: "info", // info, warning, success
    isActive: true,
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/announcements`, {
        withCredentials: true,
      });
      setAnnouncements(response.data);
    } catch (error) {
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modal.mode === "add") {
        await axios.post(`${API_BASE_URL}/announcements`, formData, {
          withCredentials: true,
        });
        toast.success("Announcement added successfully");
      } else {
        await axios.put(
          `${API_BASE_URL}/announcements/${modal.announcement.id}`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success("Announcement updated successfully");
      }
      closeModal();
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to save announcement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/announcements/${id}`, {
        withCredentials: true,
      });
      toast.success("Announcement deleted successfully");
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to delete announcement");
    }
  };

  const openModal = (mode, announcement = null) => {
    setModal({ open: true, mode, announcement });
    if (announcement) {
      setFormData({
        message: announcement.message,
        startDate: announcement.startDate.split("T")[0],
        endDate: announcement.endDate.split("T")[0],
        type: announcement.type,
        isActive: announcement.isActive,
      });
    } else {
      setFormData({
        message: "",
        startDate: "",
        endDate: "",
        type: "info",
        isActive: true,
      });
    }
  };

  const closeModal = () => {
    setModal({ open: false, mode: "add", announcement: null });
    setFormData({
      message: "",
      startDate: "",
      endDate: "",
      type: "info",
      isActive: true,
    });
  };

  return (
    <div className="admin-announcements">
      <div className="page-header">
        <h2>Manage Announcements</h2>
        <button className="btn-add" onClick={() => openModal("add")}>
          Add New Announcement
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.message}</td>
                <td>
                  <span className={`badge ${announcement.type}`}>
                    {announcement.type}
                  </span>
                </td>
                <td>{new Date(announcement.startDate).toLocaleDateString()}</td>
                <td>{new Date(announcement.endDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`status ${
                      new Date(announcement.endDate) < new Date()
                        ? "expired"
                        : new Date(announcement.startDate) > new Date()
                        ? "scheduled"
                        : "active"
                    }`}
                  >
                    {new Date(announcement.endDate) < new Date()
                      ? "Expired"
                      : new Date(announcement.startDate) > new Date()
                      ? "Scheduled"
                      : "Active"}
                  </span>
                </td>
                <td>
                  <button onClick={() => openModal("edit", announcement)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(announcement.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {modal.mode === "add"
                ? "Add New Announcement"
                : "Edit Announcement"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                </select>
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                  />
                  Active
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
}

export default Announcements;
