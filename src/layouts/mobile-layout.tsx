import type React from "react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function MobileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
            {/* Main Content with padding for fixed header and bottom nav */}
            <main className="max-w-lg mx-auto pt-2 pb-20 px-2">{children}</main>

            {/* Bottom Navigation */}
            <MobileBottomNav />
        </div>
    );
}
