import {
    ExportOutlined,
    HomeOutlined,
    ImportOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Input, Table } from "antd";
import React, { useEffect, useState } from "react";

import "./index.scss";
import Title from "antd/es/typography/Title";

const datafake = [
    {
        firstName: "John",
        lastName: "Doe",
        phone: "0333444666",
        email: "john@gmail.com",
        id: "1",
    },
    {
        firstName: "John 2",
        lastName: "Doe 2",
        phone: "0333444667",
        email: "john2@gmail.com",
        id: "2",
    },
];

const { RangePicker } = DatePicker;

export default function CustomerList() {
    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 100 },
        { title: "Avatar", dataIndex: "avatar", key: "avatar", width: 100 },
        { title: "First Name", dataIndex: "firstName", key: "firstName  " },
        { title: "Last Name", dataIndex: "lastName", key: "lastName " },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "email", dataIndex: "email", key: "email" },
        { title: "phone", dataIndex: "phone", key: "phone" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: " CreatTime", dataIndex: "createdTime", key: "createdTime" },
        { title: "Operation", dataIndex: "operation", key: "openration" },
    ];

    const [users, setUsers] = useState([]);
    const [dataForm, setDataForm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setUsers(datafake);
            setLoading(false);
        }, 500);
    }, []);

    const handleSearch = (value) => {};

    const handleExport = (value) => {};

    const handleNewPersonnel = (value) => {};

    return (
        <div className="User-List">
            <div className="menu-action d-flex mb-4">
                <div className="menu-action-left d-flex">
                    <Button icon={<HomeOutlined />} size="medium" />
                    <Input.Search
                        placeholder="Tìm Kiếm"
                        onSearch={(value) => handleSearch(value)}
                        allowClear
                        size="medium"
                        style={{ width: "auto" }}
                        // enterButton=""
                    />
                    <div className="menu-action-left d-flex">
                        <RangePicker size="medium" />
                        <Button type="primary" size="medium">
                            Search
                        </Button>
                        <Button size="medium">Reset</Button>
                    </div>
                </div>
                <div className="menu-action-right d-flex">
                    <Button
                        icon={<ExportOutlined />}
                        size="medium"
                        onClick={handleExport}
                    >
                        Export Excel
                    </Button>
                    <Button
                        icon={<ImportOutlined />}
                        size="medium"
                        onClick={handleExport}
                    >
                        Import Excel
                    </Button>
                    <Button
                        icon={<PlusOutlined />}
                        onClick={handleNewPersonnel}
                        size="medium"
                    >
                        Create
                    </Button>
                </div>
            </div>
            <Table
                pagination={{ pageSize: 8 }}
                dataSource={users}
                bordered
                columns={columns}
                loading={loading}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            setDataForm(record);
                            setModalOpen("edit");
                        },
                    };
                }}
            ></Table>
        </div>
    );
}
