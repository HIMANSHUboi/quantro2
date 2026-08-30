"use client";

import Image from "next/image";
import { dark } from "@clerk/themes";
import { PricingTable } from "@clerk/nextjs";

import { useCurrentTheme } from "@/hooks/use-current-theme";

const Page = () => {
  const CurrentTheme = useCurrentTheme();
  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      <section className="space-y-10 pt-[16vh] 2xl:pt-48">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            alt="Quantro"
            width={60}
            height={60}
            className="rounded-2xl hidden md:block"
          />
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Unlock premium features to level up your experience.
          </p>
        </div>

        
        <div className="flex justify-center">
          <PricingTable
            appearance={{
              theme: CurrentTheme === "dark" ? dark : undefined,
              elements: {
                pricingTableCard:
                  "border border-border rounded-xl shadow-sm transition-all hover:shadow-md hover:border-primary",
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Page;
