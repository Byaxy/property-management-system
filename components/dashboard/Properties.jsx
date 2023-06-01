"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { propertyData } from "../../data/propertyData";
import Image from "next/image";

export default function Properties() {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const matcheSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const matcheMidium = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (matcheSmall) {
      setData(propertyData.slice(0, 1));
    } else if (matcheMidium) {
      setData(propertyData.slice(0, 2));
    } else {
      setData(propertyData.slice(0, 3));
    }
  }, [matcheMidium, matcheSmall]);
  return (
    <div className="p-4 bg-white shadow-sm rounded-lg my-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-textPrimary">Properties</h3>
        <Link href="/property">
          <button className="bg-white outline-none px-3 py-1 rounded-md border text-textGray border-textGray cursor-pointer">
            View All
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 w-full">
        {data &&
          data.map((property, index) => (
            <div
              key={property.name + index}
              className="flex flex-col gap-3 w-full"
            >
              <div className="relative flex items-center justify-center">
                <Image
                  src={property.image}
                  alt={property.name}
                  width={matcheSmall ? 360 : matcheMidium ? 320 : 380}
                  height={matcheSmall ? 200 : matcheMidium ? 220 : 240}
                  priority
                  className="transition-opacity opacity-0 duration-[3s] rounded-lg"
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
              </div>
              <div className="px-2 flex flex-col gap-2">
                <div className="flex flex-row justify-between items-start">
                  <h4 className="text-textPrimary font-medium cursor-pointer">
                    {property.name}
                  </h4>
                  <span className="flex justify-center items-center px-2 py-1 text-sm text-primaryColor rounded-md bg-purpleColor cursor-pointer">
                    {property.units} Units
                  </span>
                </div>
                <div className="flex flex-row justify-start items-center gap-1">
                  <span className="">
                    <LocationOnIcon fontSize="inherit" />
                  </span>
                  <span className="text-sm text-textGray">
                    {property.propertyLocation}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
