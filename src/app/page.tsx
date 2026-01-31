"use client";

import { useState, useEffect } from "react";
import { ChatContainer } from "@/components/chat";
import { GamificationPanel } from "@/components/gamification";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { Stats } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dumbbell, Trophy, ChevronUp, Loader2, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    firstMessageDate: null,
    lastMessageDate: null,
    streak: 0,
    topicsDiscussed: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during hydration
  if (!mounted || authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-primary-foreground" />
          </div>
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Dumbbell className="w-4 h-4 text-primary-foreground" />
          </motion.div>
          <h1 className="text-lg font-semibold">CoachAI</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile: Gamification drawer trigger */}
          <div className="md:hidden">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Lv.{Math.floor(stats.totalMessages / 5) + 1}</span>
                  <ChevronUp className="w-3 h-3" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85vh]">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-3" />
                <GamificationPanel stats={stats} />
              </DrawerContent>
            </Drawer>
          </div>

          <ThemeToggle />

          {/* Logout button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section */}
        <main className="flex-1 md:w-[70%]">
          <ChatContainer onStatsChange={setStats} />
        </main>

        {/* Desktop: Gamification Sidebar */}
        <aside className="hidden md:block w-[30%] max-w-[320px] border-l border-border bg-card/30">
          <GamificationPanel stats={stats} />
        </aside>
      </div>
    </div>
  );
}
