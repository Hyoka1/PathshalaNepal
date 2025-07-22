import axios from "axios";
import { API_URL } from "./apiclient";

const BOOK_ENDPOINT = `${API_URL}/book`;

export const BookSortOption = {
  Title: 0,
  Price: 1,
  Author: 2,
  Category: 3,
  CreatedDate: 4,
};

export const bookService = {
  // Get all books with optional filtering
  getAll: async (filters = {}) => {
    try {
      // Transform the filters to match the API's expected format
      const apiFilters = {
        SearchTerm: filters.searchTerm,
        Category: filters.category,
        MinPrice: filters.minPrice,
        MaxPrice: filters.maxPrice,
        OnSale: filters.onSale,
        SortBy: filters.sortBy,
        SortDescending: filters.sortDescending,
        PageNumber: filters.pageNumber || 1,
        PageSize: filters.pageSize || 10,
      };

      const response = await axios.get(BOOK_ENDPOINT, { params: apiFilters });
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  // Get a single book by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${BOOK_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  },

  // Create a new book
  create: async (bookData) => {
    try {
      const response = await axios.post(BOOK_ENDPOINT, bookData);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  // Update an existing book
  update: async (id, bookData) => {
    try {
      const response = await axios.put(`${BOOK_ENDPOINT}/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error(`Error updating book ${id}:`, error);
      throw error;
    }
  },

  // Delete a book
  delete: async (id) => {
    try {
      await axios.delete(`${BOOK_ENDPOINT}/${id}`);
    } catch (error) {
      console.error(`Error deleting book ${id}:`, error);
      throw error;
    }
  },

  // Update book inventory
  updateInventory: async (id, quantity) => {
    try {
      const response = await axios.put(`${BOOK_ENDPOINT}/${id}/inventory`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating inventory for book ${id}:`, error);
      throw error;
    }
  },

  // Set book discount
  setDiscount: async (id, discountData) => {
    try {
      const response = await axios.put(
        `${BOOK_ENDPOINT}/${id}/discount`,
        discountData
      );
      return response.data;
    } catch (error) {
      console.error(`Error setting discount for book ${id}:`, error);
      throw error;
    }
  },
};
