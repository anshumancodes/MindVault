
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      {/* Logo */}
      <Image src="/mindVault.svg" alt="MindVault Logo" width={200} height={200} className="mb-6" />

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create your free account
      </h1>

      <form className="w-full max-w-sm space-y-4">
        {/* Google Sign In */}
        

        {/* Form Fields */}
        <Input
          required
          type="email"
          placeholder="Enter your email"
          className="rounded-full bg-muted text-sm"
        />
        <Input
          required
          type="text"
          placeholder="Full name"
          className="rounded-full bg-muted text-sm"
        />
        <Input
          required
          type="text"
          placeholder="Username"
          className="rounded-full bg-muted text-sm"
        />
        <Input
          required
          type="password"
          placeholder="Password"
          className="rounded-full bg-muted text-sm"
        />

        <Button type="submit" className="w-full rounded-full bg-black text-white hover:bg-zinc-800">
          Create Account
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex-1 h-px bg-border" />
          or
          <div className="flex-1 h-px bg-border" />
        </div>
        <Button
          type="submit"
          
          className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-400"
        >
          Sign up with Google
        </Button>

        
        
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/user/login" className="underline hover:text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
