import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
    const { products, loading, error } = useProducts();
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Set category from URL parameter on mount
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    const categories = [
        { key: "all", label: "All Products" },
        { key: "electronics", label: "Electronics" },
        { key: "jewelery", label: "Jewelry" },
        { key: "men's clothing", label: "Men's" },
        { key: "women's clothing", label: "Women's" },
    ];

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : selectedCategory.includes(",")
                ? products.filter((p) =>
                    selectedCategory.split(",").some((cat) => p.category.includes(cat.trim()))
                )
                : products.filter((p) => p.category === selectedCategory);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                >
                    <Card className="max-w-sm border border-gray-200 dark:border-gray-800">
                        <CardBody className="text-center p-8">
                            <div className="text-6xl mb-4">😕</div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
                                Oops! Something went wrong
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {error}
                            </p>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-4 pb-6">
            {/* Page Header */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -10 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            All Products
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {filteredProducts.length} items available
                        </p>
                    </div>
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
                                placeholder="Search products..."
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

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                {categories.map((category, index) => (
                    <motion.button
                        key={category.key}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0"
                        initial={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        onClick={() => setSelectedCategory(category.key)}
                    >
                        <div
                            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${selectedCategory === category.key
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            {category.label}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="h-96">
                            <Skeleton className="h-full rounded-3xl" />
                        </Card>
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center min-h-[40vh]"
                    initial={{ opacity: 0, scale: 0.9 }}
                >
                    <Card className="max-w-sm border border-gray-200 dark:border-gray-800">
                        <CardBody className="text-center p-8">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
                                No Products Found
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Try selecting a different category
                            </p>
                        </CardBody>
                    </Card>
                </motion.div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-2 gap-3"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
