import React from "react";
import { Accordian } from "../../Accordian/Accordian";
import { StoreLabels } from "../../Labels";
import { ModalGallery } from "../../ModalGallery/ModalGallery";

export const StoreModal = ({ store = {} }) => {
  const {
    google_name,
    asile,
    daily_footfall,
    store_timings,
    sub_type,
    locality,
    brand_priority,
    rating,
    review_count,
    STORE_INV,
    STORE_DEP,
    STORE_SALE,
  } = store;

  const BRAND_COLORS = [
    "bg-orange-50",
    "bg-blue-50",
    "bg-red-50",
    "bg-green-50",
    "bg-yellow-50",
  ];

  const BRANDS_PRESENT = Object.values(JSON.parse(brand_priority)).reduce(
    (acc, curr) => {
      return [...acc, ...curr];
    },
    []
  );

  const checkPopularity = (rating, review_count) => {
    if (rating > 4 && review_count > 50) {
      return true;
    }

    return false;
  };

  const checkFootfall = (daily_footfall) => {
    if (daily_footfall > 250) {
      return true;
    }
    return false;
  };

  const checkIfPosh = (locality_area) => {
    if (locality_area === "Posh") {
      return true;
    }
    return false;
  };

  const checkForStoreTags = (store) => {
    const IFPOSH = checkIfPosh(store.locality_area);
    const HIGH_FOOTFALL = checkFootfall(daily_footfall);
    const SUPER_POPULAR = checkPopularity(rating, review_count);

    return {
      IFPOSH,
      HIGH_FOOTFALL,
      SUPER_POPULAR,
    };
  };

  return (
    <div className="relative z-10 flex h-[43rem] w-full flex-col items-center justify-start rounded-xl">
      <div className="flex w-full flex-grow flex-col items-start px-10">
        <h1 className=" mt-4  text-3xl font-bold text-black">{google_name}</h1>
        <div className="mt-4 flex justify-start text-xl font-medium text-gray-700">
          <div className="text-base capitalize">{locality}</div>
          <div className="mx-4 flex h-fit w-fit items-center justify-between gap-1 rounded-full bg-yellow-400 px-2 py-1 text-sm font-semibold">
            <span className="material-icons text-sm text-yellow-600">star</span>
            <span>{rating}</span> |
            <span className="material-icons text-sm text-yellow-600">edit</span>
            <span>{review_count}</span>
          </div>
        </div>
      </div>
      <div className="  my-9 flex h-full w-full items-start justify-center gap-4 px-4">
        <div className="w-4/7 relative flex h-[34rem] flex-grow flex-col">
          {/* Store Cards */}
          <div className="flex h-fit w-full flex-col items-start">
            <div className="flex w-fit gap-4">
              <div className=" h-6 w-3 rounded-sm bg-blue-300"></div>
              <p className=" font-semibold">You & the store</p>
            </div>
            <div className="my-4 flex h-max w-full items-center justify-between gap-4">
              <div className="flex h-[7rem] w-3/4 flex-grow items-center justify-between rounded-md border-2 border-gray-200 p-4">
                <div className="flex w-1/2 flex-col items-center justify-center border-r-2 p-4 text-center">
                  <p className=" font-medium">Total Unit Sold</p>
                  <p className="text-2xl font-semibold">{STORE_INV || 0}</p>
                </div>

                <div className="flex w-1/2 flex-col items-center justify-center p-4 text-center">
                  <p className=" font-medium">Total GMV</p>
                  <p className="text-2xl font-semibold">
                    &#8377;{STORE_SALE || 0}
                  </p>
                </div>
              </div>
              <div className="flex h-[7rem] w-1/4 flex-grow items-center justify-center rounded-md border-2 border-gray-200 p-4">
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <p className=" font-medium">SKUs Present</p>
                  <p className="text-2xl font-semibold">{STORE_DEP || 0}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Few Other brands present */}
          <div className="flex  w-full flex-col items-start justify-start gap-4">
            <div className="min-h- flex h-fit w-full gap-4 ">
              <div className=" h-6 w-3 rounded-sm bg-blue-300"></div>
              <p className=" font-semibold">
                Few other Brands Present in the Store:
              </p>
            </div>
            <div className="my-4 flex h-fit min-h-[9.25rem] w-full flex-grow flex-wrap items-center rounded-md border-2 border-gray-200 p-4">
              {BRANDS_PRESENT?.slice(1, 15)?.map((brand) => (
                <div
                  className={` ${
                    BRAND_COLORS[Math.round(Math.random() * 4)]
                  } m-1 rounded-sm py-1 px-2 font-medium`}
                  key={brand}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-start gap-2">
            <img src="src/assets/clock.svg" alt="Clock" />
            <p className="mt-auto text-xs font-semibold text-gray-500">
              You went live in this store on 29th Jan, 2022
            </p>
          </div>
        </div>
        <div className="w-3/7 flex h-full flex-col">
          <div className="flex h-fit w-full gap-4 pl-2">
            <div className=" h-6 w-3 rounded-sm bg-blue-300"></div>
            <p className=" font-semibold">Key info about Stores</p>
          </div>

          <Accordian store={store} />
          <div className="mt-3 flex w-fit gap-4 pl-2">
            <div className=" h-6 w-3 rounded-sm bg-blue-300"></div>
            <p className=" font-semibold">Features</p>
          </div>
          <div className="my-2 flex h-[13.75rem] w-full flex-wrap items-start justify-start rounded-md border-2 p-4">
            <StoreLabels TAGS={checkForStoreTags(store)} />
          </div>
        </div>
      </div>
    </div>
  );
};
