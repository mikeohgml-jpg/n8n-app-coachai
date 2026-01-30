"use client";

import { Stats as StatsType } from "@/types";
import { useGamification } from "@/hooks/useGamification";
import { LevelProgress } from "./LevelProgress";
import { BadgeGrid } from "./BadgeGrid";
import { Stats } from "./Stats";
import { LevelUpModal } from "./LevelUpModal";

interface GamificationPanelProps {
  stats: StatsType;
}

export function GamificationPanel({ stats }: GamificationPanelProps) {
  const {
    currentLevel,
    nextLevel,
    progress,
    badges,
    showLevelUp,
    dismissLevelUp,
  } = useGamification(stats);

  return (
    <>
      <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto custom-scrollbar">
        <LevelProgress
          currentLevel={currentLevel}
          nextLevel={nextLevel}
          progress={progress}
          totalMessages={stats.totalMessages}
        />

        <BadgeGrid badges={badges} />

        <Stats stats={stats} />
      </div>

      <LevelUpModal
        isOpen={showLevelUp}
        level={currentLevel}
        onClose={dismissLevelUp}
      />
    </>
  );
}
