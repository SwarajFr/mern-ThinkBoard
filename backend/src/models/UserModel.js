import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your Email Address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Your Password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },   
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
export default User;