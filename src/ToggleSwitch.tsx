// PricingToggle.tsx
import React from "react";
import { useOfferState } from "./Zustand/store"; // import the store

const PricingToggle: React.FC = () => {
  // Use Zustand store to access the pricing plan and toggle function
  const { billing, togglePricing } = useOfferState();

  return (
    <div className="flex bg-Alabaster items-center justify-center py-2 space-x-5 text-sm font-semibold rounded-lg">
      <p
        className={`
            ${billing === "Yearly" ? "text-grayCo" : ""}
          }`}
      >
        Monthly
      </p>
      <button
        onClick={togglePricing}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-blueMa`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            billing === "Yearly" ? "translate-x-6" : ""
          }`}
        ></span>
      </button>
      <p
        className={`
            ${billing === "Monthly" ? "text-grayCo" : ""}
          }`}
      >
        Yearly
      </p>
    </div>
  );
};

export default PricingToggle;
