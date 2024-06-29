import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        // Verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        console.log("Error in Auth Middleware", error);
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message,
        });
    }
}

export { authenticate };
