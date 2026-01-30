"use client";

import { Stats as StatsType } from "@/types";
import { MessageSquare, Flame, Calendar } from "lucide-react";

interface StatsProps {
  stats: StatsType;
}

export function Stats({ stats }: StatsProps) {
  const memberSince = stats.firstMessageDate
    ? new Date(stats.firstMessageDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Today";

  return (
    <div className="p-4 bg-card rounded-xl border border-border">
      <h3 className="font-semibold mb-3">Stats</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{stats.totalMessages}</p>
            <p className="text-xs text-muted-foreground">Messages</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Flame className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {stats.streak} day{stats.streak !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium">{memberSince}</p>
            <p className="text-xs text-muted-foreground">Member since</p>
          </div>
        </div>
      </div>
    </div>
  );
}
