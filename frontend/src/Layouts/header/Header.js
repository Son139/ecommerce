import { HomeFilled, UserOutlined } from "@ant-design/icons";
import { Badge, Menu, Typography } from "antd";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cart from "../../components/Cart/Cart";

import "./index.scss";

export default function Header() {
    const navigate = useNavigate();

    const onMenuClick = (item) => {
        navigate(`/${item.key}`);
    };
    return (
        <div className="appHeader">
            <Menu
                className="appMenu"
                onClick={onMenuClick}
                mode="horizontal"
                style={{ paddingLeft: "40px" }}
                items={[
                    {
                        label: <HomeFilled />,
                        key: "",
                    },
                    {
                        label: "Men",
                        key: "men",
                        children: [
                            {
                                label: "Men's Shirts",
                                key: "mens-shirts",
                            },
                            {
                                label: "Men's Shoes",
                                key: "mens-shoes",
                            },
                            {
                                label: "Men's Watches",
                                key: "mens-watches",
                            },
                        ],
                    },
                    {
                        label: "Women",
                        key: "women",
                        children: [
                            {
                                label: "Women's Dresses",
                                key: "womens-dresses",
                            },
                            {
                                label: "Women's Shoes",
                                key: "womens-shoes",
                            },
                            {
                                label: "Women's Watches",
                                key: "womens-watches",
                            },
                            {
                                label: "Women's Bags",
                                key: "womens-bags",
                            },
                            {
                                label: "Women's Jewellery",
                                key: "womens-jewellery",
                            },
                        ],
                    },
                    {
                        label: "Fragrances",
                        key: "fragrances",
                    },
                ]}
            />
            <div className="header-center">
                <NavLink
                    to="/"
                    className="navbar-brand"
                    style={{ textAlign: "center", lineHeight: "50px" }}
                >
                    <span className="font-weight-bold text-uppercase ">
                        Boutique
                    </span>
                </NavLink>
            </div>
            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "40px",
                }}
            >
                <span className="menuItem-right">Cart</span>
                <Cart />
                <Link to="/login" className="d-flex">
                    <span className="menuItem-right">Login</span>
                    <Badge>
                        <UserOutlined />
                    </Badge>
                </Link>
            </div>
        </div>
    );
}
