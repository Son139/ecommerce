import { Card, Space, Statistic } from "antd";
import React from "react";

export default function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space
                direction="horizontal"
                style={{ width: "250px", height: "100px" }}
            >
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}
