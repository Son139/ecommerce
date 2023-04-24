import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import routes from "./routes";
import NavBar from "../Layouts/navBar/NavBar";
import SideBar from "../Layouts/sideBar/SideBar";
import Content from "../components/Contents/Content";

// console.log(routes.publicPage);
console.log(routes.privatePage);

const needLogin = (pathname, role) => {
    return false;
};

// const AuthRoute = ({Component,path,role,name}) => {
//     return (
//         !UserService.isLogin() ?
//         <Route
//             path={path}
//             render = {(props) => <Component {...props}/>}
//         />
//         : <Redirect to={"/"}/>
//     )
// }
const PublicRoute = ({
    Component,
    path,
    role,
    name,
    isNotNavBar,
    isNotSideBar,
}) => {
    return (
        <Route
            path={path}
            render={(props) => {
                return (
                    <>
                        {!isNotSideBar && <SideBar {...props} />}
                        {!isNotNavBar && <NavBar {...props} />}
                        <Content {...props}>
                            <Component />
                        </Content>
                    </>
                );
            }}
        />
    );
};

export default function AllRoute() {
    return (
        <Router>
            <Routes>
                {/* {routes.AuthRoute.map(({Component,path,role,Template,name}) =>
                <AuthRoute 
                    Component ={Component} 
                    path ={path} 
                    role ={role} 
                    Template = {Template}
                    key ={path}
                />
            )} */}
                {routes.publicPage.map(
                    ({ Component, path, role, isNotSideBar, isNotNavBar }) => (
                        <Route
                            path={path}
                            element={
                                // <Content>
                                <Component />
                                // </Content>
                            }
                        />
                    ),
                )}
                {routes.privatePage.map(
                    ({
                        Component,
                        path,
                        role,
                        name,
                        isNotSideBar,
                        isNotNavBar,
                    }) =>
                        !needLogin(path) ? (
                            path !== "/" ? (
                                <Route
                                    path={path}
                                    element={
                                        needLogin(path, role) ? (
                                            <Navigate to="/auth" />
                                        ) : (
                                            <>
                                                {!isNotSideBar && <SideBar />}
                                                {!isNotNavBar && <NavBar />}
                                                <Content>
                                                    <Component />
                                                </Content>
                                            </>
                                        )
                                    }
                                />
                            ) : (
                                <Route
                                    path={path}
                                    render={(props) => {
                                        return (
                                            <>
                                                {!isNotSideBar && <SideBar />}
                                                {!isNotNavBar && <NavBar />}
                                                <Content {...props}>
                                                    <Component />
                                                </Content>
                                            </>
                                        );
                                    }}
                                />
                            )
                        ) : (
                            <Navigate to="/auth" key={path} />
                        ),
                )}
                {/* <Route key="error" component={PageError} /> */}
            </Routes>
        </Router>
    );
}
