import * as authService from "../services/user";

const register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !phone || !password)
            return res.status(400).json({
                err: 1,
                msg: "Missing input",
            });
        const response = await authService.createUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(500)
            .json({ error: -1, message: "Fail at auth controller" });
    }
};

const login = async (req, res) => {
    const { phone, password } = req.body;

    try {
        if (!phone || !password)
            return res.status(400).json({
                err: 1,
                msg: "Missing input",
            });

        const response = await authService.loginService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(500)
            .json({ error: -1, message: "Fail at auth controller" });
    }
};

export { register, login };
