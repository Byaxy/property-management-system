"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full h-full bg-white flex flex-row justify-between items-center">
      <div className="flex items-center justify-start bg-lightGrayColor w-fit rounded-md px-2 py-1">
        <SearchIcon className="text-textGray h-5 w-5" />
        <input
          className="text-textPrimary outline-none bg-lightGrayColor border-0 w-[40vw] md:w-[50vw] lg:w-[35vw] py-1 px-3 text-[17px] rounded-md"
          type="text"
          placeholder="Search Property, Cutomer, etc"
        />
      </div>
      <div className="relative">
        <Avatar
          onClick={() => setShowPopup((prev) => !prev)}
          className="bg-primaryColor"
        >
          CB
        </Avatar>
        {showPopup && (
          <div className="absolute top-10 -right-[5.5rem] z-10 min-w-[70vw] md:min-w-[38vw] lg:min-w-[25vw] xl:min-w-[20vw] bg-white rounded-lg shadow-md px-4 pb-4 slide-left">
            <p className="flex flex-col justify-start ">
              <span className="font-bold text-textPrimary block">
                Charles Byakutaga
              </span>
              <span className="text-sm text-textGray block">
                Property Manager
              </span>
              <span className="text-sm text-textGray block">
                charlesbyaxy@gmail.com
              </span>
            </p>
            <div className="flex flex-row justify-between items-center">
              <button className="text-white border-0 outline-none px-3 md:px-4 py-2 rounded-lg bg-primaryColor cursor-pointer font-bold">
                Sign Out
              </button>
              <button className="flex flex-row gap-1 items-center px-3 md:px-4 py-2 border-0 bg-lightGrayColor rounded-lg outline-0 cursor-pointer">
                <span>Settings</span>{" "}
                <SettingsRoundedIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
