import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
}, {
    versionKey: false,
    timestamps: true,
}
);

const Review = mongoose.model("Review", reviewSchema)
export default Review;
