import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { rentData } from "@/data/rentData";
import { propertiesData } from "@/data/propertiesData";
import { unitsData } from "@/data/unitsData";
import { tenantsData } from "@/data/tenantsData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TopCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="grid grid-cols-3 bg-white rounded-lg px-4 py-2">
        <p className="flex flex-col items-start justify-center gap-1 col-span-2">
          <span className="text-sm md:text-[16px] text-textGray">
            Total Rent
          </span>
          <span className="text-lg md:text-xl font-bold text-textPrimary">
            100
          </span>
        </p>
        <div className="col-span-1 flex items-center justify-center w-full">
          <Doughnut data={rentData[0].data} options={rentData[1].options} />
        </div>
      </div>
      <div className="grid grid-cols-3 bg-white rounded-lg px-4 py-2">
        <p className="flex flex-col items-start justify-center gap-1 col-span-2">
          <span className="text-sm md:text-[16px] text-textGray">
            Number of Properties
          </span>
          <span className="text-lg md:text-xl font-bold text-textPrimary">
            600
          </span>
        </p>
        <div className="col-span-1 flex items-center justify-center w-full">
          <Doughnut
            data={propertiesData[0].data}
            options={propertiesData[1].options}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 bg-white rounded-lg px-4 py-2">
        <p className="flex flex-col items-start justify-center gap-1 col-span-2">
          <span className="text-sm md:text-[16px] text-textGray">
            Number of Units
          </span>
          <span className="text-lg md:text-xl font-bold text-textPrimary">
            512
          </span>
        </p>
        <div className="col-span-1 flex items-center justify-center w-full">
          <Doughnut data={unitsData[0].data} options={unitsData[1].options} />
        </div>
      </div>
      <div className="grid grid-cols-3 bg-white rounded-lg px-4 py-2">
        <p className="flex flex-col items-start justify-center gap-1 col-span-2">
          <span className="text-sm md:text-[16px] text-textGray">
            Number of Tenants
          </span>
          <span className="text-lg md:text-xl font-bold text-textPrimary">
            400
          </span>
        </p>
        <div className="col-span-1 flex items-center justify-center w-full">
          <Doughnut
            data={tenantsData[0].data}
            options={tenantsData[1].options}
          />
        </div>
      </div>
    </div>
  );
}
