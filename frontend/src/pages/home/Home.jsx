import React from "react";
import Header from "../../Layouts/header/Header";
import { Content } from "antd/es/layout/layout";
import { Breadcrumb, Col, Row, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Filter from "../../components/Filter/Filter";
import ListProduct from "../../components/ListProduct/ListProduct";

export default function Home() {
    return (
        <div className="home-container">
            <Header />
            <Content>
                <Breadcrumb
                    style={{
                        margin: "16px 0",
                        padding: "0 50px",
                    }}
                >
                    <Breadcrumb.Item>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col span={5}>
                        <Filter />
                    </Col>
                    <Col span={19}>
                        <ListProduct />
                    </Col>
                </Row>
            </Content>
        </div>
    );
}
