import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

const Navbar = ({
    currentPage,
    setCurrentPage,
    getTotalItems,
    setShowCartModal,
    isMenuOpen,
    setIsMenuOpen
}) => {
    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TechStore
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {[
                                { key: "home", label: "Home" },
                                { key: "products", label: "Products" },
                                { key: "about", label: "About" },
                            ].map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setCurrentPage(item.key)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === item.key
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
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
                            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 rounded-lg hover:bg-blue-50"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-100 mt-4">
                        <div className="flex flex-col space-y-2 pt-4">
                            {["Home", "Products", "About"].map((item, index) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setCurrentPage(["home", "products", "about"][index]);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${currentPage === ["home", "products", "about"][index]
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;