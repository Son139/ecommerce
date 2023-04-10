// import Login from "../components/Auth/Login";

// const publicRoutes = [{ path: "/login", component: Login }];

// export default publicRoutes;

import AdminPage from "../pages/admin/adminPage/config";
import UserManagement from "../pages/admin/user-management/config";

const allPage = [AdminPage, UserManagement];

export const privatePage = [];
export const pageDashboard = [];
export const publicPage = [];

allPage.forEach((pageMaster) => {
    const dashBoard = [];
    console.log(pageMaster);
    if (pageMaster.children) {
        pageMaster.children.forEach((pageChildren) => {
            pageChildren.path = pageMaster.path + pageChildren.path;
            if (pageChildren.role) {
                privatePage.push(pageChildren);
            } else {
                publicPage.push(pageChildren);
            }
            if (!pageChildren.isPrivacy) {
                dashBoard.push(pageChildren);
            }
        });
        pageMaster.children = dashBoard;
        pageDashboard.push(pageMaster);
    } else {
        if (!pageMaster.isPrivacy) {
            pageDashboard.push(pageMaster);
        }
        if (pageMaster.role) {
            privatePage.push(pageMaster);
        } else {
            publicPage.push(pageMaster);
        }
    }
});

// console.log(publicPage);
// const AuthRoute = [
//     AuthPage,
// ]

export default {
    privatePage,
    publicPage,
    pageDashboard,
};
