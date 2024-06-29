/**
 * Middleware function to authorize requests based on allowed roles.
 *
 * @param {Array} allowedRoles - An array of allowed roles.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void}
 */

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.user;

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
        next();
    };
};

export default authorize;
