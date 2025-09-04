import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const ProductCard = React.memo(({
    product,
    isListView = false,
    addToCart,
    toggleWishlist,
    wishlist
}) => (
    <div
        className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 ${isListView ? "flex" : ""
            }`}
    >
        <div className={`relative ${isListView ? "w-48 flex-shrink-0" : ""}`}>
            {product.badge && (
                <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {product.badge}
                </span>
            )}
            {product.discount && (
                <span className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    -{product.discount}%
                </span>
            )}
            <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 z-20 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                style={{ right: product.discount ? "3.5rem" : "0.75rem" }}
            >
                <Heart
                    className={`w-4 h-4 ${wishlist.find((item) => item.id === product.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                        }`}
                />
            </button>
            <img
                src={product.image}
                alt={product.name}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${isListView ? "h-32" : "h-48"
                    }`}
                onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x400/1f2937/ffffff?text=${encodeURIComponent(
                        product.name.charAt(0)
                    )}`;
                }}
            />
        </div>

        <div
            className={`p-4 flex-1 ${isListView ? "flex flex-col justify-between" : ""
                }`}
        >
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                {!isListView && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.features.slice(0, 2).map((feature, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-blue-600">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                    <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Tambah ke Keranjang</span>
                </button>
            </div>
        </div>
    </div>
));

export default ProductCard;