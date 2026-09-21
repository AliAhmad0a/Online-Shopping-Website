import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Shared
import ProtectedRoute from './components/shared/ProtectedRoute';
import PageLoader from './components/shared/PageLoader';

// Auth Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const OTPVerificationPage = lazy(() => import('./pages/auth/OTPVerificationPage'));

// User Pages
const HomePage = lazy(() => import('./pages/user/HomePage'));
const ProductsPage = lazy(() => import('./pages/user/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/user/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/user/CartPage'));
const CheckoutPage = lazy(() => import('./pages/user/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/user/WishlistPage'));
const OrdersPage = lazy(() => import('./pages/user/OrdersPage'));
const ProfilePage = lazy(() => import('./pages/user/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/user/NotFoundPage'));

import UserDashboardLayout from './layouts/UserDashboardLayout';
const OverviewPage = lazy(() => import('./pages/user/dashboard/OverviewPage'));
const MessagesPage = lazy(() => import('./pages/user/dashboard/MessagesPage'));
const ReviewsPage = lazy(() => import('./pages/user/dashboard/ReviewsPage'));
const UserSettingsPage = lazy(() => import('./pages/user/dashboard/SettingsPage'));

// Admin Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminProfilePage = lazy(() => import('./pages/admin/AdminProfilePage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ManageProductsPage = lazy(() => import('./pages/admin/ManageProductsPage'));
const AddEditProductPage = lazy(() => import('./pages/admin/AddEditProductPage'));
const ManageOrdersPage = lazy(() => import('./pages/admin/ManageOrdersPage'));
const ManageUsersPage = lazy(() => import('./pages/admin/ManageUsersPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const AdminMessagesPage = lazy(() => import('./pages/admin/MessagesPage'));
const AdminReviewsPage = lazy(() => import('./pages/admin/ReviewsPage'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '14px',
                  },
                }}
              />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                {/* User Routes */}
                <Route element={<UserLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:slug" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  
                  {/* Auth pages - redirect if already logged in */}
                  <Route path="/login" element={
                    <ProtectedRoute requireAuth={false}>
                      <LoginPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/register" element={
                    <ProtectedRoute requireAuth={false}>
                      <RegisterPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/verify-otp" element={<OTPVerificationPage />} />

                  {/* Protected user routes */}
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <UserDashboardLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<OverviewPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="reviews" element={<ReviewsPage />} />
                    <Route path="settings" element={<UserSettingsPage />} />
                  </Route>

                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Admin Login - separate from admin layout */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Admin Routes - protected */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="products" element={<ManageProductsPage />} />
                  <Route path="products/new" element={<AddEditProductPage />} />
                  <Route path="products/edit/:id" element={<AddEditProductPage />} />
                  <Route path="orders" element={<ManageOrdersPage />} />
                  <Route path="users" element={<ManageUsersPage />} />
                  <Route path="profile" element={<AdminProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="messages" element={<AdminMessagesPage />} />
                  <Route path="reviews" element={<AdminReviewsPage />} />
                </Route>
              </Routes>
                </Suspense>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


// dummy change


