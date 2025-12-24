import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";
import { useState } from "react";

import type { Product } from "@/types/product";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
        >
            <Card className="h-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">
                {/* Favorite Button */}
                <button
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center transition-all hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                >
                    <svg
                        className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                        fill={isFavorite ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                        />
                    </svg>
                </button>

                <CardBody className="p-3 space-y-2">
                    {/* Product Image with Gradient Background */}
                    <div className="relative w-full aspect-square bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden mb-1">
                        <Image
                            alt={product.title}
                            className="object-contain w-full h-full p-4"
                            src={product.image}
                        />

                        {/* Discount Badge (if applicable) */}
                        {product.rating.rate > 4 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full">
                                <span className="text-[10px] font-bold">HOT</span>
                            </div>
                        )}
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                            {product.category}
                        </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-bold text-sm leading-tight text-gray-900 dark:text-white line-clamp-2 min-h-[2.25rem]">
                        {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {product.rating.rate}
                        </span>
                        <span className="text-[10px] text-gray-400">
                            ({product.rating.count})
                        </span>
                    </div>

                    {/* Price and Add Button */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                                ${(product.price * 1.2).toFixed(2)}
                            </span>
                        </div>

                        {/* Add Button - Circular */}
                        <button
                            className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                            onClick={handleAddToCart}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 4v16m8-8H4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                />
                            </svg>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    );
};
