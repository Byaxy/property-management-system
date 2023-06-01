"use client";
import { Button } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
interface IFormInput {
  firstName: String;
  lastName: String;

  gender: GenderEnum;
}

export default function AddTenatPage() {
  return (
    <div className="min-h-[80vh] bg-white p-4 rounded-lg my-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-textPrimary text-xl">New Tenant</h2>
        <Button
          href="/tenants"
          variant="contained"
          size="large"
          startIcon={<ArrowBackIcon />}
          className="bg-textGray hover:bg-textGray capitalize"
        >
          Back
        </Button>
      </div>
      <div>
        <form action="">
          <label>First Name</label>
          <input type="text" />
          <label>Last Name</label>
          <input type="text" />
          <label>ID Number</label>
          <input type="text" />
          <label htmlFor="">ID Type</label>
          <select name="IDType" id="ID-type">
            <option value="Passport">Passport</option>
            <option value="National ID">National ID</option>
            <option value="Driving License">Driving License</option>
          </select>
          <div>
            <Button
              type="reset"
              variant="contained"
              size="large"
              className="bg-textGray hover:bg-textGray capitalize"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="bg-greenColor hover:bg-greenColor capitalize"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
