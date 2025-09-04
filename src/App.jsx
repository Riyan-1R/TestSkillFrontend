import React, { useState, useCallback } from "react";
import { initialProducts, eWalletOptions } from "./data/products";
import { useCart } from "./hooks/useCart";
import { formatPrice } from "./utils/formatters";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import AboutPage from "./components/pages/AboutPage";
import CartModal from "./components/modals/CartModal";
import CheckoutModal from "./components/modals/CheckoutModal";

const TechStore = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    eWallet: "gopay",
  });

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const toggleWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.find((item) => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  }, []);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }
    setShowCartModal(false);
    setShowCheckoutModal(true);
  }, [cart.length]);

  const updateCheckoutForm = (field, value) => {
    setCheckoutForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handlePayment = useCallback(() => {
    if (
      !checkoutForm.name ||
      !checkoutForm.email ||
      !checkoutForm.phone ||
      !checkoutForm.address
    ) {
      alert("Mohon lengkapi semua data pengiriman!");
      return;
    }

    const selectedWallet = eWalletOptions.find(
      (wallet) => wallet.id === checkoutForm.eWallet
    );

    const confirmed = window.confirm(
      `Konfirmasi Pembayaran\n\n` +
      `Total: ${formatPrice(getTotalPrice())}\n` +
      `Metode Pembayaran: ${selectedWallet.name}\n\n` +
      `Apakah Anda yakin ingin melanjutkan pembayaran?`
    );

    if (confirmed) {
      alert(
        `Pembayaran berhasil melalui ${selectedWallet.name}!\n\nPesanan Anda akan diproses dan dikirim ke alamat yang tertera.`
      );

      clearCart();
      setCheckoutForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        eWallet: "gopay",
      });
      setShowCheckoutModal(false);
    }
  }, [checkoutForm, clearCart, getTotalPrice]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            products={products}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        );
      case "products":
        return (
          <ProductsPage
            products={products}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        );
      case "about":
        return <AboutPage />;
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            products={products}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getTotalItems={getTotalItems}
        setShowCartModal={setShowCartModal}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {renderCurrentPage()}

      <Footer setCurrentPage={setCurrentPage} />

      {showCartModal && (
        <CartModal
          cart={cart}
          setShowCartModal={setShowCartModal}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getTotalPrice={getTotalPrice}
          handleCheckout={handleCheckout}
          setCurrentPage={setCurrentPage}
        />
      )}

      {showCheckoutModal && (
        <CheckoutModal
          cart={cart}
          setShowCheckoutModal={setShowCheckoutModal}
          getTotalPrice={getTotalPrice}
          checkoutForm={checkoutForm}
          updateCheckoutForm={updateCheckoutForm}
          handlePayment={handlePayment}
        />
      )}
    </div>
  );
};

export default TechStore;