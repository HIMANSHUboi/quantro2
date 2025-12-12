"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TabsTrigger, Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { MessagesContainer } from "../components/messages-container";
import { Suspense, useState, useEffect } from "react";
import { Fragment } from "@/generated/prisma";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { CodeIcon, EyeIcon, StarIcon, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileExplorer } from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

// Array of code chars for floating effect
const CODE_CHARS = ["{}", "[]", "()", "=>", "const", "let", "var", "if", "for"];

// Floating developer code symbols background
const FloatingCodeElements = () => {
  const [elements, setElements] = useState<
    Array<{ id: number; x: number; y: number; char: string; opacity: number }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElements((prev) => {
        const newElements = prev
          .map((el) => ({
            ...el,
            y: el.y + 0.5,
            opacity: el.opacity - 0.002,
          }))
          .filter((el) => el.opacity > 0);
        // Add new ones sometimes (client-side only)
        if (typeof window !== "undefined" && Math.random() < 0.1) {
          newElements.push({
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: 0,
            char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
            opacity: 0.3,
          });
        }
        return newElements;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute text-green-400 font-mono text-xs"
          style={{
            left: el.x,
            top: el.y,
            opacity: el.opacity,
            textShadow: "0 0 3px #22c55e",
          }}
        >
          {el.char}
        </div>
      ))}
    </div>
  );
};

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const{ has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen relative overflow-hidden bg-gray-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_60%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.03),transparent_50%)]" />
      {/* Floating code */}
      <FloatingCodeElements />
      {/* SVG pattern overlay */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Ctext x='5' y='15' font-family='monospace' font-size='6'%3E%7B%7D%3C/text%3E%3Ctext x='25' y='35' font-family='monospace' font-size='6'%3E()%3C/text%3E%3Ctext x='45' y='55' font-family='monospace' font-size='6'%3E[]%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <ResizablePanelGroup direction="horizontal">
            {/* Messages Panel */}
            <ResizablePanel
              defaultSize={35}
              minSize={20}
              className="flex flex-col min-h-0"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-full flex flex-col bg-gray-900/40 backdrop-blur-md border-r border-green-400/20"
              >
                <Suspense
                  fallback={
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 font-mono text-green-400">
                        <Terminal className="w-4 h-4 animate-pulse" />
                        <span>Loading project...</span>
                      </div>
                    </div>
                  }
                >
                  <ProjectHeader projectId={projectId} />
                </Suspense>

                <Suspense
                  fallback={
                    <div className="p-4 text-center flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2 font-mono text-green-400">
                        <Terminal className="w-4 h-4 animate-pulse" />
                        <span>Loading messages...</span>
                      </div>
                    </div>
                  }
                >
                  <MessagesContainer
                    projectId={projectId}
                    activeFragment={activeFragment}
                    setActiveFragment={setActiveFragment}
                  />
                </Suspense>
              </motion.div>
            </ResizablePanel>

            {/* Split Handle */}
            <ResizableHandle className="hover:bg-green-400/30 transition-colors bg-green-400/10 w-1" />

            {/* Preview/Code Panel */}
            <ResizablePanel defaultSize={65} minSize={50}>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full bg-gray-900/40 backdrop-blur-md"
              >
                <Tabs
                  className="h-full gap-y-0"
                  defaultValue="preview"
                  value={tabState}
                  onValueChange={(value) =>
                    setTabState(value as "preview" | "code")
                  }
                >
                  {/* Tab Header */}
                  <div className="w-full flex items-center p-3 border-b border-green-400/20 bg-gray-900/60 backdrop-blur-md">
                    <TabsList className="h-9 p-1 border border-green-400/30 rounded-lg bg-gray-800/80 backdrop-blur-md">
                      <TabsTrigger
                        value="preview"
                        className="rounded-md font-mono text-sm data-[state=active]:bg-green-900/80 data-[state=active]:text-green-300 text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        <span>Preview</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="code"
                        className="rounded-md font-mono text-sm data-[state=active]:bg-green-900/80 data-[state=active]:text-green-300 text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <CodeIcon className="w-4 h-4 mr-2" />
                        <span>Code</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="ml-auto flex items-center gap-x-3">
                      <Link href="/pricing">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {!hasProAccess &&(
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-mono shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                          >
                            <StarIcon className="w-4 h-4 mr-1" />
                            <span>Upgrade</span>
                          </Button>
                          )}
                        </motion.div>
                      </Link>
                      <UserControl />
                    </div>
                  </div>

                  <TabsContent value="preview" className="h-full m-0 p-0">
                    <div className="h-full flex items-center justify-center">
                      {!!activeFragment ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                        >
                          <FragmentWeb data={activeFragment} />
                        </motion.div>
                      ) : (
                        <div className="text-center p-8">
                          <div className="mb-4">
                            <EyeIcon className="w-12 h-12 mx-auto text-green-400/50 mb-3" />
                          </div>
                          <p className="text-gray-400 font-mono text-sm">
                            Select a fragment to preview
                          </p>
                          <div className="mt-2 text-xs text-green-400/60 font-mono">
                            {"// Choose from the messages panel"}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="code" className="min-h-0 m-0 p-0 h-full">
                    {!!activeFragment?.files ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <FileExplorer
                          files={activeFragment.files as {
                            [path: string]: string;
                          }}
                        />
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="mb-4">
                            <CodeIcon className="w-12 h-12 mx-auto text-green-400/50 mb-3" />
                          </div>
                          <p className="text-gray-400 font-mono text-sm">
                            No code files available
                          </p>
                          <div className="mt-2 text-xs text-green-400/60 font-mono">
                            {"// Generate content first"}
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </motion.div>
      </div>
    </div>
  );
};
