import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { assets } from "@/assets";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white">
      <Image
        src={assets.banners.hero}
        alt="Softball pitcher at sunset"
        fill
        priority
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/50 to-slate-900/90" />
      <div className="absolute inset-0 bg-emerald-950/20" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <nav className="flex items-center justify-between px-6 py-6 md:px-10">
          <div className="flex items-center gap-3">
            <Image src={assets.logos.app} alt="" width={40} height={40} className="drop-shadow-lg" />
            <span className="text-xl font-bold tracking-tight drop-shadow-md">Softball Pro</span>
          </div>
          <Link href="/login">
            <Button className="shadow-lg">Sign In</Button>
          </Link>
        </nav>

        <section className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-8 text-center md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300 drop-shadow">
            Championship-ready platform
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
            Softball Tournament
            <span className="mt-2 block text-emerald-400">Management System</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 drop-shadow-md md:text-xl">
            Organize tournaments, track live scores, manage teams and players, and publish
            standings — all in one place.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="min-w-[160px] shadow-xl">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[160px] border-white/80 bg-white/10 text-white shadow-lg backdrop-blur hover:bg-white/20"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid w-full max-w-5xl gap-4 px-6 pb-12 md:grid-cols-2 lg:grid-cols-4 md:px-10">
          {[
            { icon: Trophy, title: "Tournaments", desc: "Create and manage multi-team tournaments", href: "/tournaments" },
            { icon: BarChart3, title: "Live Scores", desc: "Real-time scorecards and inning tracking", href: "/matches/live" },
            { icon: Users, title: "Teams & Players", desc: "Roster management with player stats", href: "/teams" },
            { icon: Calendar, title: "Scheduling", desc: "Match fixtures and venue management", href: "/matches" },
          ].map(({ icon: Icon, title, desc, href }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-xl border border-white/15 bg-slate-900/40 p-5 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <Icon className="mb-3 h-7 w-7 text-emerald-400 transition group-hover:scale-110" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-300">{desc}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
