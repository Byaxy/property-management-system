"use client";
import React, { useEffect, useState } from "react";
import { activeTenantsData } from "@/data/activeTenantsData";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

export default function ViewTenantPage({ params }) {
  const [tenantData, setTenantData] = useState([]);
  const tenantId = params.id;

  useEffect(() => {
    const data = activeTenantsData.data.filter((row) => row.id.match(tenantId));
    setTenantData(data);
  }, [tenantId]);

  return (
    <div className="bg-white my-4 p-4 rounded-lg shadow-sm max-w-[50rem]">
      <h2 className="text-textPrimary">Tenant Details</h2>

      {tenantData &&
        tenantData.map((tenant) => {
          return (
            <div key={tenant.id} className="w-full">
              <div className="w-full">
                {/** Bio Data Section */}
                <div>
                  <h4 className="text-textPrimary my-3 p-2 bg-lightGrayColor">
                    Bio Data
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="grid grid-cols-2 col-start-1 col-end-1">
                      <span className="text-textPrimary font-medium">
                        Tenant ID:
                      </span>
                      <span className="text-textGray">{tenant.id}</span>
                    </p>
                    <div className="grid grid-cols-2 col-span-2">
                      <p className="grid grid-cols-2">
                        <span className="text-textPrimary font-medium">
                          Tenant Name:
                        </span>
                        <span className="text-textGray">
                          {tenant.firstName} {tenant.lastName}
                        </span>
                      </p>
                      <p className="grid grid-cols-2">
                        <span className="text-textPrimary font-medium">
                          Gender:
                        </span>
                        <span className="text-textGray">{tenant?.gender}</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-2 col-span-2">
                      <p className="grid grid-cols-2">
                        <span className="text-textPrimary font-medium">
                          Identification Number:
                        </span>
                        <span className="text-textGray">{tenant.id}</span>
                      </p>
                      <p className="grid grid-cols-2">
                        <span className="text-textPrimary font-medium">
                          Identification Type:
                        </span>
                        <span className="text-textGray">{tenant?.idType}</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/** Contacts/Address Section */}
                <div>
                  <h4 className="text-textPrimary my-3 p-2 bg-lightGrayColor">
                    Contacts/Address
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="grid grid-cols-2">
                      <span className="text-textPrimary font-medium">
                        Phone Number:
                      </span>
                      <span className="text-textGray">{tenant.phone}</span>
                    </p>
                    <p className="grid grid-cols-2">
                      <span className="text-textPrimary font-medium">
                        Email:
                      </span>
                      <span className="text-textGray">{tenant.email}</span>
                    </p>
                    <p className="grid grid-cols-2">
                      <span className="text-textPrimary font-medium">
                        Address:
                      </span>
                      <span className="text-textGray">{tenant?.location}</span>
                    </p>
                    <p className="grid grid-cols-2">
                      <span className="text-textPrimary font-medium">
                        Town/City:
                      </span>
                      <span className="text-textGray">{tenant?.town}</span>
                    </p>
                    <p className="grid grid-cols-2">
                      <span className="text-textPrimary font-medium">
                        Nationality:
                      </span>
                      <span className="text-textGray">
                        {tenant.nationality}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 mt-12 w-full flex px-6 gap-2 justify-between items-center">
                <Button
                  href="/tenants"
                  variant="contained"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  className="bg-textGray hover:bg-textGray capitalize"
                >
                  Back
                </Button>
                <Button
                  href={`/tenants/edit-tenant/${tenant.id}`}
                  variant="contained"
                  size="large"
                  startIcon={<EditIcon />}
                  className="bg-primaryColor hover:bg-primaryColor capitalize"
                >
                  Edit
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
