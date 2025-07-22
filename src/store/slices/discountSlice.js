import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  discounts: [],
  currentDiscount: null,
  loading: false,
  error: null,
};

export const fetchDiscounts = createAsyncThunk(
  "discounts/fetchDiscounts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get("/api/discount", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDiscount = createAsyncThunk(
  "discounts/createDiscount",
  async (discountData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post("/api/discount", discountData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDiscount = createAsyncThunk(
  "discounts/updateDiscount",
  async ({ discountId, discountData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(
        `/api/discount/${discountId}`,
        discountData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discounts/deleteDiscount",
  async (discountId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      await axios.delete(`/api/discount/${discountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return discountId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    clearCurrentDiscount: (state) => {
      state.currentDiscount = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Discounts
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Discount
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts.push(action.payload);
        state.currentDiscount = action.payload;
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Discount
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.discounts.findIndex(
          (discount) => discount.id === action.payload.id
        );
        if (index !== -1) {
          state.discounts[index] = action.payload;
        }
        if (state.currentDiscount?.id === action.payload.id) {
          state.currentDiscount = action.payload;
        }
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Discount
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = state.discounts.filter(
          (discount) => discount.id !== action.payload
        );
        if (state.currentDiscount?.id === action.payload) {
          state.currentDiscount = null;
        }
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentDiscount, clearError } = discountSlice.actions;
export default discountSlice.reducer;
