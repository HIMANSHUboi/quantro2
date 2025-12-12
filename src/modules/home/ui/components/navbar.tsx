"use client";


import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignInButton,
  SignedOut,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const isScrolled = useScroll();

  return (
    <nav
      className={cn(
        "p-4 fixed left-0 top-0 right-0 z-50 transition-all duration-200 border-b backdrop-blur-md",
        isScrolled
          ? "bg-background/70 border-border"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Quantro" width={24} height={24} />
          <span className="font-semibold text-lg">Quantro</span>
        </Link>

        {/* Auth Buttons */}
        <SignedOut>
          <div className="flex gap-2">
            <SignUpButton>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md transition-all rounded-full"
              >
                Sign up
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 hover:shadow-md transition-all rounded-full"
              >
                Sign in
              </Button>
            </SignInButton>
          </div>
        </SignedOut>

        {/* User Menu */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
