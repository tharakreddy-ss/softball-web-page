"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/assets";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    const body = isRegister ? form : { email: form.email, password: form.password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-emerald-950 p-4">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <Image src={assets.logos.app} alt="Softball Pro" width={48} height={48} className="mx-auto" />
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-slate-500">Softball Tournament System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <Input
              label="Full Name"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <Input
            label="Email"
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Sign In"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="font-medium text-emerald-600 hover:underline"
          >
            {isRegister ? "Sign in" : "Register"}
          </button>
        </p>

        <p className="mt-2 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
            ← Back to home
          </Link>
        </p>
      </Card>
    </div>
  );
}
