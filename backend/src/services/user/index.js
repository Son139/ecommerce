import db from "../../models";
import { hashPassword, genToken, comparePassword } from "../auth";
import { v4 } from "uuid";

const createUser = ({ firstName, lastName, phone, email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { phone },
                defaults: {
                    lastName,
                    firstName,
                    email,
                    phone,
                    password: await hashPassword(password),
                    id: v4(),
                },
            });

            const token =
                response[1] &&
                (await genToken({
                    id: response[0].id,
                    phone: response[0].phone,
                }));
            // console.log("token", token);
            resolve({
                // check: response,
                err: token ? 0 : 2,
                msg: token
                    ? "Register is successfully !"
                    : "Phone number has been aldready used !",
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

const loginService = ({ phone, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { phone },
                raw: true,
            });

            const isCorrectPassword =
                response &&
                (await comparePassword(password, response.password));
            const token =
                isCorrectPassword &&
                (await genToken({
                    id: response.id,
                    phone: response.phone,
                }));
            // console.log("token", token);
            resolve({
                check: isCorrectPassword,
                err: token ? 0 : 2,
                msg: token
                    ? "Login is successfully !"
                    : "Phone number has been aldready used !",
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

export { createUser, loginService };
