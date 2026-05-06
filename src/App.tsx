/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminMenu from './pages/admin/Menu';
import AdminSettings from './pages/admin/Settings';
import { AdminGuard } from './components/AdminGuard';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <CartProvider>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/order" element={<Order />} />
                <Route path="/cart" element={<Cart />} />
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
                <Route path="/admin/orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
                <Route path="/admin/menu" element={<AdminGuard><AdminMenu /></AdminGuard>} />
                <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
              </Routes>
            </Layout>
          </CartProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}
