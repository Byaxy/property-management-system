import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barchartData } from "@/data/barchartData";
import { recentTenantsData } from "@/data/recentTenantsData";
import { Hidden } from "@mui/material";
import Link from "next/link";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarchartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 py-4">
      {/** Total Revenue Chart */}
      <div className="lg:col-span-3 bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col gap-4 md:flex-row justify-between items-start pb-4">
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-lg  font-medium text-textPrimary">
              Total Revenue
            </h2>
            <p className="m-0 text-2xl md:text-3xl font-bold">$236,535</p>
          </div>
          <div className="flex flex-row items-center justify-end gap-3">
            <div className="flex flex-row gap-1 items-center">
              <div className="bg-primaryColor h-4 w-4 rounded-full" />
              <span className="text-sm text-textGray">Income</span>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <div className="bg-purpleColor h-4 w-4 rounded-full" />
              <span className="text-sm text-textGray">Expenditure</span>
            </div>
          </div>
        </div>

        <Bar
          style={{
            width: "100%",
            height: "auto",
          }}
          data={barchartData[0].data}
          options={barchartData[1].options}
        />
      </div>
      {/** Recent Tenants */}
      <div className="relative overflow-y-scroll scrollbar-hide lg:col-span-2 bg-white shadow-sm rounded-lg w-full h-[50vh]  lg:h-[60vh] xl:h-[80vh] p-4 flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-textPrimary">Recent Tenants</h3>
          <Link href="/tenants">
            <button className="bg-white outline-none px-3 py-1 rounded-md border text-textGray border-textGray cursor-pointer">
              View All
            </button>
          </Link>
        </div>
        <ul className="list-none">
          {recentTenantsData &&
            recentTenantsData.map((tenant, index) => (
              <li
                className={`${
                  index === 0 ? "mt-0" : "my-2"
                } bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer`}
                key={tenant.name + index}
              >
                <p className="flex flex-col gap-2 md:flex-row justify-between">
                  <span className="text-textPrimary">{tenant.name}</span>
                  <span className="text-sm text-textPrimary">
                    {tenant.unit} - {tenant.unitType}
                  </span>
                </p>
                <p className="flex flex-col md:flex-row md:gap-2 text-sm text-textGray">
                  <span>{tenant.propertyName}</span>
                  <span className="hidden md:block">-</span>
                  <span>{tenant.propertyLocation}</span>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
