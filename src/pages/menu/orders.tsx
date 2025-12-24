import { motion } from "framer-motion";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Link } from "react-router-dom";

import { useCart } from "@/contexts/cart-context";

export default function OrdersPage() {
    const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
        useCart();

    const totalPrice = getTotalPrice();
    const deliveryFee = 5.0;
    const tax = totalPrice * 0.1;
    const grandTotal = totalPrice + deliveryFee + tax;

    if (cart.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <Card className="max-w-sm  border border-gray-100 dark:border-gray-800">
                        <CardBody className="text-center p-10">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                className="text-7xl mb-6"
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                🛒
                            </motion.div>
                            <h3 className="font-bold text-2xl mb-3 text-gray-800 dark:text-white">
                                Your Cart is Empty
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Add some amazing products to get started!
                            </p>
                            <Button
                                as={Link}
                                className="font-bold "
                                color="success"
                                size="lg"
                                to="/products"
                                variant="flat"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                    />
                                </svg>
                                Browse Products
                            </Button>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-5 pb-6">
            {/* Page Header with Actions */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -10 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            My Cart
                            <Chip color="success" size="sm" variant="flat">
                                {cart.length}
                            </Chip>
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>
                    <Button
                        className="font-semibold"
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={clearCart}
                    >
                        Clear All
                    </Button>
                </div>
            </motion.div>

            {/* Cart Items */}
            <div className="space-y-3">
                {cart.map((item, index) => (
                    <motion.div
                        key={item.id}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Card className=" hover: transition-all duration-300 border border-gray-100 dark:border-gray-800">
                            <CardBody className="p-4">
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden flex-shrink-0 ">
                                        <Image
                                            alt={item.title}
                                            className="object-contain w-full h-full p-3"
                                            src={item.image}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1 pr-2">
                                                <h4 className="font-bold text-sm line-clamp-2 text-gray-800 dark:text-white mb-1">
                                                    {item.title}
                                                </h4>
                                                <Chip
                                                    className="capitalize"
                                                    color="default"
                                                    size="sm"
                                                    variant="flat"
                                                >
                                                    {item.category}
                                                </Chip>
                                            </div>
                                            {/* Remove Button */}
                                            <button
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 p-2 rounded-lg transition-all"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            {/* Price */}
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Total
                                                </span>
                                                <span className="font-bold text-lg text-green-600 dark:text-green-400">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 ">
                                                <button
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900 text-green-600 dark:text-green-400 transition-all  hover:"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M20 12H4"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                        />
                                                    </svg>
                                                </button>
                                                <span className="font-bold text-base w-8 text-center text-gray-800 dark:text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white transition-all  hover:"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
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
                                                            strokeWidth={2}
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Order Summary - Premium Design */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
            >
                <Card className=" bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white border-0 overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                    </div>

                    <CardBody className="p-5 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-xl">Order Summary</h3>
                            <Chip
                                className="bg-white/20 backdrop-blur-md text-white font-bold"
                                size="sm"
                            >
                                {cart.length} items
                            </Chip>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/90">Subtotal</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/90">Delivery Fee</span>
                                <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/90">Tax (10%)</span>
                                <span className="font-semibold">${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <Divider className="bg-white/30 my-4" />

                        <div className="flex justify-between items-center mb-5">
                            <span className="font-bold text-lg">Grand Total</span>
                            <div className="text-right">
                                <div className="font-bold text-3xl">${grandTotal.toFixed(2)}</div>
                                <div className="text-xs text-white/80">All taxes included</div>
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter className="pt-0 px-5 pb-5 relative z-10">
                        <Button
                            className="w-full text-white font-bold text-base "
                            color="default"
                            size="lg"
                            variant="flat"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                />
                            </svg>
                            Place Order
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
