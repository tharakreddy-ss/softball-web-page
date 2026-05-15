"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { assets } from "@/assets";
import {
  LayoutDashboard,
  Trophy,
  Users,
  UserCircle,
  Swords,
  BarChart3,
  Award,
  Image as ImageIcon,
  Megaphone,
  Settings,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/players", label: "Players", icon: UserCircle },
  { href: "/matches", label: "Matches", icon: Swords },
  { href: "/matches/live", label: "Live Scores", icon: BarChart3 },
  { href: "/standings", label: "Standings", icon: BarChart3 },
  { href: "/scorecard", label: "Scorecard", icon: ClipboardList },
  { href: "/awards", label: "Awards", icon: Award },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/announcements", label: "Announcements", icon: Megaphone },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-slate-900 text-white dark:border-slate-700">
      <div className="flex h-16 items-center gap-2 border-b border-slate-700 px-6">
        <Image src={assets.logos.app} alt="" width={28} height={28} />
        <span className="text-lg font-bold">Softball Pro</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
