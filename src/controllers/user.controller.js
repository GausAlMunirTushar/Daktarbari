import User from "../models/user.model.js";

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            status: true,
            message: "User updated Successfully",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Failed to update",
            error: err.message,
        });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "account deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Failed to delete",
        });
    }
};

const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({
            status: true,
            message: "User Found",
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            message: "user not found",
        });
    }
};

const getAllUser = async (_req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            status: true,
            message: "All Users found",
            data: users,
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            message: "user not found",
        });
    }
};

export { updateUser, deleteUser, getSingleUser, getAllUser };
