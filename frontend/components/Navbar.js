"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, Search, Clock, Plus } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Custom Investing Icon combining a chart and Bitcoin logo
const InvestingIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Line chart squiggly on left */}
    <path d="M3 17l4-4 3 3" />
    <path d="M10 16l4-4" />
    <path d="M3 21h18" />
    {/* Mini Bitcoin B on right */}
    <path
      d="M17 11h2.5a1.5 1.5 0 0 0 0-3H17v6h3.5a1.5 1.5 0 0 0 0-3H17"
      strokeWidth="1.5"
    />
    <path d="M18 7v1" strokeWidth="1.5" />
    <path d="M20 7v1" strokeWidth="1.5" />
    <path d="M18 14v1" strokeWidth="1.5" />
    <path d="M20 14v1" strokeWidth="1.5" />
  </svg>
);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/cards", icon: CreditCard, label: "Cards" },
  { href: "/pay", icon: Plus, label: "Pay", isCenter: true },
  { href: "/investing", icon: InvestingIcon, label: "Investing" },
  { href: "/activity", icon: Clock, label: "Activity" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar on login/register screens
  if (["/login", "/register"].includes(pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800 px-6 py-3 flex items-center justify-between z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        if (item.isCenter) {
          return (
            <Link
              key={item.href}
              href="/pay"
              className="bg-cashapp text-white p-3 rounded-full -translate-y-6 shadow-lg shadow-cashapp/40 hover:scale-110 active:scale-95 transition-all"
            >
              <Icon className="w-8 h-8" strokeWidth={3} />
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center space-y-1 transition-colors",
              isActive ? "text-cashapp" : "text-gray-400 hover:text-gray-600",
            )}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
    </nav>
  );
}
