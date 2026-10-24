export const FOOD_CATEGORIES = [
  { id: "all", label: "Hammasi" },
  { id: "Palov", label: "Palov" },
  { id: "Lavash", label: "Lavash" },
  { id: "Shashlik", label: "Shashlik" },
  { id: "Somsa", label: "Somsa" },
  { id: "Salatlar", label: "Salatlar" },
  { id: "Ichimliklar", label: "Ichimliklar" },
] as const;

export type CategoryId = (typeof FOOD_CATEGORIES)[number]["id"];
