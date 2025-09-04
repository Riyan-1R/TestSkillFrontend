import React from 'react';
import { X, CheckCircle, Wallet, Smartphone, CreditCard } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const CheckoutModal = ({
    cart,
    setShowCheckoutModal,
    getTotalPrice,
    checkoutForm,
    updateCheckoutForm,
    handlePayment
}) => {
    const eWalletOptions = [
        { id: "gopay", name: "GoPay", icon: Wallet, color: "bg-green-500" },
        { id: "ovo", name: "OVO", icon: Smartphone, color: "bg-purple-500" },
        { id: "dana", name: "DANA", icon: CreditCard, color: "bg-blue-500" },
        { id: "linkaja", name: "LinkAja", icon: Wallet, color: "bg-red-500" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Checkout</h3>
                        <button
                            onClick={() => setShowCheckoutModal(false)}
                            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                            <h4 className="font-semibold mb-4 text-gray-900">
                                Ringkasan Pesanan
                            </h4>
                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            <div>
                                                <span className="font-medium text-gray-900">
                                                    {item.name}
                                                </span>
                                                <span className="text-gray-600 text-sm">
                                                    {" "}
                                                    x {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                                <div className="border-t border-blue-200 pt-3 mt-3">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total:</span>
                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            {formatPrice(getTotalPrice())}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Information */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">
                                Informasi Pengiriman
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        value={checkoutForm.name}
                                        onChange={(e) => updateCheckoutForm("name", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={checkoutForm.email}
                                        onChange={(e) =>
                                            updateCheckoutForm("email", e.target.value)
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Masukkan email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        No. Telepon *
                                    </label>
                                    <input
                                        type="tel"
                                        value={checkoutForm.phone}
                                        onChange={(e) =>
                                            updateCheckoutForm("phone", e.target.value)
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Masukkan nomor telepon"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat Lengkap *
                                    </label>
                                    <textarea
                                        value={checkoutForm.address}
                                        onChange={(e) =>
                                            updateCheckoutForm("address", e.target.value)
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        rows="3"
                                        placeholder="Masukkan alamat lengkap"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <h4 className="font-semibold mb-4 text-gray-900">
                                Metode Pembayaran
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {eWalletOptions.map((wallet) => {
                                    const IconComponent = wallet.icon;
                                    return (
                                        <button
                                            key={wallet.id}
                                            onClick={() => updateCheckoutForm("eWallet", wallet.id)}
                                            className={`p-4 border-2 rounded-xl flex items-center space-x-3 transition-all duration-200 ${checkoutForm.eWallet === wallet.id
                                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-lg ${wallet.color} flex items-center justify-center`}
                                            >
                                                <IconComponent className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {wallet.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-6">
                            <button
                                onClick={() => setShowCheckoutModal(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={handlePayment}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <span>Bayar Sekarang</span>
                                <CheckCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;