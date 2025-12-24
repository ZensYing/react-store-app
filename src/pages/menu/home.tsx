import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Avatar } from "@heroui/avatar";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/product-card";

export default function MenuHomePage() {
    const { products, loading } = useProducts();
    const navigate = useNavigate();

    const categories = [
        { name: "All Categories", key: "all" },
        { name: "Electronics", key: "electronics" },
        { name: "Clothing", key: "men's clothing,women's clothing" },
        { name: "Jewelry", key: "jewelery" },
    ];

    const featuredProducts = products.slice(0, 6);

    const handleCategoryClick = (categoryKey: string) => {
        navigate(`/products?category=${categoryKey}`);
    };

    return (
        <div className="space-y-4 pb-6">
            {/* User Profile Header */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar
                            className="w-14 h-14"
                            name="John William"
                            size="lg"
                            src="https://i.pravatar.cc/150?u=johnwilliam"
                        />
                        <div>
                            <h2 className="font-bold text-base text-gray-900 dark:text-white">John William</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">721 Broadway, New York, USA</p>
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                    </button>
                </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="border border-gray-200 dark:border-gray-800">
                    <CardBody className="p-3">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                            </svg>
                            <input
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="Search"
                                type="text"
                            />
                            <button className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                </svg>
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>

            {/* Promo Banner - Green with Vegetables */}
            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="bg-gradient-to-br from-green-700 to-green-600 border-0 overflow-hidden">
                    <CardBody className="p-5 relative">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 pr-4">
                                <p className="text-xs text-white/80 mb-1">Only Nov 10 - 31 Dec 2025</p>
                                <h3 className="font-bold text-xl text-white mb-3 leading-tight">
                                    Up to 50% Off +<br />Unlimited Delivery
                                </h3>
                                <button className="bg-white text-green-700 px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors">
                                    Grab Now
                                </button>
                            </div>
                            <div className="text-6xl">🥬</div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>

            {/* Category Pills - Redesigned */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                {categories.map((category, index) => (
                    <motion.button
                        key={category.key}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0"
                        initial={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        onClick={() => handleCategoryClick(category.key)}
                    >
                        <div
                            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${index === 0
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            {category.name}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Featured Products Grid */}
            <div>
                {loading ? (
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="h-80">
                                <Skeleton className="h-full" />
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
