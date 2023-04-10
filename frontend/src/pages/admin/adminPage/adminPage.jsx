import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Space } from "antd";
import React from "react";
import DashboardCard from "../../../components/DashboardCard/dashboardCard";
import DonutChart from "../../../components/Chart/DonutChart";
import ColumnChart from "../../../components/Chart/ColumnChart";

export default function adminPage() {
    return (
        <div>
            <Space direction="vertical" style={{ paddingTop: "100px" }}>
                <Space direction="horizontal">
                    <DashboardCard
                        icon={
                            <UserOutlined
                                style={{
                                    color: "purple",
                                    backgroundColor: "rgba(0,255,255,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"New Clients"}
                        // value={}
                    />
                    <DashboardCard
                        icon={
                            <ShoppingCartOutlined
                                style={{
                                    color: "green",
                                    backgroundColor: "rgba(0,255,0,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"Orders"}
                        // value={}
                    />
                    <DashboardCard
                        icon={
                            <ShoppingOutlined
                                style={{
                                    color: "blue",
                                    backgroundColor: "rgba(0,0,255,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"Inventory"}
                        // value={}
                    />
                    <DashboardCard
                        icon={
                            <DollarCircleOutlined
                                style={{
                                    color: "red",
                                    backgroundColor: "rgba(255,0,0,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"Revenue"}
                        // value={}
                    />
                </Space>
                <Row gutter={8}>
                    <Col span={8}>
                        <Card>
                            <DonutChart />
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card>
                            <ColumnChart />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </div>
    );
}
