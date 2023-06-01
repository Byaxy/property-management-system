import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const handleClick = (title) => {
  return (
    <div className="absolute top-0 z-50 bg-greenColor text-white">
      <h3>Success</h3>
      <p>{title} Successfuly Moved to Archives</p>
    </div>
  );
};

export const activeTenantsData = {
  columns: [
    {
      name: "Tenant Name",
      selector: (row) => row.tenantName,
      sortable: true,
      title: "Tenant Name",
    },
    {
      name: "House No.",
      selector: (row) => row.houseNumber,
    },
    {
      name: "House Type",
      selector: (row) => row.houseType,
    },
    {
      name: "House Name",
      selector: (row) => row.houseName,
      sortable: true,
    },
    {
      name: "House Location",
      selector: (row) => row.location,
      sortable: true,
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
      name: "Action",
      selector: null,
      sortable: false,
      cell: (row) => [
        <Link
          href={`/tenants/edit-tenant-details`}
          key={row.id}
          className="text-primaryColor"
        >
          <EditIcon />
        </Link>,
        <Link
          key={row.id}
          href="/tenants"
          onClick={handleClick.bind(this, row.tenantName)}
        >
          <DeleteIcon color="error" />
        </Link>,
      ],
    },
  ],
  data: [
    {
      id: "1098757",
      tenantName: "John Akello",
      houseNumber: "A001",
      houseType: "2bdrm Apartment",
      houseName: "The Aviary Apartments",
      location: "Mawanda Road",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "223455",
      tenantName: "Joseph Okello",
      houseNumber: "A101",
      houseType: "1bdrm Apartment",
      houseName: "FATIES CRIBS",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "3898797",
      tenantName: "Moses Mbabazi",
      houseNumber: "A201",
      houseType: "2bdrm Apartment",
      houseName: "The Aviary Apartments",
      location: "Mawanda Road",
      phone: "0776678621",
      email: "",
      idType: "Passport",
    },
    {
      id: "4245557",
      tenantName: "Robert Apio",
      houseNumber: "A031",
      houseType: "3bdrm Apartment",
      houseName: "Bibi Homes",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "590765",
      tenantName: "Rose Asiimwe",
      houseNumber: "A011",
      houseType: "4bdrm Apartment",
      houseName: "FATIES CRIBS",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "Passport",
    },
    {
      id: "6253456",
      tenantName: "John Akello",
      houseNumber: "A001",
      houseType: "2bdrm Apartment",
      houseName: "The Aviary Apartments",
      location: "Mawanda Road",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "77975464",
      tenantName: "Joseph Okello",
      houseNumber: "A101",
      houseType: "1bdrm Apartment",
      houseName: "FATIES CRIBS",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "82534457",
      tenantName: "Moses Mbabazi",
      houseNumber: "A201",
      houseType: "2bdrm Apartment",
      houseName: "The Aviary Apartments",
      location: "Mawanda Road",
      phone: "0776678621",
      email: "",
      idType: "Passport",
    },
    {
      id: "968i76745",
      tenantName: "Robert Apio",
      houseNumber: "A031",
      houseType: "3bdrm Apartment",
      houseName: "Bibi Homes",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "51045645",
      tenantName: "Rose Asiimwe",
      houseNumber: "A011",
      houseType: "4bdrm Apartment",
      houseName: "FATIES CRIBS",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "Passport",
    },
    {
      id: "234561",
      tenantName: "John Akello",
      houseNumber: "A001",
      houseType: "2bdrm Apartment",
      houseName: "The Aviary Apartments",
      location: "Mawanda Road",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "9974342",
      tenantName: "Joseph Okello",
      houseNumber: "A101",
      houseType: "1bdrm Apartment",
      houseName: "FATIES CRIBS",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "0909673",
      tenantName: "Moses Mbabazi",
      houseNumber: "A201",
      houseType: "2bdrm Apartment",
      houseName: "The Aviary Apartments",
      location: "Mawanda Road",
      phone: "0776678621",
      email: "",
      idType: "Passport",
    },
    {
      id: "9974544",
      tenantName: "Robert Apio",
      houseNumber: "A031",
      houseType: "3bdrm Apartment",
      houseName: "Bibi Homes",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "National ID",
    },
    {
      id: "445655",
      tenantName: "Rose Asiimwe",
      houseNumber: "A011",
      houseType: "4bdrm Apartment",
      houseName: "FATIES CRIBS",
      location: "Namuwongo",
      phone: "0776678621",
      email: "charlesbyaxy@gmail.com",
      idType: "Passport",
    },
  ],
};
