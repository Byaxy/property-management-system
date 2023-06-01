"use client";
import React, { useState } from "react";
import ActiveTenants from "../../components/tenants/ActiveTenants";
import ArchivedTenants from "../../components/tenants/ArchivedTenants";

export default function TenantsPage() {
  const [current, setCurrent] = useState("active");
  return (
    <section className="py-4">
      <nav className="bg-primaryColor p-4 pb-0 flex flex-row gap-2 rounded-t-lg">
        <div
          onClick={() => setCurrent("active")}
          className={`${
            current === "active"
              ? "text-primaryColor bg-white rounded-t-lg"
              : "text-white"
          } text-lg no-underline pb-3 py-2 px-3 cursor-pointer`}
        >
          Active Tenants
        </div>
        <div
          onClick={() => setCurrent("archive")}
          className={`${
            current === "archive"
              ? "text-primaryColor bg-white rounded-t-lg"
              : "text-white"
          } text-lg no-underline pb-3 py-2 px-3 cursor-pointer`}
        >
          Archived Tenants
        </div>
      </nav>

      <div className=" bg-white mb-4 rounded-lg overflow-hidden">
        {current && current === "active" ? (
          <ActiveTenants />
        ) : (
          <ArchivedTenants />
        )}
      </div>
    </section>
  );
}
