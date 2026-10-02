import mongoose from "mongoose"
import express from "express"
import {UserModel} from "./db"
import "dotenv/config";
import jwt from "jsonwebtoken"
const app = express()
const JWT_SECRET = process.env.JWT_SECRET

app.use(express.json())
mongoose.connect(process.env.MONGO_URL!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));


app.post("/signup",async(req,res)=> {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    try {
        await UserModel.create({
            email: email,
            password:password,
            username: username
        })
        return res.status(200).json({
            message:"You are signed up."
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
          message: "User already exits"
        });
      }
})
app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const response = await UserModel.findOne({
            email: email,
            password: password
        });

        if (!response) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const token = jwt.sign(
            {
                id: response._id.toString()
            },
            JWT_SECRET!
        );

        return res.status(200).json({
            message: "You are signed in.",
            token
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

app.listen(3000);