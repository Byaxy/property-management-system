import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import FilterComponent from "react-data-table-component";
import DataTable from "react-data-table-component";
import { activeTenantsData } from "@/data/activeTenantsData";

export default function ArchivedTenants() {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = activeTenantsData.data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-textPrimary text-xl">Archived Tenants</h2>
        <Link href="/tenants/newTenant" className="cursor-pointer no-underline">
          <p className="flex flex-row gap-1 items-center bg-greenColor text-white outline-none px-2 py-1 rounded-md cursor-pointer">
            <span className="text-lg flex items-center justify-center">
              <AddIcon fontSize="inherit" />
            </span>
            <span>Add New Tenant</span>
          </p>
        </Link>
      </div>
      <DataTable columns={activeTenantsData.columns} data={filteredItems} />
    </div>
  );
}
