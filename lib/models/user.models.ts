import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    name: String,
    imageUrl: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

