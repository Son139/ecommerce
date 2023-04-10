import adminPage from "./adminPage";

export default {
    path: "/admin",
    name: "Dashboard",
    Component: adminPage,
    role: "admin",
    isSideBar: false,
    isNavBar: false,
};
