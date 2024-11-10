import React from "react";
import { useOfferState } from "./Zustand/store";

type Check = {
  title: string;
  description: string;
  price: number;
  checkboxKey: string;
};

const CheckboxCard = ({
  title,
  description,
  price,
  checkboxKey
}: Check) => {

  const { toggleAddOn, selectedAddOns,billing } = useOfferState();
  const isChecked = selectedAddOns.includes(checkboxKey);


  const handleCheck = () => {
     console.log(isChecked)
    toggleAddOn(checkboxKey);
   
  };

  return (
    <div
      className={`flex items-center justify-between border border-gray-300 rounded-md p-4 mb-4 cursor-pointer hover:bg-Alabaster  ${
        isChecked ? "bg-Alabaster border-x-bluePur border-y-bluePur border-1" : ""
      }`}
      onClick={handleCheck}
    >
      <div className="flex items-center space-x-4 ">
        <div
          className={`h-5 w-5 bg-white border-grayLi border rounded-md flex items-center justify-center ${
            isChecked ? "bg-bluePur border-none" : ""
          }`}
        >
          {isChecked && <img src="../public/assets/images/icon-checkmark.svg" alt="" />}
        </div>
        <div>
          <p className="text-base font-normal text-blueMa">{title}</p>
          <p className="text-sm text-grayCo">{description}</p>
        </div>
      </div>
      <p className="text-xs  text-bluePur">+${price}{billing==="Monthly" ? "/mo" : "/yr" }</p>
    </div>
  );
};

export default CheckboxCard;