import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  SunMoonIcon,
} from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react"; // Added for mounted check

interface Props {
  projectId: string;
}

export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false); // Fix for hydration

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent rendering until client-mounted

  return (
    <header className="p-2 flex justify-between items-center border-b border-green-400/30">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity pl-2"
          >
            <Image
              src="/logo.svg"
              alt="Quantro"
              width={18}
              height={18}
            />
            <span className="text-sm font-medium text-green-400 font-mono ml-2">{project.name}</span>
            <ChevronDownIcon className="ml-1 h-4 w-4 text-green-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          side="bottom" 
          align="start" 
          className="bg-gray-900/95 backdrop-blur-md border border-green-400/30 shadow-lg z-[1000]" // Solid bg, high z-index, developer style
        >
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center gap-2 text-gray-300 font-mono hover:text-green-400">
              <ChevronLeftIcon className="h-4 w-4 text-green-400" />
              <span>Go to dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-green-400/20" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2 text-gray-300 font-mono hover:text-green-400">
              <SunMoonIcon className="size-4 text-green-400" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent 
                className="bg-gray-900/95 backdrop-blur-md border border-green-400/30 shadow-lg z-[1000]" // Same fixes for subcontent
              >
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light" className="text-gray-300 font-mono hover:text-green-400 focus:bg-green-400/10">
                    <span>Light</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" className="text-gray-300 font-mono hover:text-green-400 focus:bg-green-400/10">
                    <span>Dark</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system" className="text-gray-300 font-mono hover:text-green-400 focus:bg-green-400/10">
                    <span>System</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
