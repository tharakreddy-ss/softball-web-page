"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Home,
  LayoutDashboard,
  Menu,
  Trophy,
  User,
  X,
} from "lucide-react";
import { assets } from "@/assets";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function TournamentsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image src={assets.logos.app} alt="" width={32} height={32} />
              <span className="hidden font-bold sm:inline">Softball Pro</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative rounded-lg p-2 hover:bg-white/10"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-slate-900 py-2 shadow-xl"
                  >
                    <Link href="/login" className="block px-4 py-2 text-sm hover:bg-white/10">
                      Sign in
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-white/10">
                      Dashboard
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-white/10">
                      Settings
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-900/50 lg:block">
          <nav className="space-y-1 p-4">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === href || pathname.startsWith(href + "/")
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-white/10 bg-slate-900 lg:hidden"
              >
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                  <span className="font-bold">Menu</span>
                  <button type="button" onClick={() => setSidebarOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="space-y-1 p-4">
                  {nav.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                        pathname.startsWith(href) ? "bg-emerald-600" : "hover:bg-white/5"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
