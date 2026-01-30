import { Level, Badge, Stats } from "@/types";

export const LEVELS: Level[] = [
  { level: 1, name: "Rookie", icon: "Seedling", minMessages: 0 },
  { level: 2, name: "Beginner", icon: "PersonStanding", minMessages: 5 },
  { level: 3, name: "Enthusiast", icon: "Dumbbell", minMessages: 10 },
  { level: 4, name: "Dedicated", icon: "Flame", minMessages: 15 },
  { level: 5, name: "Committed", icon: "Star", minMessages: 20 },
  { level: 6, name: "Warrior", icon: "Sword", minMessages: 25 },
  { level: 7, name: "Champion", icon: "Trophy", minMessages: 30 },
  { level: 8, name: "Elite", icon: "Crown", minMessages: 35 },
  { level: 9, name: "Master", icon: "Medal", minMessages: 40 },
  { level: 10, name: "Legend", icon: "Sparkles", minMessages: 45 },
];

export const BADGE_DEFINITIONS: Omit<Badge, "earned" | "earnedAt">[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first chat",
    icon: "Footprints",
  },
  {
    id: "curious-mind",
    name: "Curious Mind",
    description: "Ask about 3 different topics",
    icon: "Brain",
  },
  {
    id: "consistent",
    name: "Consistent",
    description: "Chat 3 days in a row",
    icon: "Calendar",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Chat before 8am",
    icon: "Sunrise",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Chat after 10pm",
    icon: "Moon",
  },
  {
    id: "fitness-scholar",
    name: "Fitness Scholar",
    description: "Reach Level 5",
    icon: "BookOpen",
  },
  {
    id: "dedicated-athlete",
    name: "Dedicated Athlete",
    description: "Reach Level 10",
    icon: "Award",
  },
];

export function getCurrentLevel(totalMessages: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalMessages >= LEVELS[i].minMessages) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(totalMessages: number): Level | null {
  const currentLevel = getCurrentLevel(totalMessages);
  const nextIndex = LEVELS.findIndex((l) => l.level === currentLevel.level) + 1;
  return nextIndex < LEVELS.length ? LEVELS[nextIndex] : null;
}

export function getLevelProgress(totalMessages: number): number {
  const currentLevel = getCurrentLevel(totalMessages);
  const nextLevel = getNextLevel(totalMessages);

  if (!nextLevel) return 100;

  const messagesInCurrentLevel = totalMessages - currentLevel.minMessages;
  const messagesToNextLevel = nextLevel.minMessages - currentLevel.minMessages;

  return Math.min((messagesInCurrentLevel / messagesToNextLevel) * 100, 100);
}

export function checkNewBadges(
  stats: Stats,
  earnedBadges: string[]
): string[] {
  const newBadges: string[] = [];
  const hour = new Date().getHours();

  // First Steps
  if (stats.totalMessages >= 1 && !earnedBadges.includes("first-steps")) {
    newBadges.push("first-steps");
  }

  // Curious Mind
  if (stats.topicsDiscussed.length >= 3 && !earnedBadges.includes("curious-mind")) {
    newBadges.push("curious-mind");
  }

  // Consistent
  if (stats.streak >= 3 && !earnedBadges.includes("consistent")) {
    newBadges.push("consistent");
  }

  // Early Bird
  if (hour < 8 && stats.totalMessages >= 1 && !earnedBadges.includes("early-bird")) {
    newBadges.push("early-bird");
  }

  // Night Owl
  if (hour >= 22 && stats.totalMessages >= 1 && !earnedBadges.includes("night-owl")) {
    newBadges.push("night-owl");
  }

  // Fitness Scholar (Level 5 = 20 messages)
  if (stats.totalMessages >= 20 && !earnedBadges.includes("fitness-scholar")) {
    newBadges.push("fitness-scholar");
  }

  // Dedicated Athlete (Level 10 = 45 messages)
  if (stats.totalMessages >= 45 && !earnedBadges.includes("dedicated-athlete")) {
    newBadges.push("dedicated-athlete");
  }

  return newBadges;
}

export function getBadgesWithStatus(earnedBadgeIds: string[]): Badge[] {
  return BADGE_DEFINITIONS.map((badge) => ({
    ...badge,
    earned: earnedBadgeIds.includes(badge.id),
    earnedAt: earnedBadgeIds.includes(badge.id)
      ? new Date().toISOString()
      : undefined,
  }));
}
