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
import { ProfilePage } from "./pages/ProfilePage";
import { Welcome } from "./pages/Welcome";
import { FavoritesPage } from "./pages/FavoritesPage";

export const router = createBrowserRouter(
  createRoutesFromElements(

    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<Private />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/cancel" element={<CheckoutCancel />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/help" element={<Help />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/my-tickets" element={<MyTickets />} />
      <Route path="/admin/tickets" element={<AdminTickets />} />
      <Route path="/my-claims" element={<MyClaims />} />
      <Route path="/seller-claims" element={<SellerClaims />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Route>
  )
);