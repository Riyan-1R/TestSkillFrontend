import React from 'react';
import { ArrowRight, ShoppingCart, Star, Phone, TrendingUp } from 'lucide-react';
import ProductCard from '../product/ProductCard';

const HomePage = ({
    setCurrentPage,
    products,
    addToCart,
    toggleWishlist,
    wishlist
}) => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Temukan Teknologi
                            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Masa Depan
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Premium electronics and cutting-edge technology at your
                            fingertips. Discover innovation that transforms your digital
                            lifestyle.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setCurrentPage("products")}
                                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                            >
                                <span>Shop Now</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setCurrentPage("about")}
                                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400 opacity-10 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-20 w-16 h-16 bg-pink-400 opacity-10 rounded-full animate-ping"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Mengapa Memilih
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}
                                TechStore?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Kami menyediakan produk teknologi terbaik dengan layanan yang luar
                            biasa dan pengalaman berbelanja yang tak terlupakan
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShoppingCart,
                                title: "Easy Shopping",
                                description:
                                    "Browse and purchase your favorite tech products with ease through our intuitive platform",
                                color: "from-blue-500 to-blue-600",
                            },
                            {
                                icon: Star,
                                title: "Quality Products",
                                description:
                                    "All products are carefully selected for quality and performance with warranty protection",
                                color: "from-green-500 to-green-600",
                            },
                            {
                                icon: Phone,
                                title: "24/7 Support",
                                description:
                                    "Get help anytime with our dedicated customer support team ready to assist you",
                                color: "from-purple-500 to-purple-600",
                            },
                        ].map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                                >
                                    <div
                                        className={`bg-gradient-to-r ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Featured
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}
                                Products
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Check out our most popular and highly-rated products loved by
                            thousands of customers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.slice(0, 3).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                addToCart={addToCart}
                                toggleWishlist={toggleWishlist}
                                wishlist={wishlist}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => setCurrentPage("products")}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                        >
                            <span>View All Products</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "50K+", label: "Happy Customers" },
                            { number: "500+", label: "Products Available" },
                            { number: "99%", label: "Customer Satisfaction" },
                            { number: "24/7", label: "Customer Support" },
                        ].map((stat, index) => (
                            <div key={index} className="group">
                                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                                    {stat.number}
                                </div>
                                <div className="text-blue-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;