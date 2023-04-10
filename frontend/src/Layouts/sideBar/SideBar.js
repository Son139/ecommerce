import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, Image, Modal } from "antd";
import { pageDashboard, privatePage } from "../../routes/routes";
import classNames from "classnames";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { sidebarClose, sidebarOpen } from "../../redux/actions/sidebarAction";

function getMenuItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

export default function SideBar() {
    const sidebar = useSelector((state) => state.sidebar);
    const user = useRef(JSON.parse(localStorage.getItem("user")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const renderMenu = () => {
        const dashboards = [];
        let temp;
        pageDashboard.forEach(({ path, name, role, icon, children }, index) => {
            if (children) {
                temp = getMenuItem(
                    name,
                    path,
                    icon,
                    children.map(({ path, name, role, icon }) =>
                        getMenuItem(name, path, icon),
                    ),
                );
            } else {
                temp = getMenuItem(name, path, icon);
            }
            dashboards.push(temp);
        });
        return dashboards;
    };

    const showConfirm = (path) => {
        Modal.confirm({
            title: "Bạn cần phải đăng nhập!",
            icon: <ExclamationCircleFilled />,
            content: "Chức năng cần phải đăng nhập.",
            onOk() {
                navigate(path);
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    };

    const handleRedirect = (path) => {
        const needLogin = privatePage.find((item) => item.path === path);
        // console.log(privatePage);
        // console.log(path);
        // console.log(needLogin);
        // console.log(user.current);
        if (needLogin && !user.current) {
            // showConfirm(path);
        } else {
            navigate(path);
        }
    };

    const handleMenuSelect = (e) => {
        console.log(e);
        navigate(`${e.key}`);
    };

    console.log(window.location.pathname);

    return (
        <div
            className={classNames("sidebar", { close: !sidebar })}
            // onBlur={() => dispatch(sidebarClose())}
            tabIndex={0}
        >
            {/* <div className="sidebar-overlay"></div> */}
            <div className="sidebar-logo">
                <Image preview={false} src={"/logo-icon.png"} />
                <Image preview={false} src={"/logo-light-text.png"} />
            </div>
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={["/"]}
                defaultOpenKeys={["/" + window.location.pathname.split("/")[1]]}
                selectedKeys={window.location.pathname}
                onClick={(e) => {
                    dispatch(sidebarClose());
                    console.log(e);
                    handleRedirect(e.key);
                }}
                onSelect={handleMenuSelect}
                items={renderMenu()}
                onOpenChange={(e) => {
                    if (e.length > 1) {
                        dispatch(sidebarOpen());
                    }
                }}
            />
        </div>
    );
}
