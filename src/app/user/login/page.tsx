"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Mail, Lock } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginAction(formData: FormData) {
    setLoading(true);
    setError(null);

    const identifier = formData.get("identifier")?.toString();
    const password = formData.get("password")?.toString();
    if (!identifier || !password) {
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      emailOrUsername: identifier,
      password,
      callbackUrl: "/mind",
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/mind");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Centered Panel: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-3xl shadow-2xl"
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <Link href="/" className="flex flex-col items-center gap-4 group">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">MindVault</span>
              </Link>
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
                <p className="text-zinc-400 text-sm">
                  Enter your credentials to access your second brain
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" action={loginAction}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-zinc-300 ml-1">
                    Email or Username
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
                    <Input
                      id="email"
                      name="identifier"
                      type="text"
                      placeholder="name@example.com"
                      required
                      className="h-12 pl-10 bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-white placeholder:text-zinc-600 rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password" className="text-sm font-medium text-zinc-300">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-12 pl-10 bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-white placeholder:text-zinc-600 rounded-xl transition-all"
                    />
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-400 font-medium bg-red-400/10 border border-red-400/20 p-3 rounded-lg text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <Button
                  disabled={loading}
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70"
                  type="submit"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Sign in</span>
                      
                    </div>
                  )}
                </Button>

                

                <Button
                  onClick={() => signIn("google", { callbackUrl: "/mind" })}
                  variant="outline"
                  className="w-full h-12 bg-transparent border-zinc-800 hover:bg-zinc-800/50 text-zinc-300 hover:text-white flex items-center justify-center gap-3 font-medium rounded-xl transition-all"
                  type="button"
                >
                <Image alt="google-logo" src={"./google.svg"} width={20} height={20}/>
                 Continue with Google
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-sm text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/user/signup"
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Create your vault
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-zinc-600 font-medium">
        <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
        <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
        <Link href="/help" className="hover:text-zinc-400 transition-colors">Help</Link>
      </div>
    </div>
  );
}
