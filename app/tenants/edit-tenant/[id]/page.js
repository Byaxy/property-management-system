"use client";
import React, { useEffect, useState } from "react";
import { tenantsData } from "@/data/tenantsData";

export default function EditTenantPage({ params }) {
  const [tenantData, setTenantData] = useState([]);
  const tenantId = params.id;

  useEffect(() => {
    const data = tenantsData.filter((row) => row.id.match(tenantId));
    setTenantData(data);
  }, [tenantId]);

  console.log(tenantData);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm my-4">
      {tenantData &&
        tenantData.map((tenant) => {
          <h3 key={tenant.id}>{tenant.tenantName}</h3>;
        })}
    </div>
  );
}
