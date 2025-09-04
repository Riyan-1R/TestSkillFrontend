import React from 'react';
import { Phone, Mail, MapPin, ArrowRight, TrendingUp } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                            TechStore
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Mitra tepercaya Anda untuk produk teknologi terkini. Kami
                            menawarkan elektronik premium dengan layanan pelanggan prima dan
                            harga kompetitif di seluruh Indonesia.
                        </p>
                        <div className="flex space-x-4">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Trusted by 50,000+ customers</p>
                                <p className="text-sm text-gray-400">
                                    Delivering excellence since 2020
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", page: "home" },
                                { label: "Products", page: "products" },
                                { label: "About", page: "about" },
                            ].map((link) => (
                                <li key={link.page}>
                                    <button
                                        onClick={() => setCurrentPage(link.page)}
                                        className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <span>{link.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-6">Contact Info</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-medium">+62 21 1234 5678</p>
                                    <p className="text-sm text-gray-400">24/7 Customer Support</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-600 p-2 rounded-lg">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-medium">info@techstore.com</p>
                                    <p className="text-sm text-gray-400">
                                        Quick response guaranteed
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-green-600 p-2 rounded-lg">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-medium">Jakarta, Indonesia</p>
                                    <p className="text-sm text-gray-400">Nationwide delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            &copy; 2025 TechStore. All rights reserved. Made for practice Front End
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <span className="text-sm text-gray-400">Secure payments</span>
                            <span className="text-sm text-gray-400">Fast shipping</span>
                            <span className="text-sm text-gray-400">Quality guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;