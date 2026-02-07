import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminFeatures from './pages/admin-view/Features'
import AdminOrders from './pages/admin-view/Orders'
import AdminProducts from './pages/admin-view/Products'

import NotFound from "./pages/not-found/NotFound"

import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import ShoppingAccount from './pages/shopping-view/Account'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingListing from './pages/shopping-view/Listing'
import ProductDetailsPage from "./pages/shopping-view/ProductDetails"

import ProtectedRoute from "./components/common/ProtectedRoute"
import AdminRoute from "./components/common/AdminRoute"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./store/auth-slice/authSlice"
import { Skeleton } from "./components/ui/skeleton"
import ShopSearchProducts from "./pages/shopping-view/Search"
import OrderSuccess from "./pages/shopping-view/OrderSuccess"
import Footer from "./pages/common/Footer"
import ShopWishlist from "./pages/shopping-view/Wishlist"
import About from "./pages/shopping-view/About"
import PrivacyPolicy from "./pages/shopping-view/PrivacyPolicy"
import Contact from "./pages/shopping-view/Contact"
import ShippingPolicy from "./pages/shopping-view/ShippingPolicy"
import CancellationAndReturns from "./pages/shopping-view/CancellationAndReturns"
import RefundPolicy from "./pages/shopping-view/RefundPolicy"
import TermsAndConditions from "./pages/shopping-view/TermsAndConditions"


function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(checkAuth());

    //for deploy on render
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch])

if (isLoading) {
  return (
    <div className="h-screen w-full overflow-hidden relative bg-gradient-to-br from-background via-muted/40 to-background flex items-center justify-center">
      
      <div className="absolute -top-40 -left-40 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg
                         animate-[float_2.8s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="p-3 space-y-4">
                
                <div className="aspect-[3/4] rounded-xl bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.6s_infinite]" />
                </div>

                <div className="h-4 w-3/4 rounded-full bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.6s_infinite]" />
                </div>

                <div className="h-4 w-1/2 rounded-full bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.6s_infinite]" />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}




  return (
    <>

      <Routes>
        {/* Auth routes */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Shop routes */}
        <Route path='/' element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path='search' element={<ShopSearchProducts />} />
          <Route path='order-success' element={<OrderSuccess />} />
          <Route path='about' element={<About />} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />
          <Route path='contact' element={<Contact />} />
          <Route path='shipping-policy' element={<ShippingPolicy />} />
          <Route path='refund-policy' element={<RefundPolicy />} />
          <Route path='cancellatin-and-returns-policy' element={<CancellationAndReturns />} />
          <Route path='terms-and-conditions' element={<TermsAndConditions />} />

          <Route
            path='checkout'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShoppingCheckout />
              </ProtectedRoute>} />
          <Route
            path='account'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShoppingAccount />
              </ProtectedRoute>} />
          <Route
            path='wishlist'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShopWishlist />
              </ProtectedRoute>} />

        </Route>

        {/* Admin routes */}
        <Route
          path='/admin'
          element={
            <AdminRoute isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </AdminRoute>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>


        {/* 404 routes */}
        <Route path='*' element={<NotFound />}></Route>


      </Routes>
    </>
  )
}

export default App
