import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import KioskLayout from './layouts/KioskLayout';
import ModeSelectPage from './pages/kiosk/ModeSelectPage';
import MenuPage from './pages/kiosk/MenuPage';
import ProductOptionsPage from './pages/kiosk/ProductOptionsPage';
import CartPage from './pages/kiosk/CartPage';
import PaymentMethodPage from './pages/kiosk/PaymentMethodPage';
import ConfirmPage from './pages/kiosk/ConfirmPage';
import CompletePage from './pages/kiosk/CompletePage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminPosts from './pages/admin/AdminPosts';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Kiosk Flow */}
        <Route path="/kiosk" element={<KioskLayout />}>
          <Route path="mode" element={<ModeSelectPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="product/:id" element={<ProductOptionsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="payment" element={<PaymentMethodPage />} />
          <Route path="confirm" element={<ConfirmPage />} />
          <Route path="complete" element={<CompletePage />} />
        </Route>

        {/* Admin Flow */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
