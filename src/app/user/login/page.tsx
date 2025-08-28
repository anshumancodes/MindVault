"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginAction(formData: FormData) {
    setLoading(true);
    setError(null);

    const identifier = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!identifier || !password) return;

   
    const res = await signIn("credentials", {
      redirect: false,
      username: identifier, 
      password,
      callbackUrl: "/mind",
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/mind");
    }
  }

  return (
    <div className="min-h-screen bg-[#191516] flex text-[#FFF8F0]">
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-[#3057AC] rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#FFF8F0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold">MindVault</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-[#FFF8F0]/80">
                Access your AI-powered second brain
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" action={loginAction}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email or username
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email or username"
                  className="h-12 px-4 border-[#3057AC] focus:border-[#399E5A] focus:ring-[#399E5A] bg-transparent text-[#FFF8F0] placeholder-[#FFF8F0]/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#399E5A] hover:text-[#3057AC] font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 px-4 border-[#3057AC] focus:border-[#399E5A] focus:ring-[#399E5A] bg-transparent text-[#FFF8F0] placeholder-[#FFF8F0]/50"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 font-medium">{error}</p>
            )}

            <div className="space-y-4">
              <Button
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r bg-blue-800 hover:opacity-90 text-[#FFF8F0] font-medium rounded-lg transition-colors"
                type="submit"
              >
                {loading ? "Signing in..." : "Sign in to MindVault"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#3057AC]/40" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#191516] text-[#FFF8F0]/70">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                onClick={() => signIn("google", { callbackUrl: "/mind" })}
                variant="outline"
                className="w-full h-12 text-[#191516] flex items-center justify-center gap-3 font-medium rounded-lg transition-colors"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center space-y-4">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/user/signup"
                className="font-medium text-[#399E5A] hover:text-[#3057AC]"
              >
                Create your vault
              </Link>
            </p>
            <p className="text-xs text-[#FFF8F0]/70">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-[#399E5A]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-[#399E5A]">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#3057AC] via-[#399E5A] to-[#FFF8F0] items-center justify-center p-12">
        <div className="max-w-lg text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Your AI-Powered Second Brain</h2>
            <p className="text-lg text-[#FFF8F0]/80">
              Capture, organize, and discover knowledge like never before with
              intelligent insights and seamless workflows.
            </p>
          </div>
          <div className="bg-[#FFF8F0]/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="italic">
              "MindVault has transformed how we organize and access our
              knowledge."
            </p>
            <div className="mt-4 text-sm text-[#FFF8F0]/80">
              — our early users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
