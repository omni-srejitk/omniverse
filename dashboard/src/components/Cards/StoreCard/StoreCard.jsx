import React from "react";
import {
  fetchDailyGMV,
  fetchDeployedQuantity,
} from "../../../services/apiCalls";
import {
  createStoreWiseDeployed,
  createStoreWiseInventory,
} from "../../../utils/storeFunctions";
import { StoreLabels } from "../../Labels";

export const StoreCard = ({
  store,
  tags = {},
  label = "FLAGSHIP",
  setShowModal,
  setStoreDetail,
  showLabel = true,
}) => {
  const { customer_name, sub_type, locality } = store;
  const BRAND = localStorage.getItem("Name");
  const { isLoading: isCalculateGMVLoading, data: dailyGMVData } =
    fetchDailyGMV(BRAND);
  const { isLoading: isDeployedQtyLoading, data: deployedQtyData } =
    fetchDeployedQuantity(BRAND);

  const STORE_DEP = createStoreWiseDeployed(
    deployedQtyData,
    store.customer_name
  );

  const STORE_INV = createStoreWiseInventory(dailyGMVData, store.customer);

  const SHORTFORM =
    customer_name?.split(" ").filter((word) => word !== "")[0][0] +
    customer_name?.split(" ").filter((word) => word !== "")[1][0];

  return (
    <div
      onClick={() => {
        setStoreDetail(store);
        setShowModal(true);
      }}
      className="relative h-full w-full rounded-lg bg-white px-6 py-5"
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-300 uppercase">
          {SHORTFORM}
        </div>
        <div className="w-full overflow-hidden">
          <h1
            title={customer_name}
            className="overflow-ellipsis whitespace-pre break-words text-lg font-semibold"
          >
            {customer_name}
          </h1>
          <p className="font-semibold capitalize text-gray-400">
            {sub_type} | {locality}
          </p>
        </div>
      </div>

      <div className="mt-4 flex h-fit w-full gap-4">
        <div className=" flex h-full w-full items-center justify-center  rounded-xl bg-gray-100 px-4 py-8 ">
          <div className="flex w-1/2 justify-start  gap-4  border-r-2 border-gray-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-300 ">
              <img
                src="/assets/line_curve.svg"
                alt="Curved Line"
                className="h-5 w-5"
              />
            </div>
            <div>
              <div
                className="tooltip flex w-fit items-center justify-between gap-2 text-gray-400 hover:cursor-default"
                mytitle={"The total number of items currently sold till date."}
              >
                <p className=" text-sm font-semibold">Total Units Sold</p>
                <span className="material-icons text-base hover:cursor-pointer">
                  info
                </span>
                <span className="tooltiptext">Total Units Sold</span>
              </div>
              <h3 className="text-4xl font-semibold">{STORE_INV || 0}</h3>
            </div>
          </div>

          <div className=" flex w-1/2  justify-start gap-6 pl-4 ">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-300">
              <img
                src="/assets/shopping_bag.svg"
                alt="Shopping Bag"
                className="h-5 w-5"
              />
            </div>
            <div>
              <div
                className="tooltip flex w-fit items-center justify-between gap-2 text-gray-400 hover:cursor-default"
                mytitle={"The number of items currently in store"}
              >
                <p className=" text-sm font-semibold">Currently in store</p>
                <span className="material-icons text-base hover:cursor-pointer">
                  info
                </span>
                <span className="tooltiptext">
                  The number of items currently in store
                </span>
              </div>

              <h3 className="text-4xl font-semibold">{STORE_DEP || 0}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit w-full py-4">
        <StoreLabels TAGS={tags} />
      </div>
    </div>
  );
};
