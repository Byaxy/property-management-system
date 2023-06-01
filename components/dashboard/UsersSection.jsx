import React from "react";
import Image from "next/image";
import { usersData } from "@/data/usersData";
import { maintenanceData } from "@/data/maintenanceData";
import charles from "../../public/charles.png";
import house from "../../public/house.png";
import Link from "next/link";

export default function UsersSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      {/** Users */}
      <div className="lg:col-span-2 bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-textPrimary">Users</h3>
          <Link href="/users">
            <button className="bg-white outline-none px-3 py-1 rounded-md border text-textGray border-textGray cursor-pointer">
              View All
            </button>
          </Link>
        </div>
        <ul className="list-none">
          {usersData &&
            usersData.map((user, index) => (
              <li
                key={user.name + index}
                className="flex flex-row gap-2 items-center my-3 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer"
              >
                <div className="rounded-full bg-white flex items-center justify-center">
                  <Image src={charles} alt={user.name} width="50" height="50" />
                </div>
                <p className="flex flex-col gap-1">
                  <span className="text-textPrimary">{user.name}</span>
                  <span className="text-textGray text-sm">{user.role}</span>
                </p>
              </li>
            ))}
        </ul>
      </div>
      {/** Latest Maintenance projects */}
      <div className="relative overflow-y-scroll scrollbar-hide lg:col-span-4 bg-white shadow-sm rounded-lg w-full p-4 h-[40vh]">
        <div className="flex flex-row items-center justify-between gap-1">
          <h3 className="text-textPrimary">Latest Maintenance Projects</h3>
          <Link href="/maintenance">
            <button className="bg-white outline-none px-3 py-1 rounded-md border text-textGray border-textGray cursor-pointer">
              View All
            </button>
          </Link>
        </div>
        <ul className="list-none">
          {maintenanceData &&
            maintenanceData.map((project, index) => (
              <li
                key={project.unit + index}
                className="flex flex-row gap-3 items-center my-3 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer"
              >
                <div className="rounded-md flex items-center justify-center">
                  <Image
                    src={house}
                    alt={project.propertyName}
                    width="50"
                    height="50"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="flex w-full flex-col md:flex-row md:gap-2 text-textPrimary">
                    <span>{project.propertyName}</span>
                    <span className="hidden md:block">-</span>
                    <span>{project.propertyLocation}</span>
                  </p>
                  <p className="flex flex-col md:flex-row md:gap-1 text-sm text-textGray">
                    <span>{project.unit}</span>
                    <span className="hidden md:block">-</span>
                    <span>{project.unitType}</span>
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
