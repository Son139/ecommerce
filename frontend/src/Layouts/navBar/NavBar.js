import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    LogoutOutlined,
    LoginOutlined,
    InfoCircleOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import { Breadcrumb, Dropdown, Space, Avatar, Button, Modal } from "antd";
import classnames from "classnames";
import { sidebarClose, sidebarOpen } from "../../redux/actions/sidebarAction";
import { pageDashboard } from "../../routes/routes";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    //   const user = useRef(JSON.parse(localStorage.getItem("user")));
    const user = useRef(true);
    const [arrName, setArrName] = useState([]);
    const sidebar = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();

    useEffect(() => {
        getName();
    }, [location.pathname]);

    console.log(arrName);
    const handleMenu = () => {
        // console.log(sidebar);
        if (sidebar) {
            dispatch(sidebarClose());
        } else {
            dispatch(sidebarOpen());
        }
    };

    const getName = () => {
        const paths = window.location.pathname.split("/");
        paths.splice(0, 1, "/");
        if (paths.length >= 2) {
            let child_first = pageDashboard.find((item) => {
                return item.path === "/" + paths[1];
            });
            if (child_first) {
                setArrName([child_first.name]);
                let child_second = child_first?.children?.find((item) => {
                    return item.path === "/" + paths[1] + "/" + paths[2];
                });
                if (child_second) {
                    setArrName((preState) => [...preState, child_second.name]);
                }
            }
        }
    };

    const items = [
        {
            key: "1",
            label: <div className="">Thông tin cá nhân</div>,
            icon: <InfoCircleOutlined />,
            disabled: true,
        },
        {
            key: "2",
            label: (
                <div
                    className=""
                    onClick={() => {
                        const showConfirm = (path) => {
                            Modal.confirm({
                                title: "Bạn chắc chắn muốn đăng xuất?",
                                icon: <ExclamationCircleFilled />,
                                onOk() {
                                    localStorage.removeItem("user");
                                    navigate("/");
                                    window.location.reload();
                                },
                                onCancel() {
                                    // console.log('Cancel');
                                },
                            });
                        };
                        showConfirm();
                    }}
                >
                    Đăng xuất
                </div>
            ),
            icon: <LogoutOutlined />,
            //   disabled: true,
        },
    ];
    return (
        <div
            className={classnames("navbar d-flex align-items-center", {
                open: !sidebar,
            })}
            // onBlur={() => dispatch(sidebarClose())}
            tabIndex={0}
        >
            <div className="nav-menu" onClick={handleMenu}>
                {sidebar ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </div>
            <div className="navbar-main d-flex align-items-center">
                <div className="nav-left">
                    <Breadcrumb>
                        {arrName[0] && (
                            <Breadcrumb.Item>{arrName[0]}</Breadcrumb.Item>
                        )}
                        {arrName[1] && (
                            <Breadcrumb.Item>{arrName[1]}</Breadcrumb.Item>
                        )}
                    </Breadcrumb>
                </div>
                <div className="nav-right">
                    <div className="nav-user">
                        {user.current ? (
                            <Dropdown menu={{ items }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar icon={<UserOutlined />} />
                                        Supper admin
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        ) : (
                            <div className=" d-flex align-items-center">
                                <Button
                                    icon={<LoginOutlined />}
                                    onClick={() => {
                                        navigate("/auth");
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
