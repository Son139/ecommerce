import userList from "./CustomerList";

export default {
    path: "/list-user",
    name: "User Management",
    children: [
        {
            name: "Customers",
            path: "/customers",
            Component: userList,
            role: "admin",
        },
        {
            name: "Admins",
            path: "/admins",
            Component: userList,
            role: "admin",
        },
    ],
    isSideBar: false,
    isNavBar: false,
};
