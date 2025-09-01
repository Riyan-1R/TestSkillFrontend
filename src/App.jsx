import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Phone, Mail, MapPin, Star, Plus, Edit2, Trash2, X, Image, Upload } from 'lucide-react';

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
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const categories = ['All', 'Smartphone', 'Laptop', 'Tablet', 'Audio'];

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

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    });
    setImagePreview('');
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image
    });
    setImagePreview(product.image);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target.result;
          setProductForm(prev => ({ ...prev, image: imageData }));
          setImagePreview(imageData);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
      }
    }
  };

  // Fixed: Handle form input changes properly
  const handleInputChange = (field, value) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUrlChange = (url) => {
    setProductForm(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const validateImageUrl = (url) => {
    if (url && !url.startsWith('data:')) {
      const img = new Image();
      img.onload = () => setImagePreview(url);
      img.onerror = () => setImagePreview('');
      img.src = url;
    }
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.category) {
      alert('Please fill in all required fields (Name, Price, Category)');
      return;
    }

    if (productForm.price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const imageUrl = productForm.image || `https://via.placeholder.com/400x400/1f2937/ffffff?text=${encodeURIComponent(productForm.name)}`;

    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: productForm.name,
      price: parseInt(productForm.price),
      category: productForm.category,
      description: productForm.description,
      image: imageUrl,
      rating: editingProduct ? editingProduct.rating : 4.0
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts([...products, newProduct]);
    }

    setShowProductModal(false);
    setImagePreview('');
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
    </nav>
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
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{product.rating}</span>
                    </div>
                  </div>
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

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={() => setShowProductModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (IDR) *
                </label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={productForm.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <div className="text-center text-gray-500">or</div>
                  <input
                    type="url"
                    value={productForm.image.startsWith('data:') ? '' : productForm.image}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    onBlur={(e) => validateImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Or paste image URL"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a file or paste an image URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter product description"
                />
              </div>
            </div>

            {/* Image Preview */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Preview
              </label>
              <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center bg-gray-50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-48 object-contain rounded"
                    onError={() => setImagePreview('')}
                  />
                ) : (
                  <div className="text-center">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      Upload an image or enter URL to see preview
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-xs text-gray-600">
                <p className="font-medium mb-2">Tips for finding images:</p>
                <ul className="space-y-1">
                  <li>• Upload from your device</li>
                  <li>• Search Google Images for your product</li>
                  <li>• Right-click and "Copy image address"</li>
                  <li>• Try Unsplash.com for high-quality photos</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowProductModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </div>
      </div>
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
              <button
                onClick={handleAddProduct}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
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
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{product.name}</h3>
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
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

      {showProductModal && <ProductModal />}
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