import React from "react";
import { useOfferState } from "./Zustand/store";

type Cards = {
  icon: string;
  title: string;
  price: number;
  onClick: () => void;
  selected: boolean;
};

const Cards = ({ icon, title, price, onClick, selected }: Cards) => {
  const { billing } = useOfferState();
  return (
    <div
      onClick={onClick}
      className={`flex flex-1 sm:flex-col max-sm:space-x-4 max-sm:h-5 border w-32 max-sm:w-full border-grayLi py-3 rounded-md max-sm:items-center items-start pl-4  cursor-pointer hover:bg-Alabaster
        ${selected ? "bg-Alabaster border-x-bluePur border-y-bluePur " : ""}
      `}
    >
      <img src={icon} className="h-9 max-sm:h-6 mb-9"></img>
      <div className="">
        <p className="font-semibold text-blueMa">{title}</p>
        <p className="text-grayCo text-sm">
          ${price}
          {billing == "Monthly" ? "/mo" : "/yr"}
        </p>
        {billing === "Yearly" && (
          <p className="text-blueMa text-xs">2 months free</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
