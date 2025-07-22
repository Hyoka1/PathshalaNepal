import axios from "axios";
import { API_ENDPOINTS } from "../constants/api";

export const reviewService = {
  // Get all reviews with optional filtering
  getAll: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.BOOKS.BASE}/reviews`, {
        params: filters,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },

  // Get a single review by ID
  getById: async (id) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BOOKS.BASE}/reviews/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching review ${id}:`, error);
      throw error;
    }
  },

  // Create a new review
  create: async (reviewData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BOOKS.BASE}/reviews`,
        reviewData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  },

  // Update an existing review
  update: async (id, reviewData) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BOOKS.BASE}/reviews/${id}`,
        reviewData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating review ${id}:`, error);
      throw error;
    }
  },

  // Delete a review
  delete: async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.BOOKS.BASE}/reviews/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(`Error deleting review ${id}:`, error);
      throw error;
    }
  },

  // Approve a review
  approve: async (id) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BOOKS.BASE}/reviews/${id}/approve`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error approving review ${id}:`, error);
      throw error;
    }
  },

  // Get reviews for a specific book
  getBookReviews: async (bookId, filters = {}) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BOOKS.BASE}/${bookId}/reviews`,
        {
          params: filters,
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for book ${bookId}:`, error);
      throw error;
    }
  },
};
