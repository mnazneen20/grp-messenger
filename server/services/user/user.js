import express from 'express';
import User from './userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userRouter = express.Router();

// new user registration route.
userRouter.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    // console.log(email, username, password)
    const hashed = await bcrypt.hash(password, 10);
    try {
        const newuser = await User.create({ username, email, password: hashed });
        console.log(newuser)
        delete newuser.password;
        return res.status(201).json({
            msg: "user successfully registered",
            user: newuser,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong" });
    }
});

// user login route
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const finduser = await User.findOne({ email: email });
        if (!finduser) return res.status(404).json({ msg: "user not found" });
        const matchpass = bcrypt.compare(password, finduser.password);
        if (!matchpass) return res.status(401).json({ msg: "invalid credentials" });
        delete finduser.password;
        const token = jwt.sign({ id: finduser._id }, process.env.JWT_SECRET);
        res.cookie(process.env.TOKEN_NAME, token, {
            httpOnly: true,
            expires: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)),
        });
        return res.status(200).json({
            msg: "login seccessful",
            user: finduser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong" });
    }
});

userRouter.get('/me', async (req, res) => {
    const cookiee = req.cookies?.mychatapp;
    if (!cookiee) return res.status(404).json({ messege: 'not authorized' })
    const user = jwt.decode(cookiee, process.env.JWT_SECRET);
    try {
        const me = await User.findById(user.id);
        res.status(200).json({ user: me });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
});

userRouter.get('/logout', (req, res) => {
    res.clearCookie(process.env.TOKEN_NAME, {
        httpOnly: true,
        expires: new Date(Date.now()) //immidiate cookie excursion.
    });
    return res.status(200).json({ messege: 'logout successful' });
})

export default userRouter;