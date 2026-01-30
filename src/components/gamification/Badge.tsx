"use client";

import { Badge as BadgeType } from "@/types";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lock } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface BadgeProps {
  badge: BadgeType;
}

export function Badge({ badge }: BadgeProps) {
  const IconComponent = getIcon(badge.icon);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
              badge.earned
                ? "bg-accent/10 text-accent cursor-default"
                : "bg-muted text-muted-foreground/50 cursor-help"
            )}
            whileHover={{ scale: badge.earned ? 1.1 : 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            {badge.earned ? (
              <IconComponent className="w-7 h-7" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px]">
          <p className="font-medium">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {badge.earned && (
            <p className="text-xs text-accent mt-1">Earned!</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
