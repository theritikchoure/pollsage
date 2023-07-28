import React from "react";

const StepProgressBar = ({ numSteps, onClick }) => {
  const steps = Array.from({ length: numSteps }, (_, index) => index + 1);

  return (
    <ul className="relative m-0 flex list-none justify-between overflow-hidden px-5 transition-[height] duration-200 ease-in-out">
      {steps.map((step) => (
        <li key={step} className="w-[4.5rem] flex-auto">
          <div
            className={`flex cursor-pointer items-center leading-[1.3rem] no-underline ${
              step === 1 ? "pl-2" : step === numSteps ? "pr-2" : "px-2" // For intermediate steps
            } focus:outline-none`}
            onClick={() => onClick(step)}
          >
            <span className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
              {step}
            </span>
            <span className="text-neutral-500 after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300">
              step {step}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StepProgressBar;
