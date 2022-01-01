import Summary from "views/Summary.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UserLevelSummary from "./views/UserLevelSummary";
import BrandLevelSummary from "./views/BrandLevelSummary";
import UpgradeToPro from "views/Upgrade.js";

var routes = [
  {
    path: "/dashboard",
    name: "Summary",
    icon: "nc-icon nc-chart-bar-32",
    component: Summary,
    layout: "/admin",
  },
  {
    path: "/user/summary",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: UserLevelSummary,
    layout: "/admin",
  },
  {
    path: "/brand/summary",
    name: "Brands",
    icon: "nc-icon nc-bold",
    component: BrandLevelSummary,
    layout: "/admin",
  },
 /*{
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },*/
  /*  {
     path: "/maps",
     name: "Maps",
     icon: "nc-icon nc-pin-3",
     component: Maps,
     layout: "/admin",
   },
   {
     path: "/notifications",
     name: "Notifications",
     icon: "nc-icon nc-bell-55",
     component: Notifications,
     layout: "/admin",
   },
   {
     path: "/user-page",
     name: "User Profile",
     icon: "nc-icon nc-single-02",
     component: UserPage,
     layout: "/admin",
   },
   {
     path: "/tables",
     name: "Table List",
     icon: "nc-icon nc-tile-56",
     component: TableList,
     layout: "/admin",
   },
   {
     path: "/typography",
     name: "Typography",
     icon: "nc-icon nc-caps-small",
     component: Typography,
     layout: "/admin",
   },
   {
     pro: true,
     path: "/upgrade",
     name: "Upgrade to PRO",
     icon: "nc-icon nc-spaceship",
     component: UpgradeToPro,
     layout: "/admin",
   },*/
];
export default routes;
