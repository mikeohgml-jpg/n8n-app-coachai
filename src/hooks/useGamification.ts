"use client";

import { useState, useEffect, useCallback } from "react";
import { Stats, Badge, Level } from "@/types";
import { getStoredData, earnBadge } from "@/lib/storage";
import {
  getCurrentLevel,
  getNextLevel,
  getLevelProgress,
  checkNewBadges,
  getBadgesWithStatus,
  LEVELS,
} from "@/lib/gamification";

export function useGamification(stats: Stats) {
  // Initialize with default values to avoid hydration mismatch
  const [currentLevel, setCurrentLevel] = useState<Level>(LEVELS[0]);
  const [nextLevel, setNextLevel] = useState<Level | null>(LEVELS[1]);
  const [progress, setProgress] = useState<number>(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [previousLevel, setPreviousLevel] = useState<number>(1);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize badges from localStorage
  useEffect(() => {
    if (!mounted) return;
    const data = getStoredData();
    setEarnedBadges(data.badges);
    setBadges(getBadgesWithStatus(data.badges));
  }, [mounted]);

  // Update level and progress when stats change
  useEffect(() => {
    if (!mounted) return;

    const newCurrentLevel = getCurrentLevel(stats.totalMessages);
    const newNextLevel = getNextLevel(stats.totalMessages);
    const newProgress = getLevelProgress(stats.totalMessages);

    // Check for level up
    if (newCurrentLevel.level > previousLevel && previousLevel > 0) {
      setShowLevelUp(true);
    }

    setCurrentLevel(newCurrentLevel);
    setNextLevel(newNextLevel);
    setProgress(newProgress);
    setPreviousLevel(newCurrentLevel.level);
  }, [stats.totalMessages, previousLevel, mounted]);

  // Check for new badges when stats change
  useEffect(() => {
    if (!mounted) return;

    const newBadges = checkNewBadges(stats, earnedBadges);

    if (newBadges.length > 0) {
      // Earn all new badges
      newBadges.forEach((badgeId) => {
        earnBadge(badgeId);
      });

      // Update local state
      const updatedEarnedBadges = [...earnedBadges, ...newBadges];
      setEarnedBadges(updatedEarnedBadges);
      setBadges(getBadgesWithStatus(updatedEarnedBadges));

      // Show notification for the first new badge
      const badgeDef = getBadgesWithStatus(updatedEarnedBadges).find(
        (b) => b.id === newBadges[0]
      );
      if (badgeDef) {
        setNewBadge(badgeDef);
      }
    }
  }, [stats, earnedBadges, mounted]);

  const dismissLevelUp = useCallback(() => {
    setShowLevelUp(false);
  }, []);

  const dismissBadge = useCallback(() => {
    setNewBadge(null);
  }, []);

  return {
    currentLevel,
    nextLevel,
    progress,
    badges,
    showLevelUp,
    newBadge,
    dismissLevelUp,
    dismissBadge,
    stats,
  };
}
