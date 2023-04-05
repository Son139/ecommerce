import db from "../../models";
import { hashPassword, genToken } from "../auth";
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
            console.log("token", token);
            resolve({
                // check: response,
                // err: token ? 0 : 2,
                // msg: token
                //     ? "Register is successfully !"
                //     : "Phone number has been aldready used !",
                // token: token || null,
                err: response[1] !== false && response[1] !== null ? 0 : 2,
                msg:
                    response[1] !== false && response[1] !== null
                        ? "Register is successfully!"
                        : "Phone number has already been used!",
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

export { createUser };
