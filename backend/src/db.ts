import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const User = new Schema({
    password: String,
    email: {type: String, unique: true},
    username: String,
})

export const UserModel = mongoose.model("users",User);