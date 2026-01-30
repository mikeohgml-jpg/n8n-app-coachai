"use client";

import { Badge as BadgeType } from "@/types";
import { Badge } from "./Badge";

interface BadgeGridProps {
  badges: BadgeType[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="p-4 bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Badges</h3>
        <span className="text-sm text-muted-foreground">
          {earnedCount}/{badges.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {badges.map((badge) => (
          <Badge key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
