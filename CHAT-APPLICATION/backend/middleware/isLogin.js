import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("ye hai token :-> " + token);

        if (!token) {
            return res.status(500).send({
                success: false,
                message: "User unauthorized"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(500).send({
                success: false,
                message: "User unauthorized -Invalid Token"
            })
        }

        // ⭐ ONLY FIXED — await added, -password used
        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found"
            })
        }

        req.user = user; // ⭐ now req.user is actual object
        next();

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error
        })
    }
}

export default isLogin;