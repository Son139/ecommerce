import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

const comparePassword = async (password, passwordHashed) => {
    const isMatch = bcrypt.compare(password, passwordHashed);
    return isMatch;
};

const genToken = async (data) => {
    const verify = jwt.sign(data, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "2d",
    });
    return verify;
};

export { hashPassword, comparePassword, genToken };
