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
import { Card, CardContent, CardHeader } from "./components/ui/card"


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
    <div className="h-screen w-screen overflow-hidden bg-background">
      <Card className="h-full w-full rounded-none border-0 flex flex-col">
        
        {/* Header */}
        <CardHeader className="space-y-4 px-8 pt-8 shrink-0">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>

        {/* Content */}
        <CardContent className="px-8 pb-8 flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-4 space-y-3 h-full">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="flex-1 w-full rounded-md" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>

      </Card>
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
