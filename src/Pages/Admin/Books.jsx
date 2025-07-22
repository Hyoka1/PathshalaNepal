import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants/api";
import "./AdminDashboard.css";

const genres = ["Poetry", "Novel", "History", "Science", "Children", "Other"];
const PAGE_SIZE = 5;

const initialBooks = [
  {
    id: 1,
    title: "Muna Madan",
    author: "Laxmi Prasad Devkota",
    genre: "Poetry",
    stock: 10,
    bookmarked: false,
  },
  {
    id: 2,
    title: "Palpasa Cafe",
    author: "Narayan Wagle",
    genre: "Novel",
    stock: 5,
    bookmarked: false,
  },
  {
    id: 3,
    title: "Karnali Blues",
    author: "Buddhisagar",
    genre: "Novel",
    stock: 8,
    bookmarked: false,
  },
  {
    id: 4,
    title: "Seto Dharti",
    author: "Amar Neupane",
    genre: "Novel",
    stock: 7,
    bookmarked: false,
  },
  {
    id: 5,
    title: "History of Nepal",
    author: "Baburam Acharya",
    genre: "History",
    stock: 3,
    bookmarked: false,
  },
  {
    id: 6,
    title: "Science for Kids",
    author: "S. Sharma",
    genre: "Science",
    stock: 12,
    bookmarked: false,
  },
];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, mode: "add", book: null });
  const [filter, setFilter] = useState({
    searchTerm: "",
    category: "",
    pageNumber: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchBooks();
  }, [filter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.BOOKS.GET_ALL, {
        params: filter,
        withCredentials: true,
      });
      setBooks(response.data);
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = {
      title: formData.get("title"),
      author: formData.get("author"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      inventoryQuantity: parseInt(formData.get("inventoryQuantity")),
      category: parseInt(formData.get("category")),
    };

    try {
      if (modal.mode === "add") {
        await axios.post(API_ENDPOINTS.BOOKS.BASE, bookData, {
          withCredentials: true,
        });
        toast.success("Book added successfully");
      } else {
        await axios.put(
          `${API_ENDPOINTS.BOOKS.BASE}/${modal.book.id}`,
          bookData,
          {
            withCredentials: true,
          }
        );
        toast.success("Book updated successfully");
      }
      closeModal();
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save book");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.BOOKS.BASE}/${id}`, {
        withCredentials: true,
      });
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const handleInventoryUpdate = async (id, quantity) => {
    try {
      await axios.put(`${API_ENDPOINTS.BOOKS.BASE}/${id}/inventory`, quantity, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Inventory updated successfully");
      fetchBooks();
    } catch (error) {
      console.error("Inventory update error:", error.response?.data);
      toast.error("Failed to update inventory");
    }
  };

  const handleDiscountUpdate = async (id, discountData) => {
    try {
      await axios.put(
        `${API_ENDPOINTS.BOOKS.BASE}/${id}/discount`,
        discountData,
        { withCredentials: true }
      );
      toast.success("Discount updated successfully");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to update discount");
    }
  };

  const openAdd = () => setModal({ open: true, mode: "add", book: null });
  const openEdit = (book) => setModal({ open: true, mode: "edit", book });
  const closeModal = () => setModal({ open: false, mode: "add", book: null });

  return (
    <div className="admin-books">
      <div className="page-header">
        <h2>Manage Books</h2>
        <button className="btn-add" onClick={openAdd}>
          Add New Book
        </button>
      </div>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search books..."
          value={filter.searchTerm}
          onChange={(e) =>
            setFilter({ ...filter, searchTerm: e.target.value, pageNumber: 1 })
          }
        />
        <select
          value={filter.category}
          onChange={(e) =>
            setFilter({ ...filter, category: e.target.value, pageNumber: 1 })
          }
        >
          <option value="">All Categories</option>
          <option value="0">Fiction</option>
          <option value="1">NonFiction</option>
          <option value="2">Science</option>
          <option value="3">Technology</option>
          <option value="4">History</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>Rs.{book.price.toFixed(2)}</td>
                  <td>{book.inventoryQuantity}</td>
                  <td>
                    {book.onSale ? (
                      <span className="discount-active">
                        {book.discountPercentage}% OFF
                      </span>
                    ) : (
                      "No discount"
                    )}
                  </td>
                  <td>
                    <button onClick={() => openEdit(book)}>Edit</button>
                    <button onClick={() => handleDelete(book.id)}>
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
            <h3>{modal.mode === "add" ? "Add New Book" : "Edit Book"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" defaultValue={modal.book?.title} required />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  name="author"
                  defaultValue={modal.book?.author}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  defaultValue={modal.book?.description}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={modal.book?.price}
                  required
                />
              </div>
              <div className="form-group">
                <label>Inventory Quantity</label>
                <input
                  type="number"
                  name="inventoryQuantity"
                  defaultValue={modal.book?.inventoryQuantity}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  defaultValue={modal.book?.category || "0"}
                  required
                >
                  <option value="0">Fiction</option>
                  <option value="1">NonFiction</option>
                  <option value="2">Science</option>
                  <option value="3">Technology</option>
                  <option value="4">History</option>
                </select>
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

export default Books;
