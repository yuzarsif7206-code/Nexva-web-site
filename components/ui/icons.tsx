import {
  Camera,
  ChartLine,
  Clapperboard,
  Globe,
  Megaphone,
  Palette,
  PenTool,
  Plane,
  Printer,
  Share2,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/services";

// Statik ikon eşlemesi (dinamik string import yok, ağaç sallama korunur)
export const iconMap: Record<IconName, LucideIcon> = {
  Clapperboard,
  Plane,
  Camera,
  Megaphone,
  Palette,
  PenTool,
  Printer,
  Share2,
  Globe,
  ChartLine,
  Video,
};

export { InstagramIcon, WhatsAppIcon } from "./brand-icons";
