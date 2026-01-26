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

    const identifier = formData.get("identifier")?.toString();
    const password = formData.get("password")?.toString();
    if (!identifier || !password) return;

    const res = await signIn("credentials", {
      redirect: false,
      emailOrUsername: identifier,
      password,
      callbackUrl: "/mind",
    });

    setLoading(false);

    if (res?.error) {
      console.log(res.error);
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
                  name="identifier"
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
      {/* Right Panel: AI App Preview */}
      {/* Right Panel: AI Chat App Preview */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#3057AC] via-[#399E5A] to-[#191516] items-center justify-center p-8">
        <div className="max-w-md w-full flex flex-col h-[600px] bg-[#191516]/60 border border-[#FFF8F0]/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-[#191516]/80 border-b border-[#FFF8F0]/10 flex items-center justify-between">
            <p className="font-semibold text-[#FFF8F0]">MindVault AI</p>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-[#3057AC] text-white px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-md">
                Summarize today’s notes
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex justify-start">
              <div className="bg-[#399E5A]/80 text-[#FFF8F0] px-4 py-3 rounded-2xl max-w-[80%] text-sm shadow-md">
                Here’s a summary of your notes:
                <ul className="list-disc list-inside mt-2 space-y-1 text-[#FFF8F0]/90">
                  <li>Meeting with design team: focus on new UI.</li>
                  <li>Research paper insights on LLM embeddings.</li>
                  <li>Next sprint goal: improve onboarding flow.</li>
                </ul>
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex items-center gap-2 text-[#FFF8F0]/70 text-sm">
              <div className="w-2 h-2 bg-[#399E5A] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#399E5A] rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-[#399E5A] rounded-full animate-bounce delay-300"></div>
              <span>AI is typing...</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 bg-[#191516]/80 border-t border-[#FFF8F0]/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Message MindVault..."
              className="flex-1 bg-transparent text-sm text-[#FFF8F0] placeholder-[#FFF8F0]/50 focus:outline-none"
            />
            <button className="p-2 rounded-full hover:bg-[#3057AC]/30 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#FFF8F0]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-9.193-5.6A1 1 0 004 6.4v11.2a1 1 0 001.559.832l9.193-5.6a1 1 0 000-1.664z"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-[#3057AC]/30 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#FFF8F0]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
