/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import Cards from "./Cards";
import { useOfferState } from "./Zustand/store";
import PricingToggle from "./ToggleSwitch";
import CheckboxCard from "./Checkbox";

const Settings = () => {
  const schema = z.object({
    name: z.string().min(3),

    email: z.string().email(),
    num: z
      .string()
      .min(1, { message: "Field is required" })
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Invalid phone number format",
      }),
  });
  type FormFields = z.infer<typeof schema>;

  const [step, setStep] = useState("1");

  const {
    register,
    handleSubmit,
    trigger,
    reset,

    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  const next = async () => {
    const isPage1Valid = await trigger(["name", "email", "num"]);
    switch (step) {
      case "1":
        if (isPage1Valid) {
          setStep("2");
        }
        break;
      case "2":
        setStep("3");
        break;
      case "3":
        setStep("4");
        break;
      case "4":
        setStep("5");
        break;
    }
  };
  const {
    offer,
    SetChosenOffer,
    billing,
    MofferPrices,
    Mbilling,
    selectedAddOns,
  } = useOfferState();

  const handleCardClick = (
    selectedOffer: "Arcade" | "Advanced" | "Pro" | null
  ) => {
    SetChosenOffer(selectedOffer);
  };
  const pricing = () => {
    if (billing === "Monthly") {
      return `$${MofferPrices[offer]}/mo`;
    }
    return `$${MofferPrices[offer] * 10}/yr`;
  };
  const Total = () => {
    let count = 0;
    selectedAddOns.forEach((add) => {
      count += Mbilling[add as keyof typeof Mbilling];
    });
    if (billing === "Monthly") {
      return `$${MofferPrices[offer] + count}/mo`;
    }
    return `$${(MofferPrices[offer] + count) * 10}/yr`;
  };
  const onSubmitWrapper = () => {
    const onSubmit: SubmitHandler<FormFields> = async () => {
      console.log("jioahoa");
    };
  };

  function back() {
    switch (step) {
      case "2":
        setStep("1");
        break;
      case "3":
        setStep("2");
        break;
      case "4":
        setStep("3");
        break;
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blueLi">
      <section className=" w-[60vw] rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex   ">
        <div className=" m-3  relative  ">
          <img src="public/assets/images/bg-sidebar-desktop.svg" />
          <div className="flex flex-col my-10 pl-8 text-white absolute top-0 ">
            <div className="flex items-center mb-5">
              <svg
                version="1.1"
                className={` h-8 mr-2 text-white fill-current  ${
                  step === "1" ? " bg-blueLi rounded-full text-blue-900 " : ""
                } `}
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 122.88"
              >
                <g>
                  <path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M75.59,36.31v50.27H61.72V53.68c-2.24,1.7-4.42,3.07-6.53,4.12 c-2.11,1.05-4.74,2.06-7.91,3.02V49.63c4.67-1.52,8.31-3.34,10.89-5.45c2.59-2.13,4.61-4.75,6.08-7.87H75.59L75.59,36.31z M100.75,22.13C90.69,12.07,76.79,5.85,61.44,5.85c-15.35,0-29.25,6.22-39.31,16.28C12.07,32.19,5.85,46.09,5.85,61.44 c0,15.35,6.22,29.25,16.28,39.31c10.06,10.06,23.96,16.28,39.31,16.28c15.35,0,29.25-6.22,39.31-16.28 c10.06-10.06,16.28-23.96,16.28-39.31C117.03,46.09,110.81,32.19,100.75,22.13L100.75,22.13z" />
                </g>
              </svg>
              <div className="flex flex-col  ">
                <p
                  className={`  max-md:pl-3 text-sm text-grayCo`}
                >
                  STEP 1
                </p>
                <p className={`max-md:pl-3  text-sm  `}>YOUR INFO</p>
              </div>
            </div>
            <div className="flex items-center mb-5">
              <svg
                version="1.1"
                className={` h-8 mr-2 text-white fill-current  ${
                  step === "2" ? " bg-blueLi text-blue-900 rounded-full  " : ""
                } `}
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 122.88"
              >
                <g>
                  <path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M82.15,86.69H40.73c0.47-4.08,1.92-7.93,4.32-11.53c2.41-3.61,6.91-7.86,13.53-12.77 c4.05-3.01,6.64-5.28,7.78-6.85c1.13-1.56,1.7-3.04,1.7-4.44c0-1.51-0.56-2.81-1.68-3.89c-1.12-1.08-2.53-1.61-4.23-1.61 c-1.76,0-3.2,0.56-4.32,1.67c-1.12,1.12-1.87,3.08-2.25,5.9l-13.81-1.12c0.54-3.9,1.54-6.93,2.98-9.11 c1.45-2.19,3.48-3.85,6.1-5.02c2.64-1.17,6.28-1.75,10.93-1.75c4.86,0,8.63,0.55,11.33,1.67c2.69,1.1,4.82,2.8,6.36,5.09 c1.55,2.3,2.32,4.87,2.32,7.71c0,3.02-0.89,5.91-2.66,8.67c-1.77,2.75-5,5.78-9.68,9.08c-2.78,1.92-4.64,3.27-5.57,4.04 c-0.94,0.77-2.04,1.77-3.31,3.02h21.56V86.69L82.15,86.69z M100.75,22.13C90.69,12.07,76.79,5.85,61.44,5.85 c-15.35,0-29.25,6.22-39.31,16.28C12.07,32.19,5.85,46.09,5.85,61.44c0,15.35,6.22,29.25,16.28,39.31 c10.06,10.06,23.96,16.28,39.31,16.28c15.35,0,29.25-6.22,39.31-16.28c10.06-10.06,16.28-23.96,16.28-39.31 C117.03,46.09,110.81,32.19,100.75,22.13L100.75,22.13z" />
                </g>
              </svg>
              <div className="flex flex-col  ">
                <p
                  className={`  max-md:pl-3 text-sm text-grayCo `}
                >
                  STEP 2
                </p>
                <p className={`  max-md:pl-3  text-sm  `}>SELECT PLAN</p>
              </div>
            </div>
            <div className="flex items-center mb-5 ">
              <svg
                version="1.1"
                className={` h-8 mr-2 text-white fill-current  ${
                  step === "3" ? " bg-blueLi rounded-full text-blue-900 " : ""
                } `}
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 122.88"
              >
                <g>
                  <path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M54.83,51.45l-12.88-2.29c1.07-4.1,3.12-7.24,6.16-9.43c3.04-2.18,7.34-3.28,12.9-3.28 c6.39,0,11,1.19,13.86,3.57c2.84,2.39,4.27,5.39,4.27,9c0,2.11-0.58,4.03-1.74,5.74c-1.15,1.71-2.89,3.22-5.22,4.51 c1.89,0.47,3.34,1.02,4.34,1.64c1.63,1,2.89,2.33,3.79,3.96c0.9,1.64,1.36,3.6,1.36,5.87c0,2.85-0.74,5.59-2.24,8.22 c-1.5,2.61-3.64,4.63-6.45,6.05c-2.81,1.42-6.5,2.12-11.07,2.12c-4.45,0-7.97-0.53-10.54-1.58c-2.58-1.05-4.69-2.58-6.36-4.6 c-1.66-2.02-2.93-4.57-3.82-7.63l13.63-1.82c0.54,2.75,1.36,4.67,2.49,5.73c1.12,1.06,2.55,1.6,4.29,1.6 c1.82,0,3.33-0.67,4.55-2.01c1.21-1.34,1.82-3.12,1.82-5.35c0-2.27-0.58-4.03-1.75-5.29c-1.16-1.24-2.75-1.87-4.75-1.87 c-1.06,0-2.53,0.26-4.4,0.8l0.71-9.74c0.74,0.11,1.32,0.17,1.75,0.17c1.76,0,3.23-0.57,4.41-1.7s1.77-2.47,1.77-4.02 c0-1.5-0.45-2.68-1.32-3.56c-0.89-0.89-2.11-1.34-3.65-1.34c-1.6,0-2.89,0.48-3.89,1.45C55.86,47.35,55.18,49.04,54.83,51.45 L54.83,51.45z M100.75,22.13C90.69,12.07,76.79,5.85,61.44,5.85c-15.35,0-29.25,6.22-39.31,16.28 C12.07,32.19,5.85,46.09,5.85,61.44c0,15.35,6.22,29.25,16.28,39.31c10.06,10.06,23.96,16.28,39.31,16.28 c15.35,0,29.25-6.22,39.31-16.28c10.06-10.06,16.28-23.96,16.28-39.31C117.03,46.09,110.81,32.19,100.75,22.13L100.75,22.13z" />
                </g>
              </svg>
              <div className="flex flex-col  ">
                <p
                  className={`  max-md:pl-3 text-sm text-grayCo  `}
                >
                  STEP 3
                </p>
                <p className={`  max-md:pl-3  text-sm `}>ADD-ONS</p>
              </div>
            </div>
            <div
              className="flex items-center mb-5 "
              
            >
              <svg
                version="1.1"
                className={` h-8 mr-2 text-white fill-current  ${
                  step === "4" || step === "5" ? " bg-blueLi rounded-full text-blue-900 " : ""
                } `}
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 122.88"
              >
                <g>
                  <path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M64.9,77.74H39.58V66.3L64.9,36.19H77v30.78h6.3v10.77H77v9.37H64.9V77.74L64.9,77.74z M64.9,66.96V51.16L51.53,66.96H64.9L64.9,66.96z M100.75,22.13C90.69,12.07,76.79,5.85,61.44,5.85 c-15.35,0-29.25,6.22-39.31,16.28C12.07,32.19,5.85,46.09,5.85,61.44c0,15.35,6.22,29.25,16.28,39.31 c10.06,10.06,23.96,16.28,39.31,16.28c15.35,0,29.25-6.22,39.31-16.28c10.06-10.06,16.28-23.96,16.28-39.31 C117.03,46.09,110.81,32.19,100.75,22.13L100.75,22.13z" />
                </g>
              </svg>
              <div className="flex flex-col  ">
                <p
                  className={` max-md:pl-3 text-sm text-grayCo`}
                >
                  STEP 4
                </p>
                <p className={` max-md:pl-3  text-sm  `}>SUMMARY</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" my-12 flex-[3] px-20 relative ">
          <form
            className="flex flex-col text-blueMa font-normal"
            onSubmit={handleSubmit(onSubmit)}
          >
            {step === "1" && (
              <div className=" ">
                <div>
                  <p className="mb-1  block text-3xl font-bold text-blueMa">
                    Personal info
                  </p>
                  <p className="text-grayCo">
                    Please provide your name, email address, and phone number.
                  </p>
                </div>
                <div className="space-y-4 flex flex-col mt-8">
                  <div className="">
                    <div className="flex justify-between">
                      <label className=" text-sm text-greytext font-body">
                        Name
                      </label>
                      {errors.name && (
                        <p className="text-red-600 text-sm pt-1 px-1">
                          {"Insert your name"}
                        </p>
                      )}
                    </div>
                    <input
                      {...register("name")}
                      type="text"
                      className=" w-full  mt-1 bg-white border border-grayCo rounded-md py-2 px-4 font-medium"
                      placeholder="e.g. Stephen King"
                    />
                  </div>

                  <div className="">
                    <div className="flex justify-between">
                      <label className=" text-sm text-greytext font-body">
                        Email Address
                      </label>
                      {errors.email && (
                        <p className="text-red-600 text-sm pt-1 px-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <input
                      {...register("email")}
                      type="text"
                      className="input w-full mt-1 bg-white border border-grayCo rounded-md py-2 px-4 font-medium"
                      placeholder="e.g. StephenKing@lorem.com"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <label className=" text-sm ">Phone Number</label>
                      {errors.num && (
                        <p className="text-red-600 text-sm pt-1 px-1">
                          {errors.num.message}
                        </p>
                      )}
                    </div>
                    <input
                      {...register("num")}
                      type="text"
                      className="input w-full mt-1 bg-white border border-grayCo rounded-md py-2 px-4 font-medium"
                      placeholder="e.g. +123456789"
                    />
                  </div>
                </div>
              </div>
            )}
            {step === "2" && (
              <div className="flex flex-col">
                <div>
                  <p className="mb-1  block text-3xl font-bold text-blueMa">
                    Select your plan
                  </p>
                  <p className="text-grayCo">
                    You have the option of Monthly or Yearly billing.
                  </p>
                </div>
                <div className="flex space-x-5 mt-8 mb-12 w-full">
                  <Cards
                    icon="../public/assets/images/icon-arcade.svg"
                    title="Arcade"
                    price={
                      billing == "Monthly"
                        ? MofferPrices.Arcade
                        : MofferPrices.Arcade * 10
                    }
                    onClick={() => handleCardClick("Arcade")}
                    selected={offer === "Arcade"}
                  />
                  <Cards
                    icon="../public/assets/images/icon-advanced.svg"
                    title="Advanced"
                    price={
                      billing == "Monthly"
                        ? MofferPrices.Advanced
                        : MofferPrices.Advanced * 10
                    }
                    onClick={() => handleCardClick("Advanced")}
                    selected={offer === "Advanced"}
                  />
                  <Cards
                    icon="../public/assets/images/icon-pro.svg"
                    title="Pro"
                    price={
                      billing == "Monthly"
                        ? MofferPrices.Pro
                        : MofferPrices.Pro * 10
                    }
                    onClick={() => handleCardClick("Pro")}
                    selected={offer === "Pro"}
                  />
                </div>
                <PricingToggle />
              </div>
            )}
            {step === "3" && (
              <div className=" flex flex-col">
                <div>
                  <p className="mb-1  block text-3xl font-bold text-blueMa">
                    Pick add-ons
                  </p>
                  <p className="text-grayCo">
                    Add-ons help enhance your gaming experience
                  </p>
                </div>
                <div className="mt-8">
                  <CheckboxCard
                    title="Online Service"
                    description="Access to multiplayer games"
                    price={
                      billing === "Monthly"
                        ? Mbilling["Online service"]
                        : Mbilling["Online service"] * 10
                    }
                    checkboxKey="Online service"
                  />
                  <CheckboxCard
                    title="Larger Storage"
                    description="Extra 1TB of cloud save"
                    price={
                      billing === "Monthly"
                        ? Mbilling["Larger storage"]
                        : Mbilling["Larger storage"] * 10
                    }
                    checkboxKey="Larger storage"
                  />
                  <CheckboxCard
                    title="Customizable Profil"
                    description="Custom the on your profil"
                    price={
                      billing === "Monthly"
                        ? Mbilling["Customizable profil"]
                        : Mbilling["Customizable profil"] * 10
                    }
                    checkboxKey="Customizable profil"
                  />
                </div>
              </div>
            )}
            {step === "4" && (
              <div className=" flex flex-col">
                <div>
                  <p className="mb-1  block text-3xl font-bold text-blueMa">
                    Finishing up
                  </p>
                  <p className="text-grayCo">
                    Double-check everything looks OK before confirming.
                  </p>
                </div>
                <section className="my-8 w-full bg-Magnolia rounded-md">
                  <div className="px-6 ">
                    <div className="flex justify-between items-center py-4 border-grayLi border-b-2">
                      <div className="flex flex-col ">
                        <p className="font-bold text-sm ">
                          {offer} ({billing})
                        </p>
                        <span
                          className="underline cursor-pointer text-sm font-medium text-grayCo"
                          onClick={() => setStep("2")}
                        >
                          Change
                        </span>
                      </div>
                      <span className="font-bold text-sm">{pricing()}</span>
                    </div>
                    <div className="py-4">
                      {selectedAddOns.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm font-medium space-y-4"
                        >
                          <p className="text-grayCo">{item}</p>
                          <span className="text-blueMa ">
                            {billing === "Monthly"
                              ? `+$${
                                  Mbilling[item as keyof typeof Mbilling]
                                }/mo`
                              : `+$${
                                  Mbilling[item as keyof typeof Mbilling] * 10
                                }/yr`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                <div className="flex justify-between items-center px-6">
                  <p className="text-grayCo text-sm font-medium">
                    Total (per {billing === "Monthly" ? "month" : "year"})
                  </p>
                  <span className="text-xl font-bold text-bluePur">
                    {Total()}
                  </span>
                </div>
              </div>
            )}

            <div
              id="BUTTONS"
              className={`absolute bottom-0 left-0 w-full bg-white px-20  flex  ${step==="1" ? "justify-end" : "justify-between"}`}
            >
              {" "}
              {step !== "1" && step !== "5" && (
                <button
                  className=" w-fit  active:bg-blueActive text-grayCo"
                  type="submit"
                  onClick={(e) => {
                    back();
                  }}
                >
                  Go Back
                </button>
              )}
              {errors.root && (
                <p className="text-red-500">{errors.root.message}</p>
              )}
              {step !== "5" && (
                <button
                  className={` bg-blueMa  text-white w-fit py-2 px-5 rounded-lg cursor-pointer self-end ${
                    step === "4" ? "bg-bluePur" : ""
                  } ${
                    step === "2" && offer == null
                      ? "bg-grayCo cursor-not-allowed"
                      : ""
                  }
                  `}
                  disabled={offer == null && step === "2"}
                  type="submit"
                  onClick={(e) => {
                    next();
                  }}
                >
                  {step == "4" ? "Confirmer" : "Next Step"}
                </button>
              )}
            </div>
          </form>
          {step === "5" && (
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <div className="flex flex-col items-center  space-y-6">
                <img
                  src="../public/assets/images/icon-thank-you.svg"
                  alt="thankyou"
                  className="h-16"
                />
                <p className="font-bold text-3xl"> Thank you !</p>
                <p className="text-grayCo text-center">
                  Thanks for confirming your subscription! We hope you have fun
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default Settings;
