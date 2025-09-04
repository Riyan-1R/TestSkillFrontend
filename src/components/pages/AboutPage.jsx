import React from 'react';
import { ShoppingCart, Star, Phone, TrendingUp, Mail, MapPin } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* About Hero */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            TechStore
                        </span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                TechStore adalah destinasi utama Anda untuk produk teknologi
                                mutakhir. Sejak didirikan, kami berkomitmen untuk menghadirkan
                                inovasi terbaru di bidang elektronik, mulai dari ponsel pintar
                                dan laptop hingga peralatan audio dan perangkat pintar.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Misi kami adalah menjadikan teknologi dapat diakses oleh semua
                                orang dengan menawarkan harga yang kompetitif, layanan pelanggan
                                yang prima, dan pilihan produk yang dikurasi dengan cermat dari
                                merek-merek tepercaya.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Dengan platform kami yang ramah pengguna, Anda dapat dengan
                                mudah menelusuri, membandingkan, dan membeli produk teknologi
                                yang Anda butuhkan, semuanya didukung oleh komitmen kami
                                terhadap kualitas dan kepuasan pelanggan.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-2xl p-8 text-center border border-blue-200">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Visi Kami
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Menjadi platform teknologi terkemuka yang memberdayakan
                                masyarakat melalui produk inovatif dan layanan luar biasa,
                                menjadikan teknologi canggih dapat diakses oleh semua orang di
                                Indonesia.
                            </p>
                            <div className="mt-6 inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full">
                                <TrendingUp className="w-5 h-5" />
                                <span className="font-semibold">Innovation Driven</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            icon: ShoppingCart,
                            title: "Easy Shopping Experience",
                            description:
                                "Browse our extensive catalog with advanced search and filtering options to find exactly what you need.",
                            color: "from-blue-500 to-blue-600",
                        },
                        {
                            icon: Star,
                            title: "Quality Assurance",
                            description:
                                "All products undergo rigorous quality checks and come with manufacturer warranties for your peace of mind.",
                            color: "from-green-500 to-green-600",
                        },
                        {
                            icon: Phone,
                            title: "24/7 Customer Support",
                            description:
                                "Our dedicated support team is available around the clock to assist you with any questions or concerns.",
                            color: "from-purple-500 to-purple-600",
                        },
                    ].map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div
                                    className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Hubungi Kami
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                                Contact Information
                            </h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Phone,
                                        title: "Phone",
                                        content: "+62 21 1234 5678",
                                        subtitle: "Available 24/7",
                                        color: "bg-blue-500",
                                    },
                                    {
                                        icon: Mail,
                                        title: "Email",
                                        content: "info@techstore.com",
                                        subtitle: "Response within 2 hours",
                                        color: "bg-green-500",
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Address",
                                        content: "Jl. Teknologi No. 123",
                                        subtitle: "Jakarta Selatan, 12345, Indonesia",
                                        color: "bg-purple-500",
                                    },
                                ].map((contact, index) => {
                                    const IconComponent = contact.icon;
                                    return (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div
                                                className={`${contact.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                                            >
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {contact.title}
                                                </p>
                                                <p className="text-gray-700">{contact.content}</p>
                                                <p className="text-sm text-gray-500">
                                                    {contact.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                                Business Hours
                            </h3>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                                <div className="space-y-4">
                                    {[
                                        { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
                                        { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
                                        { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
                                    ].map((schedule, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center"
                                        >
                                            <span className="text-gray-700 font-medium">
                                                {schedule.day}
                                            </span>
                                            <span className="text-blue-600 font-semibold">
                                                {schedule.hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-blue-200">
                                    <h4 className="font-semibold text-gray-900 mb-3">
                                        Customer Service
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        For immediate assistance, our customer service team is
                                        available 24/7 via phone or email. We typically respond to
                                        emails within 2-4 hours during business days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;