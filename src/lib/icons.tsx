import {
  Sprout,
  User,
  Dumbbell,
  Flame,
  Star,
  Swords,
  Trophy,
  Crown,
  Medal,
  Sparkles,
  Activity,
  Brain,
  Calendar,
  Sunrise,
  Moon,
  BookOpen,
  Award,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Seedling: Sprout,
  Sprout,
  PersonStanding: User,
  User,
  Dumbbell,
  Flame,
  Star,
  Sword: Swords,
  Swords,
  Trophy,
  Crown,
  Medal,
  Sparkles,
  Footprints: Activity,
  Activity,
  Brain,
  Calendar,
  Sunrise,
  Moon,
  BookOpen,
  Award,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Star;
}
