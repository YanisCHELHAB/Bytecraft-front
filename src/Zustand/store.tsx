import { create } from "zustand";

interface OfferState {
  offer: string | null;
  SetChosenOffer: (offer: string) => void;
  billing: 'monthly' | 'yearly';
  togglePricing: () => void;
  selectedAddOns: string[]; // Array to store selected add-on keys
  toggleAddOn: (addOnKey: string) => void;
  
}

export const useOfferState = create<OfferState>((set) => ({
  offer: null,
  billing: "monthly",
  selectedAddOns: [],

  SetChosenOffer: (offer: string) => {
    set({ offer });
  },
  togglePricing: () => set((state) => ({
    billing: state.billing === 'monthly' ? 'yearly' : 'monthly'
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