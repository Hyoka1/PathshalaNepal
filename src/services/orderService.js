import axios from "axios";
import { API_ENDPOINTS } from "../constants/api";

export const orderService = {
  // Get all orders with optional filtering
  getAll: async (filters = {}) => {
    try {
      const response = await axios.get(API_ENDPOINTS.ORDERS.GET_ALL, {
        params: filters,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get a single order by ID
  getById: async (id) => {
    try {
      const response = await axios.get(API_ENDPOINTS.ORDERS.GET_BY_ID(id), {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },

  // Update order status
  updateStatus: async (id, status) => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.ORDERS.UPDATE_STATUS(id),
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating order status ${id}:`, error);
      throw error;
    }
  },

  // Cancel an order
  cancelOrder: async (id) => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.ORDERS.CANCEL(id),
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error cancelling order ${id}:`, error);
      throw error;
    }
  },

  // Generate bill for an order
  generateBill: async (id) => {
    try {
      const response = await axios.get(API_ENDPOINTS.ORDERS.GENERATE_BILL(id), {
        withCredentials: true,
        responseType: "blob", // For PDF response
      });
      return response.data;
    } catch (error) {
      console.error(`Error generating bill for order ${id}:`, error);
      throw error;
    }
  },

  // Process a claim
  processClaim: async (claimData) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.ORDERS.PROCESS_CLAIM,
        claimData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error processing claim:", error);
      throw error;
    }
  },

  // Calculate order discount
  calculateDiscount: async (orderData) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.ORDERS.CALCULATE_DISCOUNT,
        orderData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error calculating discount:", error);
      throw error;
    }
  },
};
