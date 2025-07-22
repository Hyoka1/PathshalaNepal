export const API_BASE_URL = "https://localhost:7067/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER_MEMBER: `${API_BASE_URL}/auth/register/member`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    CHECK_AUTH: `${API_BASE_URL}/auth/check-auth`,
  },
  ORDERS: {
    BASE: `${API_BASE_URL}/order`,
    GET_BY_ID: (id) => `${API_BASE_URL}/order/${id}`,
    GET_ALL: `${API_BASE_URL}/order`,
    CREATE: `${API_BASE_URL}/order`,
    CANCEL: (id) => `${API_BASE_URL}/order/${id}/cancel`,
    PROCESS_CLAIM: `${API_BASE_URL}/order/claim`,
    GENERATE_BILL: (id) => `${API_BASE_URL}/order/${id}/bill`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/order/${id}/status`,
    CALCULATE_DISCOUNT: `${API_BASE_URL}/order/calculate-discount`,
  },
  BOOKS: {
    BASE: `${API_BASE_URL}/book`,
    GET_BY_ID: (id) => `${API_BASE_URL}/book/${id}`,
    GET_ALL: `${API_BASE_URL}/book`,
  },
  CART: {
    BASE: `${API_BASE_URL}/cart`,
    ADD_ITEM: `${API_BASE_URL}/cart/add`,
    REMOVE_ITEM: `${API_BASE_URL}/cart/remove`,
    GET_CART: `${API_BASE_URL}/cart`,
    CLEAR_CART: `${API_BASE_URL}/cart/clear`,
  },
};
