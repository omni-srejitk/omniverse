import React from "react";
import { Card } from "../../components/Cards/Card/Card";
import MapComponent from "../../components/Map/MapComponent";

export const Stores = () => {
  const storesData = [
    {
      longitude: 77.577226,
      latitude: 12.988621,
      price: 100,
      storeName: "Testing1",
    },
    {
      longitude: 77.5685723756697,
      latitude: 12.980253335829326,
      price: 100,
      storeName: "Testing2",
    },
  ];
  return (
    <main className="page__content">
      <h1 className="page__title">Stores</h1>
      <Card title={"MBT Hypermarket"}>
        <div className="flex items-center justify-start gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-300 ">
            <span className="material-icons  text-gray-600">store</span>
          </div>
          <div>
            <p>Hypermarket | HSR Layout</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-green-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                arrow_upward
              </span>
            </div>
            <div>
              <h3 className="text-2xl">24</h3>
              <p>Total Units sold</p>
            </div>
          </div>
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-blue-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                inventory_2
              </span>
            </div>
            <div>
              <h3 className="text-2xl">8</h3>
              <p>Currently In Store</p>
            </div>
          </div>
        </div>
      </Card>
      <Card title={"MBT Hypermarket"}>
        <div className="flex items-center justify-start gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-300 ">
            <span className="material-icons  text-gray-600">store</span>
          </div>
          <div>
            <p>Hypermarket | HSR Layout</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-green-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                arrow_upward
              </span>
            </div>
            <div>
              <h3 className="text-2xl">24</h3>
              <p>Total Units sold</p>
            </div>
          </div>
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-blue-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                inventory_2
              </span>
            </div>
            <div>
              <h3 className="text-2xl">8</h3>
              <p>Currently In Store</p>
            </div>
          </div>
        </div>
      </Card>
      <Card title={"MBT Hypermarket"}>
        <div className="flex items-center justify-start gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-300 ">
            <span className="material-icons  text-gray-600">store</span>
          </div>
          <div>
            <p>Hypermarket | HSR Layout</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-green-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                arrow_upward
              </span>
            </div>
            <div>
              <h3 className="text-2xl">24</h3>
              <p>Total Units sold</p>
            </div>
          </div>
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-blue-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                inventory_2
              </span>
            </div>
            <div>
              <h3 className="text-2xl">8</h3>
              <p>Currently In Store</p>
            </div>
          </div>
        </div>
      </Card>
      <Card title={"MBT Hypermarket"}>
        <div className="flex items-center justify-start gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-300 ">
            <span className="material-icons  text-gray-600">store</span>
          </div>
          <div>
            <p>Hypermarket | HSR Layout</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-green-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                arrow_upward
              </span>
            </div>
            <div>
              <h3 className="text-2xl">24</h3>
              <p>Total Units sold</p>
            </div>
          </div>
          <div className="mt-8 mr-4 flex gap-6 rounded-xl border-2 border-gray-200 bg-blue-50 p-8 shadow-sm">
            <div>
              <span className="material-icons flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                inventory_2
              </span>
            </div>
            <div>
              <h3 className="text-2xl">8</h3>
              <p>Currently In Store</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-[152px]">
        <MapComponent storesData={storesData} />
        {/* <MapComponent /> */}
      </div>
    </main>
  );
};
