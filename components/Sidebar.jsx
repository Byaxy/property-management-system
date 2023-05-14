import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { data } from "@/data";
import Link from "next/link";

export default function Sidebar({ open }) {
  return (
    <List className={`${open ? "px-2" : ""}`}>
      {data.map((item) => (
        <ListItem
          key={item.title}
          disablePadding
          className="block cursor-pointer rounded-lg group hover:bg-primaryColor hover:text-white"
        >
          <ListItemButton className={`${open ? "" : "justify-center"} px-2`}>
            <Link
              href={item.path}
              className="flex items-center w-full no-underline text-textGray group-hover:text-white"
            >
              <ListItemIcon
                title={item.title}
                className={`${
                  open ? "mr-3" : "auto"
                } min-w-0 justify-center text-textGray group-hover:text-white`}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                className={`${open ? "opacity-100" : "opacity-0"}`}
              />
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
