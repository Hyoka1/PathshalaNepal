import axios from "axios";
import { API_ENDPOINTS } from "../constants/api";

const DISCOUNT_BASE_URL = "https://localhost:7067/api/discount";

export const discountService = {
  // Get all discounts
  getAll: async () => {
    try {
      const response = await axios.get(DISCOUNT_BASE_URL, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching discounts:", error);
      throw error;
    }
  },

  // Create a new discount
  create: async (discountData) => {
    try {
      const response = await axios.post(DISCOUNT_BASE_URL, discountData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating discount:", error);
      throw error;
    }
  },

  // Update an existing discount
  update: async (id, discountData) => {
    try {
      const response = await axios.put(
        `${DISCOUNT_BASE_URL}/${id}`,
        discountData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating discount ${id}:`, error);
      throw error;
    }
  },

  // Delete a discount
  delete: async (id) => {
    try {
      await axios.delete(`${DISCOUNT_BASE_URL}/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(`Error deleting discount ${id}:`, error);
      throw error;
    }
  },

  // Set discount for a specific book
  setBookDiscount: async (bookId, discountData) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BOOKS.BASE}/${bookId}/discount`,
        discountData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error setting discount for book ${bookId}:`, error);
      throw error;
    }
  },
};
