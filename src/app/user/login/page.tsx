import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    "use server";

    const identifier = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!identifier || !password) return;

    const res = await fetch("/api/v1/user/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: identifier,
        username: identifier,
        password,
      }),
    });

    if (res.ok) {
      // will set cookies/session here later 
      redirect("/dashboard"); // server redirect on sucessful login 
    } else {
      console.error("Invalid credentials");
    }
  }
  return (
    <div className="min-h-screen flex">
      {/* Left Panel: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <img src="/logo.svg" alt="logo" className="w-6 h-6" />
              MindVault
            </div>
          </div>

          <form className="space-y-4" action={loginAction}>
            <div>
              <Label htmlFor="email">Email or username</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email or username"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <Button className="w-full" type="submit">
              Login
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              type="button"
            >
              Login with Google
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel: Image or Branding */}
      <div className="hidden md:block w-1/2 bg-muted">
        <div className="h-full flex items-center justify-center p-8">
          <img
            src="/logo-large.svg"
            alt="MindVault"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
