"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressState {
  address: string;
  setAddress: (address: string) => void;
}

export const useAddress = create<AddressState>()(
  persist(
    (set) => ({
      address: "Sariosiyo markaz",
      setAddress: (address) => set({ address }),
    }),
    { name: "sarigo-address" }
  )
);
