import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const WISHLIST_BASE_URL = `${API_BASE_URL}/bookmark`;

export const wishlistService = {
  // Get all wishlist items
  getAll: async () => {
    try {
      const response = await axios.get(WISHLIST_BASE_URL, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  },

  // Add item to wishlist
  add: async (bookId, note = "") => {
    try {
      const response = await axios.post(
        WISHLIST_BASE_URL,
        {
          bookId,
          note,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  },

  // Remove item from wishlist
  remove: async (bookmarkId) => {
    try {
      await axios.delete(`${WISHLIST_BASE_URL}/${bookmarkId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  },

  // Get book details for wishlist items
  getWishlistWithBookDetails: async () => {
    try {
      const wishlistItems = await wishlistService.getAll();
      const bookPromises = wishlistItems.map((item) =>
        axios.get(`${API_BASE_URL}/books/${item.bookId}`, {
          withCredentials: true,
        })
      );
      const bookResponses = await Promise.all(bookPromises);

      return wishlistItems.map((item, index) => ({
        ...item,
        book: bookResponses[index].data,
      }));
    } catch (error) {
      console.error("Error fetching wishlist with book details:", error);
      throw error;
    }
  },
};
