import { create } from "zustand";

interface OfferState {
  offer: "Arcade" | "Advanced" | "Pro" | null;
  MofferPrices: {
    Arcade: number;
    Advanced: number;
    Pro: number;
  };
  Mbilling: {
    "Larger storage": number;
    "Customizable profil": number;
    "Online service": number;
  };

  SetChosenOffer: (offer: "Arcade" | "Advanced" | "Pro" | null) => void;
  billing: "Monthly" | "Yearly";
  togglePricing: () => void;
  selectedAddOns: string[]; // Array to store selected add-on keys
  toggleAddOn: (addOnKey: string) => void;
}

export const useOfferState = create<OfferState>((set) => ({
  offer: null,
  billing: "Monthly",
  selectedAddOns: [],
  MofferPrices: {
    Arcade: 9,
    Advanced: 12,
    Pro: 15
  },
  Mbilling: {
    "Larger storage": 2,
    "Customizable profil": 2,
    "Online service": 1
  },

  SetChosenOffer: (offer:"Arcade" | "Advanced" | "Pro" | null) => {
    set({ offer });
  },
  togglePricing: () =>
    set((state) => ({
      billing: state.billing === "Monthly" ? "Yearly" : "Monthly",
    })),
  toggleAddOn: (addOnKey: string) => {
    set((state) => {
      const newSelectedAddOns = [...state.selectedAddOns];
      const index = newSelectedAddOns.indexOf(addOnKey);
      if (index === -1) {
        newSelectedAddOns.push(addOnKey);
      } else {
        newSelectedAddOns.splice(index, 1);
      }
      return { selectedAddOns: newSelectedAddOns };
    });
  },
}));
