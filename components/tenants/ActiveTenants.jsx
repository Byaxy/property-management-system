import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { activeTenantsData } from "@/data/activeTenantsData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

export default function ActiveTenants() {
  const router = useRouter();
  const sortIcon = <ExpandMoreIcon />;
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const customStyles = {
    rows: {
      style: {
        "&:nth-child(odd)": {
          backgroundColor: "rgb(241, 245, 249)",
        },
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#e5e7eb",
        },
      },
    },
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
      },
    },
  };

  const onRowClicked = (row, event) => {
    router.push(`/tenants/view-tenant/${row.id}`);
  };

  useEffect(() => {
    const handleFilter = () => {
      if (filterText.toLowerCase() === "") {
        setData(activeTenantsData.data);
      }
      const newData = activeTenantsData.data.filter(
        (row) =>
          (row.tenantName &&
            row.tenantName.toLowerCase().includes(filterText.toLowerCase())) ||
          (row.houseName &&
            row.houseName.toLowerCase().includes(filterText.toLowerCase())) ||
          (row.location &&
            row.location.toLowerCase().includes(filterText.toLowerCase()))
      );
      setData(newData);
      setColumns(activeTenantsData.columns);
    };

    handleFilter();
  }, [filterText]);
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-4 p-4">
        <div className="flex items-center justify-start bg-lightGrayColor w-fit rounded-md px-2 py-1">
          <SearchIcon className="text-textGray h-6 w-6 cursor-pointer" />
          <input
            className="text-textPrimary outline-none bg-lightGrayColor border-0 w-[40vw] md:w-[50vw] lg:w-[30vw] py-1 px-3  rounded-md text-[16px]"
            type="text"
            placeholder="Search Tenants"
            onChange={(event) => {
              setFilterText(event.target.value);
            }}
          />
        </div>
        <Button
          href="/tenants/add-tenant"
          variant="contained"
          size="medium"
          startIcon={<AddIcon />}
          className="bg-primaryColor hover:bg-primaryColor capitalize"
        >
          Add Tenant
        </Button>
      </div>
      <div className="flex max-w-full flex-col bg-white px-2">
        <DataTable
          data={data}
          columns={columns}
          className="max-w-[80vw] scrollbar-hide"
          sortIcon={sortIcon}
          selectableRows
          pagination={true}
          customStyles={customStyles}
          fixedHeader
          onRowClicked={onRowClicked}
        />
      </div>
    </div>
  );
}
