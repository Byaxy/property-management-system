import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import HomeWorkSharpIcon from "@mui/icons-material/HomeWorkSharp";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export const data = [
  {
    title: "Dashboard",
    path: "/",
    icon: <GridViewRoundedIcon />,
  },
  {
    title: "Tenants",
    path: "/tenants",
    icon: <PeopleRoundedIcon />,
  },
  {
    title: "Property",
    path: "/property",
    icon: <HomeWorkSharpIcon />,
  },
  {
    title: "Payments",
    path: "payments",
    icon: <PaidRoundedIcon />,
  },
  {
    title: "Maintenace",
    path: "/maintenance",
    icon: <ConstructionRoundedIcon />,
  },
  {
    title: "Billing",
    path: "billing",
    icon: <RequestQuoteRoundedIcon />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <SummarizeRoundedIcon />,
  },

  {
    title: "Chat",
    path: "/chat",
    icon: <ChatBubbleRoundedIcon />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <PeopleRoundedIcon />,
  },
];
