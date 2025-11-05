"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  async function signupAction(formData: FormData) {
    const name = formData.get("name")?.toString();
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !username || !email || !password) return;

    const res = await fetch("/api/v1/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    });

    if (res.ok) {
      redirect("/mind");
    } else {
      console.error("Signup failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#191516]  text-[#FFF8F0] flex">
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-[#3057AC] rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5  text-[#FFF8F0]"
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
              <h1 className="text-3xl font-bold">Create your vault</h1>
              <p className="text-gray-300">
                Start building your AI-powered second brain
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" action={signupAction}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-12 px-4 border-gray-600 bg-[#191516]  text-[#FFF8F0] placeholder-gray-400 focus:border-[#3057AC] focus:ring-[#3057AC]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a unique username"
                  className="h-12 px-4 border-gray-600 bg-[#191516]  text-[#FFF8F0] placeholder-gray-400 focus:border-[#3057AC] focus:ring-[#3057AC]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 px-4 border-gray-600 bg-[#191516]  text-[#FFF8F0] placeholder-gray-400 focus:border-[#3057AC] focus:ring-[#3057AC]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="h-12 px-4 border-gray-600 bg-[#191516]  text-[#FFF8F0] placeholder-gray-400 focus:border-[#3057AC] focus:ring-[#3057AC]"
                  required
                />
                <p className="text-xs text-gray-400">
                  Must be at least 8 characters with letters and numbers
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full h-12 bg-[#3057AC] text-[#FFF8F0] font-medium rounded-lg hover:bg-[#3057ace5]"
                type="submit"
              >
                Create your MindVault
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#191516] text-gray-400">
                    Or sign up with
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
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                href="/user/login"
                className="font-medium text-[#3057AC] hover:text-[#25447f]"
              >
                Sign in
              </Link>
            </p>

            <p className="text-xs text-gray-400">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-[#3057AC]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-[#3057AC]">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#191516] via-[#232027] to-[#3057AC] text-[#FFF8F0] items-center justify-center p-12">
        <div className="max-w-lg text-center space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Build your AI-powered second brain
              </h2>
            </div>

            <div className="space-y-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#399E5A] rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4  text-[#FFF8F0]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">AI-Powered Organization</h3>
                  <p className="text-gray-400 text-sm">
                    Smart categorization that learns from your habits
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#399E5A] rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4  text-[#FFF8F0]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Visual Knowledge Maps</h3>
                  <p className="text-gray-400 text-sm">
                    See connections between your ideas instantly
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#399E5A] rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4  text-[#FFF8F0]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Instant Search & Discovery</h3>
                  <p className="text-gray-400 text-sm">
                    Find any piece of knowledge in seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
