import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Phone, Mail, MapPin, Star, Plus, Edit2, Trash2, X, Image, Upload, Minus, CreditCard, Smartphone, Wallet } from 'lucide-react';

const TechStore = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 16 Pro Max',
      price: 15999000,
      category: 'Smartphone',
      image: 'image/16 16.png',
      rating: 4.8,
      description: 'Desain titanium premium, layar besar dan super-cepat, chipset A18 Pro yang kuat, sistem kamera dan video profesional, hingga daya tahan baterai luar biasa.'
    },
    {
      id: 2,
      name: 'MacBook Pro M4',
      price: 32999000,
      category: 'Laptop',
      image: 'image/Apple-MacBook-Air-sky-blue-250305_big.jpg.large.jpg',
      rating: 4.9,
      description: 'Dengan chip M4 solusi ideal untuk profesional kreatif dan pengguna berat menghadirkan performa luar biasa, layar premium, banyak port, baterai tahan lama, dan fitur AI terkini.'
    },
    {
      id: 3,
      name: 'Samsung Galaxy S25 Ultra',
      price: 12999000,
      category: 'Smartphone',
      image: 'image/sumsang.webp',
      rating: 4.7,
      description: 'Desain elegan dan tangguh, layar super cerah dan adaptif, performa Snapdragon 8 Elite, kamera 200 MP + 50 MP Ultra-Wide/pentek, AI canggih dengan Galaxy AI, daya tahan baterai tinggi, serta dukungan software jangka panjang.'
    },
    {
      id: 4,
      name: 'iPad Pro M4',
      price: 8999000,
      category: 'Tablet',
      image: 'image/ipadd.avif',
      rating: 4.6,
      description: 'Ideal untuk kreatif dan gaming, portabel, layar superior, prosumer class'
    },
    {
      id: 5,
      name: 'AirPods Gen 4',
      price: 3999000,
      category: 'Audio',
      image: 'image/earphone.jpg',
      rating: 4.5,
      description: 'Desain baru dengan stem pendek dan bodi kontur yang diklaim lebih nyaman dan pas di telinga'
    },
    {
      id: 6,
      name: 'Asus ROG Strix Scar 18',
      price: 18999000,
      category: 'Laptop',
      image: 'image/rog.jpg',
      rating: 4.4,
      description: 'Laptop gaming flagship yang menawarkan layar besar, desain taktis dengan pencahayaan RGB menyeluruh, dan build yang agresif serta futuristik.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    eWallet: 'gopay'
  });

  const categories = ['All', 'Smartphone', 'Laptop', 'Tablet', 'Audio'];
  const eWalletOptions = [
    { id: 'gopay', name: 'GoPay', icon: Wallet },
    { id: 'ovo', name: 'OVO', icon: Smartphone },
    { id: 'dana', name: 'DANA', icon: CreditCard },
    { id: 'linkaja', name: 'LinkAja', icon: Wallet }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Keranjang Anda kosong!');
      return;
    }
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  // Perbaikan: Fungsi untuk mengupdate form checkout
  const updateCheckoutForm = (field, value) => {
    setCheckoutForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
  };

  const handlePayment = () => {
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address) {
      alert('Mohon lengkapi semua data pengiriman!');
      return;
    }

    const selectedWallet = eWalletOptions.find(wallet => wallet.id === checkoutForm.eWallet);

    // Simulasi pembayaran
    const confirmed = window.confirm(
      `Konfirmasi Pembayaran\n\n` +
      `Total: ${formatPrice(getTotalPrice())}\n` +
      `Metode Pembayaran: ${selectedWallet.name}\n\n` +
      `Apakah Anda yakin ingin melanjutkan pembayaran?`
    );

    if (confirmed) {
      // Simulasi proses pembayaran
      alert(`Pembayaran berhasil melalui ${selectedWallet.name}!\n\nPesanan Anda akan diproses dan dikirim ke alamat yang tertera.`);

      // Reset cart dan form
      setCart([]);
      setCheckoutForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        eWallet: 'gopay'
      });
      setShowCheckoutModal(false);
    }
  };

  const Navbar = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">TechStore</h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                { key: 'home', label: 'Home' },
                { key: 'products', label: 'Products' },
                { key: 'about', label: 'About' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCurrentPage(item.key)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === item.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCartModal(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <div className="flex space-x-2">
                {['Home', 'Products', 'About'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(['home', 'products', 'about'][index])}
                    className={`px-2 py-1 rounded text-xs font-medium ${currentPage === ['home', 'products', 'about'][index]
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const CartModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Keranjang Belanja</h3>
            <button
              onClick={() => setShowCartModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Keranjang Anda kosong</p>
              <button
                onClick={() => {
                  setShowCartModal(false);
                  setCurrentPage('products');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/64x64/1f2937/ffffff?text=${encodeURIComponent(item.name.charAt(0))}`;
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-blue-600 font-medium">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">{formatPrice(getTotalPrice())}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CheckoutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Checkout</h3>
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Ringkasan Pesanan</h4>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information - PERBAIKAN UTAMA ADA DI SINI */}
            <div>
              <h4 className="font-semibold mb-3">Informasi Pengiriman</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={checkoutForm.name}
                    onChange={(e) => updateCheckoutForm('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={checkoutForm.email}
                    onChange={(e) => updateCheckoutForm('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No. Telepon *
                  </label>
                  <input
                    type="tel"
                    value={checkoutForm.phone}
                    onChange={(e) => updateCheckoutForm('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    value={checkoutForm.address}
                    onChange={(e) => updateCheckoutForm('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="font-semibold mb-3">Metode Pembayaran</h4>
              <div className="grid grid-cols-2 gap-3">
                {eWalletOptions.map((wallet) => {
                  const IconComponent = wallet.icon;
                  return (
                    <button
                      key={wallet.id}
                      onClick={() => updateCheckoutForm('eWallet', wallet.id)}
                      className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${checkoutForm.eWallet === wallet.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="font-medium">{wallet.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Kembali
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">TechStore</h3>
            <p className="text-gray-300 mb-4">
              Mitra tepercaya Anda untuk produk teknologi terkini. Kami menawarkan elektronik premium dengan layanan pelanggan prima dan harga kompetitif.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('home')} className="text-gray-300 hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="text-gray-300 hover:text-white transition-colors">Products</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="text-gray-300 hover:text-white transition-colors">About</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-gray-300">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-gray-300">info@techstore.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Temukan Teknologi Terbaru
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Premium electronics and cutting-edge technology at your fingertips
            </p>
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih TechStore?
            </h2>
            <p className="text-lg text-gray-600">
              Kami menyediakan produk teknologi terbaik dengan layanan yang luar biasa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-gray-600">Browse and purchase your favorite tech products with ease</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">All products are carefully selected for quality and performance</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help anytime with our dedicated customer support team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Check out our most popular items
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x400/1f2937/ffffff?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const ProductsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600">Discover the latest technology products</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x400/1f2937/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {showCartModal && <CartModal />}
      {showCheckoutModal && <CheckoutModal />}
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* About Hero */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About TechStore</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                TechStore adalah destinasi utama Anda untuk produk teknologi mutakhir. Sejak didirikan, kami berkomitmen untuk menghadirkan inovasi terbaru di bidang elektronik, mulai dari ponsel pintar dan laptop hingga peralatan audio dan perangkat pintar.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Misi kami adalah menjadikan teknologi dapat diakses oleh semua orang dengan menawarkan harga yang kompetitif, layanan pelanggan yang prima, dan pilihan produk yang dikurasi dengan cermat dari merek-merek tepercaya.
              </p>
              <p className="text-lg text-gray-600">
                Dengan platform kami yang ramah pengguna, Anda dapat dengan mudah menelusuri, membandingkan, dan membeli produk teknologi yang Anda butuhkan, semuanya didukung oleh komitmen kami terhadap kualitas dan kepuasan pelanggan.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h3>
              <p className="text-gray-600">
                Menjadi teknologi terkemuka yang memberdayakan masyarakat melalui produk inovatif dan layanan luar biasa, menjadikan teknologi canggih dapat diakses oleh semua orang.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Shopping Experience</h3>
            <p className="text-gray-600">
              Browse our extensive catalog with advanced search and filtering options to find exactly what you need.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
            <p className="text-gray-600">
              All products undergo rigorous quality checks and come with manufacturer warranties for your peace of mind.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">24/7 Customer Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is available around the clock to assist you with any questions or concerns.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Hubungi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+62 21 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@techstore.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">Jl. Teknologi No. 123<br />Jakarta Selatan, 12345<br />Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Customer Service</h4>
                <p className="text-gray-600 text-sm">
                  For immediate assistance, our customer service team is available 24/7 via phone or email.
                  We typically respond to emails within 2-4 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      {renderCurrentPage()}
      <Footer />
    </div>
  );
};

export default TechStore;