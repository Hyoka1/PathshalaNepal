import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/header";
import Landing from "./Components/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Signup from "./Pages/SignUp/Signup";
import Login from "./Pages/Login/login";
import HomePage from "./Pages/Design/MainHomePage";
import ReportsPage from "./Pages/Report/Report";
import ContactUs from "./Pages/Contact Us/ContactUs";
import AboutUs from "./Pages/AboutUs/AboutUs";
import SettingsPage from "./Pages/Settings/Setting";
import LogoutPage from "./Pages/LogOut/Logout";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Books from "./Pages/Admin/Books";
import Discounts from "./Pages/Admin/Discounts";
import BookList from "./Components/Book/BookList";
import BookDetails from "./Components/Book/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import StaffRoute from "./components/StaffRoute";
import History from "./Pages/History";
import StaffLayout from "./Pages/Staff/StaffLayout";
import StaffDashboard from "./Pages/Staff/StaffDashboard";
import OrderSearchPage from "./Pages/Staff/OrderSearchPage";

// Conditional Header component
const ConditionalHeader = () => {
  const location = useLocation();
  const isStaffPage = location.pathname.startsWith("/staff");

  if (isStaffPage) {
    return null; // Don't render the regular header on staff pages
  }

  return <Header />;
};

// Conditional Footer component
const ConditionalFooter = () => {
  const location = useLocation();
  const isStaffPage = location.pathname.startsWith("/staff");

  if (isStaffPage) {
    return null; // Don't render the footer on staff pages
  }

  return <Footer />;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ToastContainer />
          <ConditionalHeader />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BookList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="books" element={<Books />} />
              <Route path="discounts" element={<Discounts />} />
              <Route index element={<Navigate to="/admin/books" replace />} />
            </Route>
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <LogoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            {/* Staff Routes */}
            <Route
              path="/staff"
              element={
                <StaffRoute>
                  <StaffLayout>
                    <StaffDashboard />
                  </StaffLayout>
                </StaffRoute>
              }
            />
            <Route
              path="/staff/order-details"
              element={
                <StaffRoute>
                  <StaffLayout>
                    <OrderSearchPage />
                  </StaffLayout>
                </StaffRoute>
              }
            />
            <Route path="*" element={<Login />} /> {/* fallback to login */}
          </Routes>
          <ConditionalFooter />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
