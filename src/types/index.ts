export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "delivered"
  | "rejected"
  | "cancelled"
  | "failed";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceTiyin: number;
  imageUrl?: string;
  isAvailable: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  imageUrl?: string;
  isOpen: boolean;
  avgPrepMinutes: number;
  minOrderTiyin: number;
  rating: number;
  categories: string[];
  menu: MenuItem[];
}

export interface CartItem {
  menuItemId: string;
  restaurantId: string;
  name: string;
  unitPriceTiyin: number;
  quantity: number;
  imageUrl?: string;
}

export interface OrderItemSnapshot {
  name: string;
  unitPriceTiyin: number;
  quantity: number;
  lineTotalTiyin: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  status: OrderStatus;
  items: OrderItemSnapshot[];
  subtotalTiyin: number;
  deliveryFeeTiyin: number;
  totalTiyin: number;
  deliveryAddress: string;
  deliveryPhone: string;
  deliveryNotes: string;
  placedAt: string;
  updatedAt: string;
}

export interface CheckoutForm {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}
