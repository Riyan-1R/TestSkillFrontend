import React from 'react';
import { ShoppingCart, X, Star, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const CartModal = ({
    cart,
    setShowCartModal,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    handleCheckout,
    setCurrentPage
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Keranjang Belanja
                        </h3>
                        <button
                            onClick={() => setShowCartModal(false)}
                            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-gray-600 mb-2">
                                Keranjang Anda kosong
                            </h4>
                            <p className="text-gray-500 mb-6">
                                Mulai berbelanja dan temukan produk teknologi terbaik!
                            </p>
                            <button
                                onClick={() => {
                                    setShowCartModal(false);
                                    setCurrentPage("products");
                                }}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                            >
                                Mulai Belanja
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = `https://via.placeholder.com/64x64/1f2937/ffffff?text=${encodeURIComponent(
                                                    item.name.charAt(0)
                                                )}`;
                                            }}
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">
                                                {item.name}
                                            </h4>
                                            <p className="text-blue-600 font-medium">
                                                {formatPrice(item.price)}
                                            </p>
                                            <div className="flex items-center mt-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="text-xs text-gray-500 ml-1">
                                                    {item.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity - 1)
                                                }
                                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-medium w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-semibold text-gray-900">
                                        Total:
                                    </span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {formatPrice(getTotalPrice())}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <span>Checkout</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;