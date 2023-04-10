import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import React, { useState } from "react";

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

export default function UserList() {
    const columns = [
        { title: "ID User", dataIndex: "id", key: "id", width: 50 },
        { title: "first name", dataIndex: "firstName", key: "firstName  " },
        { title: "last name", dataIndex: "lastName", key: "lastName " },
        { title: "email", dataIndex: "email", key: "email" },
        { title: "phone", dataIndex: "phone", key: "phone" },
    ];

    const [users, setUsers] = useState(datafake);
    const [dataForm, setDataForm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleSearch = (value) => {};

    const handleExport = (value) => {};

    const handleNewPersonnel = (value) => {};

    return (
        <div className="User-List">
            <div className="menu-action d-flex mb-4">
                <div className="menu-action-left d-flex">
                    <Input.Search
                        placeholder="Tìm Kiếm"
                        onSearch={(value) => handleSearch(value)}
                    />
                </div>
                <div className="menu-action-right d-flex">
                    <Button icon={<FileExcelOutlined />} onClick={handleExport}>
                        Xuất Excel
                    </Button>
                    <Button
                        icon={<PlusOutlined />}
                        onClick={handleNewPersonnel}
                    >
                        Thêm
                    </Button>
                </div>
            </div>
            <Table
                pagination={{ pageSize: 8 }}
                dataSource={users}
                bordered
                columns={columns}
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
