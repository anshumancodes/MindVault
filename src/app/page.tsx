import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full items-center gap-12">
          {/* Left Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-muted-foreground tracking-tight">
              MindVault
            </h1>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Your AI-Powered Second Brain
            </h2>

            <p className="text-base text-muted-foreground">
              Organize thoughts, ideas, and inspiration with ease.
            </p>

            <div className="space-y-3">
              <Button className="w-full bg-black text-white hover:bg-zinc-800">
                <span className="mr-2 text-lg">🌐</span>
                Continue with Google
              </Button>

              <Link href="/user/signup" passHref legacyBehavior>
                <Button asChild variant="outline" className="w-full">
                  <a>Sign up with Email</a>
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Free to try. No credit card required.
            </p>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex justify-center items-center">
            <div className="border rounded-2xl shadow-sm p-4 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <Image
                src="/logo-large.svg"
                alt="MindVault Logo"
                width={220}
                height={220}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

