export const FOOD_CATEGORIES = [
  { id: "all", label: "Hammasi", icon: "\u{1F37D}\uFE0F" },
  { id: "Palov", label: "Palov", icon: "\u{1F35A}" },
  { id: "Lavash", label: "Lavash", icon: "\u{1F959}" },
  { id: "Shashlik", label: "Shashlik", icon: "\u{1F362}" },
  { id: "Somsa", label: "Somsa", icon: "\u{1F95F}" },
  { id: "Salatlar", label: "Salatlar", icon: "\u{1F957}" },
  { id: "Ichimliklar", label: "Ichimliklar", icon: "\u{1F964}" },
] as const;

export type CategoryId = (typeof FOOD_CATEGORIES)[number]["id"];
