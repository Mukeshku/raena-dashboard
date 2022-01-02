import Summary from "views/Summary.js";
import UserLevelSummary from "./views/UserLevelSummary";
import BrandLevelSummary from "./views/BrandLevelSummary";

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
  /*{
    path: "/brand/summary",
    name: "Brands",
    icon: "nc-icon nc-bold",
    component: BrandLevelSummary,
    layout: "/admin",
  },*/
];
export default routes;
