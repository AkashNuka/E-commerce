
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen bg-brand-light font-sans">
              <Header />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/admin" element={<PrivateRoute />}>
                    <Route index element={<AdminPage />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

const NotFoundPage: React.FC = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-brand-primary mb-4">404 - Not Found</h1>
    <p className="text-gray-600">The page you are looking for does not exist.</p>
  </div>
);

export default App;
