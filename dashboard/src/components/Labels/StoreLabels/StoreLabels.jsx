import React from "react";

export const StoreLabels = ({ TAGS }) => {
  const SUPER_POPULAR = (
    <div
      className={`flex w-fit items-center justify-between gap-1 whitespace-pre break-words rounded-md bg-green-100 py-1 px-2`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200 bg-white ">
        <img src="src/assets/laugh.svg" alt="Smiley Face" />
      </div>
      <p className="text-xs font-medium">Super Popular</p>
    </div>
  );

  const HIGH_FOOTFALL = (
    <div
      className={`flex w-fit items-center justify-between gap-1 whitespace-pre break-words rounded-md bg-purple-100 py-1 px-2`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200 bg-white ">
        <img src="src/assets/line_chart.svg" alt="Smiley Face" />
      </div>
      <p className="text-xs font-medium">High Footfall</p>
    </div>
  );

  const POSH_LOCALITY = (
    <div
      className={`flex w-fit items-center justify-between gap-1 whitespace-pre break-words rounded-md bg-yellow-100 py-1 px-2`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200 bg-white ">
        <img src="src/assets/zap.svg" alt="Zap" />
      </div>
      <p className="text-xs font-medium">Posh Locality</p>
    </div>
  );

  const IN_SOCIETY = (
    <div
      className={`flex w-fit items-center justify-between gap-1 whitespace-pre break-words rounded-md bg-indigo-100 py-1 px-2`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200 bg-white ">
        <img src="src/assets/store.svg" alt="Store" />
      </div>
      <p className="text-xs font-medium">In Society</p>
    </div>
  );

  const HIGH_AOV = (
    <div
      className={`flex items-center justify-between gap-2 whitespace-pre break-words rounded-md bg-red-100 p-2`}
    >
      <span className="material-icons flex h-6 w-6 items-center justify-center rounded-full bg-white py-1 text-sm text-red-300">
        home
      </span>
      <p className="font-medium">In Society</p>
    </div>
  );

  return (
    <div className="flex items-center justify-start gap-4">
      {TAGS?.IFPOSH && POSH_LOCALITY}
      {TAGS?.HIGH_FOOTFALL && HIGH_FOOTFALL}
      {TAGS?.SUPER_POPULAR && SUPER_POPULAR}
    </div>
  );
};
