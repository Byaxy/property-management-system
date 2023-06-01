"use client";
import { Button } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddTenatPage() {
  return (
    <div className="min-h-[80vh] bg-white p-4 rounded-lg my-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-textPrimary text-xl">Add New Tenant</h2>
        <Button
          href="/tenants"
          variant="contained"
          size="medium"
          startIcon={<ArrowBackIcon />}
          className="bg-textGray hover:bg-textGray capitalize"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
