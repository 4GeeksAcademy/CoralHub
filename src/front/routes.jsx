// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Private } from "./pages/Private";
import { AddProduct } from "./pages/AddProduct";
import { Catalog } from "./pages/Catalog";
import { AdminUsers } from "./pages/AdminUsers";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart.jsx";
import { CheckoutSuccess } from "./pages/CheckoutSuccess.jsx";
import { CheckoutCancel } from "./pages/CheckoutCancel.jsx";
import { SearchResults } from "./pages/SearchResults";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Cookies } from "./pages/Cookies";
import { About } from "./pages/About";
import { Faq } from "./pages/Faq";
import { Contact } from "./pages/Contact";
import { Shipping } from "./pages/Shipping";
import { Returns } from "./pages/Returns";
import { Help } from "./pages/Help";
import { UserDashboard } from "./pages/UserDashboard";
import { MyTickets } from "./pages/MyTickets";
import { AdminTickets } from "./pages/AdminTickets";
import { MyClaims } from "./pages/MyClaims";
import { SellerClaims } from "./pages/SellerClaims";
import { AdminDashboard } from "./pages/AdminDashboard";
import { CategoryPage } from "./pages/CategoryPage";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { Welcome } from "./pages/Welcome.jsx";
import { FavoritesPage } from "./pages/FavoritesPage.jsx";
import { Rewards } from "./pages/Rewards.jsx";
import { EditProduct } from "./pages/EditProduct.jsx";
import { AdminOrders } from "./pages/AdminOrders";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<Private />} />
      <Route path="/home" element={<Home />} />

      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/category/:category" element={<CategoryPage />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/cancel" element={<CheckoutCancel />} />

      <Route path="/search" element={<SearchResults />} />
      <Route path="/favorites" element={<FavoritesPage />} />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/dashboard" element={<UserDashboard />} />

      <Route path="/my-tickets" element={<MyTickets />} />
      <Route path="/admin/tickets" element={<AdminTickets />} />
      <Route path="/my-claims" element={<MyClaims />} />
      <Route path="/seller-claims" element={<SellerClaims />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />

      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/help" element={<Help />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      

    </Route>
  )
);