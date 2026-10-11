import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Heart, Search, User, ShieldCheck, Star, 
  SlidersHorizontal, Plus, Trash2, CheckCircle2, X, Package, 
  ArrowRight, Shield, RefreshCw, LogOut, Lock, Key
} from 'lucide-react';
import { IProduct, ICategory, ICartItem, IOrder, IUser } from './types';

// Initial Mock Seed for preview fallback
const MOCK_CATEGORIES: ICategory[] = [
  { _id: 'cat_electronics', name: 'Electronics', slug: 'electronics', description: 'Gadgets & tech', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { _id: 'cat_audio', name: 'Audio & Sound', slug: 'audio-sound', description: 'Headphones & speakers', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { _id: 'cat_wearables', name: 'Wearables', slug: 'wearables', description: 'Smartwatches & trackers', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { _id: 'cat_accessories', name: 'Accessories', slug: 'accessories', description: 'Keyboards & gear', image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400' },
];

const MOCK_PRODUCTS: IProduct[] = [
  {
    _id: 'prod_1',
    name: 'Pro Noise-Canceling Wireless Headphones',
    slug: 'pro-noise-canceling-wireless-headphones',
    description: 'Experience studio-quality audio with hybrid active noise cancellation, 40-hour battery life, and spatial audio tuned for pristine depth.',
    price: 299,
    originalPrice: 349,
    discountPercent: 14,
    rating: 4.8,
    numReviews: 42,
    category: 'cat_audio',
    brand: 'AcousticPro',
    countInStock: 18,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
  },
  {
    _id: 'prod_2',
    name: 'Ultra-Slim Retina Smart Watch Pro',
    slug: 'ultra-slim-retina-smart-watch-pro',
    description: 'Track health metrics, heart rate, sleep cycles, and GPS workouts in style with a bright OLED retina display and aerospace titanium casing.',
    price: 399,
    originalPrice: 449,
    discountPercent: 11,
    rating: 4.9,
    numReviews: 28,
    category: 'cat_wearables',
    brand: 'Chronos',
    countInStock: 12,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
  },
  {
    _id: 'prod_3',
    name: 'Minimalist Mechanical Wireless Keyboard',
    slug: 'minimalist-mechanical-wireless-keyboard',
    description: 'Hot-swappable mechanical tactile switches with custom PBT keycaps, per-key RGB backlighting, and multi-device wireless Bluetooth capability.',
    price: 149,
    originalPrice: 179,
    discountPercent: 17,
    rating: 4.7,
    numReviews: 19,
    category: 'cat_accessories',
    brand: 'Keycraft',
    countInStock: 25,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
  },
  {
    _id: 'prod_4',
    name: 'Ergonomic Precision Wireless Mouse',
    slug: 'ergonomic-precision-wireless-mouse',
    description: 'Designed for ultimate wrist comfort and productivity with electromagnetic scrolling, hyper-fast optical tracking, and silent clicks.',
    price: 89,
    originalPrice: 109,
    discountPercent: 18,
    rating: 4.6,
    numReviews: 34,
    category: 'cat_accessories',
    brand: 'LogiTech',
    countInStock: 30,
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'],
    isFeatured: false,
  },
  {
    _id: 'prod_5',
    name: 'Studio Master 4K Ultra HD Monitor',
    slug: 'studio-master-4k-ultra-hd-monitor',
    description: '27-inch IPS 4K HDR display with 99% DCI-P3 color gamut accuracy, 90W USB-C power delivery charging, and ultra-thin bezels.',
    price: 649,
    originalPrice: 729,
    discountPercent: 11,
    rating: 4.9,
    numReviews: 15,
    category: 'cat_electronics',
    brand: 'VisionCraft',
    countInStock: 8,
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
  },
  {
    _id: 'prod_6',
    name: 'Immersive True Wireless ANC Earbuds',
    slug: 'immersive-true-wireless-anc-earbuds',
    description: 'Compact wireless earbuds delivering deep bass, ambient transparency mode, spatial audio, and an IPX5 water resistance rating.',
    price: 179,
    originalPrice: 199,
    discountPercent: 10,
    rating: 4.5,
    numReviews: 22,
    category: 'cat_audio',
    brand: 'AcousticPro',
    countInStock: 20,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'],
    isFeatured: false,
  },
];

export default function App() {
  // State
  const [products] = useState<IProduct[]>(MOCK_PRODUCTS);
  const [categories] = useState<ICategory[]>(MOCK_CATEGORIES);
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<IUser | null>({
    _id: 'usr_customer_1',
    name: 'Alex Johnson',
    email: 'user@example.com',
    role: 'USER',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  // Auth Modal State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Shipping Form
  const [shippingAddress, setShippingAddress] = useState({
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    postalCode: '97477',
    country: 'USA',
    phone: '+1 (555) 019-2834',
  });

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Actions
  const handleAddToCart = (product: IProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product._id);
      if (existing) {
        return prev.map(item =>
          item.productId === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          qty: 1,
          countInStock: product.countInStock,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    const newOrder: IOrder = {
      _id: `ord_${Date.now()}`,
      userId: user?._id || 'usr_guest',
      orderItems: cart,
      shippingAddress,
      paymentMethod: 'Credit Card',
      itemsPrice: cartTotal,
      taxPrice: Math.round(cartTotal * 0.1),
      shippingPrice: 15,
      totalPrice: cartTotal + Math.round(cartTotal * 0.1) + 15,
      isPaid: true,
      paidAt: new Date().toISOString(),
      isDelivered: false,
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsOrdersOpen(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail.includes('admin')) {
      setUser({ _id: 'usr_admin_1', name: 'System Admin', email: authEmail, role: 'ADMIN' });
    } else {
      setUser({ _id: `usr_${Date.now()}`, name: authName || 'Valued Customer', email: authEmail, role: 'USER' });
    }
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header / Navbar */}
      <header id="navbar" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                AuraStore
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Spring Boot REST Ready
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search premium electronics, headphones, wearables..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              id="btn-wishlist"
              onClick={() => setSelectedCategory('wishlist')}
              className="relative p-2 text-slate-600 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              id="btn-cart"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  id="btn-orders"
                  onClick={() => setIsOrdersOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  <Package className="w-4 h-4" />
                  My Orders
                </button>

                {user.role === 'ADMIN' && (
                  <button
                    id="btn-admin"
                    onClick={() => setIsAdminOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </button>
                )}

                <button
                  id="btn-logout"
                  onClick={() => setUser(null)}
                  className="p-2 text-slate-500 hover:text-rose-600 rounded-full hover:bg-slate-100 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-login"
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition shadow-sm"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <div id="hero-banner" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 md:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md rounded-full text-indigo-200 border border-white/10">
              Java 21 Spring Boot + MongoDB REST API Architecture
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Next-Generation Modern E-Commerce Platform
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore hyper-responsive hardware, active noise-canceling audio gear, and sleek productivity workstations powered by clean Spring Data REST APIs.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-3 bg-white text-indigo-900 text-xs font-bold rounded-full shadow-lg hover:bg-slate-100 transition flex items-center gap-2"
              >
                Explore Catalog <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button
            id="cat-all"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-full border whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              id={`cat-${cat._id}`}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border whitespace-nowrap transition ${
                selectedCategory === cat._id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
          <button
            id="cat-wishlist"
            onClick={() => setSelectedCategory('wishlist')}
            className={`px-4 py-2 text-xs font-semibold rounded-full border whitespace-nowrap transition ${
              selectedCategory === 'wishlist'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
              {selectedCategory === 'all' ? 'Featured Collection' : selectedCategory === 'wishlist' ? 'Saved Wishlist' : 'Category Products'}
              <span className="text-xs font-normal text-slate-500">({filteredProducts.length} items)</span>
            </h2>
          </div>

          <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'wishlist'
              ? products.filter(p => wishlist.includes(p._id))
              : filteredProducts
            ).map(product => (
              <div
                key={product._id}
                id={`product-card-${product._id}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Product Image Box */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {product.discountPercent > 0 && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold bg-rose-500 text-white rounded-md shadow-sm">
                      -{product.discountPercent}%
                    </span>
                  )}
                  <button
                    onClick={() => handleToggleWishlist(product._id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition ${
                      wishlist.includes(product._id)
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-medium text-indigo-600">{product.brand}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {product.rating} ({product.numReviews})
                      </div>
                    </div>
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer line-clamp-1 transition"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="ml-2 text-xs text-slate-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      id={`add-cart-${product._id}`}
                      onClick={() => handleAddToCart(product)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                Shopping Cart ({cart.length})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.productId} className="flex gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      <p className="text-xs font-bold text-indigo-600 mt-0.5">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-500">Qty: {item.qty}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCart(cart.filter(c => c.productId !== item.productId))}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="flex justify-between text-sm font-bold text-slate-900">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-slate-900">Shipping & Payment</h3>
              <button onClick={() => setIsCheckoutOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Street Address</label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={e => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={e => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs"
            >
              Confirm Order (${cartTotal + 25})
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-slate-900">{authMode === 'login' ? 'Sign In' : 'Create Account'}</h3>
              <button onClick={() => setIsAuthOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-3 text-xs">
              {authMode === 'register' && (
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              )}
              <input
                type="email"
                placeholder="Email address (admin@example.com for admin)"
                required
                value={authEmail}
                onChange={e => setAuthEmail(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
              />
              <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-lg">
                {authMode === 'login' ? 'Sign In' : 'Register'}
              </button>
            </form>
            <p className="text-[11px] text-center text-slate-500">
              {authMode === 'login' ? "Don't have an account? " : 'Already registered? '}
              <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-indigo-600 font-bold underline">
                {authMode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-slate-900">{selectedProduct.name}</h3>
              <button onClick={() => setSelectedProduct(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-xl" />
            <p className="text-xs text-slate-600 leading-relaxed">{selectedProduct.description}</p>
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-xl font-extrabold text-slate-900">${selectedProduct.price}</span>
              <button
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Admin Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center border-b p-4 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                Admin Dashboard
              </h3>
              <button onClick={() => setIsAdminOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Products Management */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Package className="w-4 h-4 text-indigo-500" /> Products
                    </h4>
                    <button className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-100 transition">
                      + Add New
                    </button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {products.map(p => (
                      <div key={p._id} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:border-indigo-100 transition">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <p className="font-bold text-xs text-slate-900 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-slate-500">${p.price} • Stock: {p.countInStock}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-slate-400 hover:text-indigo-600"><RefreshCw className="w-4 h-4" /></button>
                          <button className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orders Management */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-emerald-500" /> Orders
                    </h4>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {orders.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <p className="text-xs">No orders yet.</p>
                      </div>
                    ) : (
                      orders.map(o => (
                        <div key={o._id} className="p-3 border border-slate-100 rounded-xl">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-xs text-slate-900">Order #{o._id.substring(4, 12)}</p>
                              <p className="text-[10px] text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">
                              {o.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                            <p className="text-xs font-semibold">${o.totalPrice}</p>
                            <button className="text-[10px] font-bold text-indigo-600 hover:underline">View Details</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
