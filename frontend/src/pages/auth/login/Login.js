import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";

import { apiRegister } from "../../../services/auth/auth";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import "./index.scss";

export default function Login() {
    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });
    const dispatch = useDispatch();

    const [isRegister, setIsRegister] = useState(true);

    const onFinish = () => {};
    const onFinishFailed = () => {};

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPayload((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log(payload);
        dispatch(actions.register(payload));
        const response = await apiRegister(payload);
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img
                        src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
                        alt="Login"
                    />
                </div>

                <Form
                    name="login-form"
                    layout="vertical"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p className="form-title">
                        {isRegister ? "Register" : "Login"}
                    </p>

                    <Row gutter={10}>
                        <Col span={12}>
                            {isRegister && (
                                <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!",
                                        },
                                    ]}
                                >
                                    <Input
                                        name="firstName"
                                        placeholder="Enter Name"
                                        value={payload.firstName}
                                        onChange={handleChange}
                                        style={{ width: "190px" }}
                                    />
                                </Form.Item>
                            )}
                        </Col>
                        <Col span={12}>
                            {isRegister && (
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!",
                                        },
                                    ]}
                                >
                                    <Input
                                        name="lastName"
                                        placeholder="Enter Name"
                                        value={payload.lastName}
                                        onChange={handleChange}
                                        style={{ width: "190px" }}
                                    />
                                </Form.Item>
                            )}
                        </Col>
                    </Row>

                    {isRegister && (
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input
                                name="phone"
                                placeholder="Enter Phone Number"
                                value={payload.phone}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </Form.Item>

                    {isRegister && (
                        <Form.Item
                            label="Confirm Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                            />
                        </Form.Item>
                    )}

                    <Form.Item name="remember" valuePropName="checked">
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleSubmit}
                        >
                            {isRegister ? " Register" : " Login"}
                        </Button>
                        {isRegister ? (
                            <span
                                onClick={() => {
                                    setIsRegister(false);
                                    setPayload({
                                        phone: "",
                                        password: "",
                                        name: "",
                                    });
                                }}
                                style={{ cursor: "pointer", color: " #1677ff" }}
                            >
                                Login Now
                            </span>
                        ) : (
                            <span
                                onClick={() => {
                                    setIsRegister(true);
                                    setPayload({
                                        firstName: "",
                                        lastName: "",
                                        phone: "",
                                        password: "",
                                        name: "",
                                    });
                                }}
                                style={{ cursor: "pointer", color: " #1677ff" }}
                            >
                                Register Now
                            </span>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
