import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

export const activeTenantsData = {
  columns: [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      title: "Tenant Name",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Phone No.",
      selector: (row) => row.phone,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "ID No.",
      selector: (row) => row.id,
    },
    {
      name: "ID Type",
      selector: (row) => row.idType,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Address",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
      sortable: true,
    },
    {
      name: "Action",
      selector: null,
      sortable: false,
      cell: (row) => [
        <Link
          href={`/tenants/edit-tenant/${row.id}`}
          key={row.id}
          className="text-primaryColor"
        >
          <EditIcon />
        </Link>,
        <Link key={row.id} href="/tenants">
          <DeleteIcon color="error" />
        </Link>,
      ],
    },
  ],
  data: [
    {
      id: "1098757",
      firstName: "John ",
      lastName: "Akello",
      gender: "Male",
      nationality: "Kenyan",
      location: "Mawanda Road",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "223455",
      firstName: "Joseph",
      lastName: "Okello",
      gender: "Male",
      nationality: "Ugandan",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
  ],
};
