"use client";

import { Level } from "@/types";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";

interface LevelProgressProps {
  currentLevel: Level;
  nextLevel: Level | null;
  progress: number;
  totalMessages: number;
}

export function LevelProgress({
  currentLevel,
  nextLevel,
  progress,
  totalMessages,
}: LevelProgressProps) {
  const IconComponent = getIcon(currentLevel.icon);

  return (
    <div className="p-4 bg-card rounded-xl border border-border">
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconComponent className="w-6 h-6 text-primary" />
        </motion.div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold">{currentLevel.name}</h3>
            <span className="text-sm text-muted-foreground">
              Lv.{currentLevel.level}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {totalMessages} messages sent
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(progress)}%</span>
          {nextLevel && (
            <span>
              {nextLevel.minMessages - totalMessages} to {nextLevel.name}
            </span>
          )}
          {!nextLevel && <span>Max level!</span>}
        </div>
      </div>
    </div>
  );
}
