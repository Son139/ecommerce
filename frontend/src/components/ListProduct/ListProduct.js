import { Content } from "antd/es/layout/layout";
import React from "react";

export default function ListProduct() {
    return (
        <Content
            className="site-layout"
            style={{
                padding: "0 50px 0 25px",
            }}
        >
            <div
                style={{
                    padding: 24,
                    minHeight: 380,
                    background: "white",
                }}
            >
                Content
            </div>
        </Content>
    );
}
