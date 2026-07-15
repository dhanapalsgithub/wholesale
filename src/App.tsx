import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { categories as seedCategories, owner as seedOwner, popularSearches, previousOrders, products as seedProducts } from './data/data';
import { saveCustomerToGoogleSheet } from './services/googleSheet';
import { buildTheme } from './theme';
import type { CartItem, Customer, NewCustomerInput, Order, OrderStatus, Product, Address } from './types';

const HomePage = lazy(() => import('./pages/User/HomePage'));
const ProductsPage = lazy(() => import('./pages/Products/ProductsPage'));
const ProductDetailsPage = lazy(() => import('./pages/Products/ProductDetailsPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const OwnerLoginPage = lazy(() => import('./pages/Auth/OwnerLoginPage'));
const CartPage = lazy(() => import('./pages/Cart/CartPage'));
const CheckoutPage = lazy(() => import('./pages/Cart/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/Favorites/WishlistPage'));
const OrdersPage = lazy(() => import('./pages/Orders/OrdersPage'));
const ProfilePage = lazy(() => import('./pages/User/ProfilePage'));
const SearchPage = lazy(() => import('./pages/Products/SearchPage'));
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/Admin/DashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/Admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('./pages/Admin/AdminOrdersPage'));
const AdminCustomersPage = lazy(() => import('./pages/Admin/AdminCustomersPage'));
const ReportsPage = lazy(() => import('./pages/Admin/ReportsPage'));
const InvoicePage = lazy(() => import('./pages/Admin/InvoicePage'));

function AppRoutes() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [products] = useState<Product[]>(seedProducts);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>(previousOrders);
  const [currentUser, setCurrentUser] = useState<Customer | null>(null);
  const [currentOwner, setCurrentOwner] = useState(seedOwner.email ? null : seedOwner);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const theme = useMemo(() => buildTheme(darkMode), [darkMode]);
  const [currentMobile] = useState<string | null>(localStorage.getItem('userMobile'));
  const [manualAddress, setManualAddress] = useState('');

  const categories = useMemo(() => {
    if (products === seedProducts) return seedCategories;
    const map = new Map<string, { id: string; name: string; image: string }>();
    products.forEach((product) => {
      if (!map.has(product.category)) {
        map.set(product.category, {
          id: product.category,
          name: product.category.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          image: product.images[0],
        });
      }
    });
    return [...map.values()];
  }, [products]);

  const handleDataLoad = (fetchedData: any[]) => {
    const loggedInUser = fetchedData.find(c => c.mobile === currentMobile);
    if (loggedInUser) {
      const formattedUser = {
        ...loggedInUser,
        addresses: [{ id: 'addr-1', line1: loggedInUser.address || '', city: loggedInUser.city || '', pincode: loggedInUser.pincode || '', state: loggedInUser.state || 'Tamil Nadu', label: 'Home' }]
      };
      setCurrentUser(formattedUser);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxVkFuN7FOI51PLQ6fPaBbhTKC-NOaXnT5m8yLlCDshP06vKjPgxO0dJAG-QhLAXlOx/exec');
        const data = await response.json();
        setCustomers(data);
        handleDataLoad(data);
      } catch (error) { console.error("Error:", error); }
    };
    fetchCustomers();
  }, [currentMobile]);

  const syncCustomer = (nextCart = cart, nextFavorites = favorites, extra?: Partial<Customer>) => {
    if (!currentUser) return;
    const nextUser = { ...currentUser, cartItems: nextCart, favoriteProducts: nextFavorites, ...extra };
    setCurrentUser(nextUser);
    setCustomers((rows) => rows.map((customer) => (customer.id === nextUser.id ? nextUser : customer)));
  };

  const addToCart = (productId: string) => {
    setCart((rows) => {
      const currentRows = rows || [];
      const exists = currentRows.find((item) => item.productId === productId);
      const next = exists ? currentRows.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)) : [...currentRows, { productId, quantity: 1 }];
      setTimeout(() => syncCustomer(next, favorites), 0);
      return next;
    });
  };

  const updateQty = (productId: string, quantity: number) => {
    const next = cart.map((item) => (item.productId === productId ? { ...item, quantity } : item));
    setCart(next);
    syncCustomer(next, favorites);
  };

  const removeFromCart = (productId: string) => {
    const next = cart.filter((item) => item.productId !== productId);
    setCart(next);
    syncCustomer(next, favorites);
  };

  const toggleFavorite = (productId: string) => {
    const next = favorites.includes(productId) ? favorites.filter((id) => id !== productId) : [...favorites, productId];
    setFavorites(next);
    syncCustomer(cart, next);
  };

  const registerCustomer = async (input: NewCustomerInput) => {
    if (customers.some((c) => c.email.toLowerCase() === input.email.toLowerCase())) return { ok: false, message: 'Email registered.' };
    const customer: Customer = {
      id: `cust-${Date.now()}`, name: input.name, email: input.email, password: input.password, mobile: input.mobile,
      address: input.address, city: input.city, state: input.state, pincode: input.pincode, wallet: 0, rewardPoints: 0,
      favoriteProducts: [], cartItems: [], orders: [],
      addresses: [{ id: `addr-${Date.now()}`, label: 'Home', line1: input.address, city: input.city, state: input.state, pincode: input.pincode }]
    };
    setCustomers((rows) => [customer, ...rows]);
    setCurrentUser(customer);
    await saveCustomerToGoogleSheet(customer);
    navigate('/');
    return { ok: true, message: 'Success' };
  };

  const placeOrder = (paymentMethod: string, addressId: string, paymentDetails?: string) => {
    if (!currentUser) return null;
    let selectedAddress: Address = addressId === 'new' ? { id: 'new', line1: manualAddress, city: 'chennai', label: 'New Address', state: 'N/A', pincode: '000000' } : currentUser.addresses?.find((a) => a.id === addressId)!;
    const items = cart.map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { productId: item.productId, quantity: item.quantity, price: product.offerPrice } : null;
    }).filter((item): item is { productId: string; quantity: number; price: number } => item !== null);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order: Order = {
      id: `ORD-${String((orders?.length || 0) + 1).padStart(5, '0')}`, customerId: currentUser.id, items, address: selectedAddress,
      status: 'Pending', paymentMethod, paymentDetails, placedAt: new Date().toISOString(), subtotal, gst: Math.round(subtotal * 0.05),
      delivery: subtotal > 599 ? 0 : 35, grandTotal: subtotal + Math.round(subtotal * 0.05) + (subtotal > 599 ? 0 : 35)
    };
    setOrders((rows) => [order, ...(rows || [])]);
    setCurrentUser({ ...currentUser, orders: [order.id, ...(currentUser.orders || [])], cartItems: [] });
    setCart([]);
    setManualAddress('');
    return order;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="liquid-bg">
        <Navbar currentUser={currentUser} cartCount={(cart || []).reduce((sum, item) => sum + item.quantity, 0)} wishCount={(favorites || []).length} darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} search={search} onSearch={setSearch} />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={
              <HomePage
                categories={categories}
                products={products}
                cart={cart}
                favorites={favorites}
                onAddToCart={addToCart}
                onUpdateQty={updateQty}
                onRemove={removeFromCart}
                onToggleFavorite={toggleFavorite}
              />
            } />
            <Route path="/login" element={<LoginPage customers={customers} onRegister={registerCustomer} onLogin={(c) => { setCurrentUser(c); setCart(c.cartItems); setFavorites(c.favoriteProducts); navigate('/'); }} />} />
            <Route path="/owner-login" element={<OwnerLoginPage owner={seedOwner} onLogin={() => { setCurrentOwner(seedOwner); navigate('/admin/dashboard'); }} />} />
            <Route
              path="/category/:id"
              element={
                <ProductsPage
                  products={products}
                  categories={categories}
                  favorites={favorites}
                  cart={cart}
                  onAddToCart={addToCart}
                  onUpdateQty={updateQty}      // இதைச் சேர்க்கவும்
                  onRemove={removeFromCart}    // இதைச் சேர்க்கவும்
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/products" element={
              <ProductsPage
                products={products}
                categories={categories}
                cart={cart}
                favorites={favorites}
                onAddToCart={addToCart}
                onUpdateQty={updateQty}
                onRemove={removeFromCart}
                onToggleFavorite={toggleFavorite}
              />
            } />
            <Route
              path="/products/:id"
              element={
                <ProductDetailsPage
                  products={products}
                  favorites={favorites}
                  cart={cart}                // Cart டேட்டாவை சேர்க்கவும்
                  onAddToCart={addToCart}
                  onUpdateQty={updateQty}    // Qty அப்டேட் பங்க்ஷனைச் சேர்க்கவும்
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/wishlist" element={<WishlistPage products={products} favorites={favorites} onAddToCart={addToCart} onToggleFavorite={toggleFavorite} />} />
            <Route path="/cart" element={<CartPage cart={cart} products={products} onQty={updateQty} onRemove={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutPage currentUser={currentUser} cart={cart} products={products} onPlaceOrder={placeOrder} />} />
            <Route path="/orders" element={<OrdersPage orders={orders.filter(o => o.customerId === currentUser?.id)} />} />
            <Route path="/profile" element={<ProfilePage customer={currentUser} />} />
            <Route path="/admin" element={currentOwner ? <AdminLayout /> : <Navigate to="/owner-login" />}>
              <Route path="dashboard" element={<DashboardPage orders={orders} products={products} customers={customers} />} />
              <Route path="products" element={<AdminProductsPage products={products} />} />
              <Route path="orders" element={<AdminOrdersPage orders={orders} onStatus={(id, status) => setOrders(rows => rows.map(o => o.id === id ? { ...o, status } : o))} />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="reports" element={<ReportsPage orders={orders} products={products} categories={categories} />} />
              <Route path="invoice" element={<InvoicePage orders={orders} customers={customers} products={products} />} />
            </Route>
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}