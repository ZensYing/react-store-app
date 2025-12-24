import { Route, Routes } from "react-router-dom";

import { CookieConsentProvider } from "./contexts/cookie-consent-context";
import { CartProvider } from "./contexts/cart-context";
import { CookieConsent } from "./components/cookie-consent";
import { PageNotFound } from "./pages/404";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import MobileLayout from "@/layouts/mobile-layout";
import MenuHomePage from "@/pages/menu/home";
import ProductsPage from "@/pages/menu/products";
import OrdersPage from "@/pages/menu/orders";

function App() {
  return (
    <CookieConsentProvider>
      <CartProvider>
        <CookieConsent />
        <Routes>
          {/* Digital Menu App Routes - Main App */}
          <Route
            element={
              <MobileLayout>
                <MenuHomePage />
              </MobileLayout>
            }
            path="/"
          />
          <Route
            element={
              <MobileLayout>
                <ProductsPage />
              </MobileLayout>
            }
            path="/products"
          />
          <Route
            element={
              <MobileLayout>
                <OrdersPage />
              </MobileLayout>
            }
            path="/orders"
          />

          {/* Original template routes (moved to /template) */}
          <Route element={<IndexPage />} path="/template" />
          <Route element={<DocsPage />} path="/template/docs" />
          <Route element={<PricingPage />} path="/template/pricing" />
          <Route element={<BlogPage />} path="/template/blog" />
          <Route element={<AboutPage />} path="/template/about" />

          {/* 404 for unmatched routes */}
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </CartProvider>
    </CookieConsentProvider>
  );
}

export default App;
