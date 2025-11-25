import express from "express";

const authRouter = express.Router();

authRouter.get('/signup', (req, res) => res.send("Signup Route"));  // on the webpage
authRouter.get('/login', (req, res) => res.send("Login Route"));  // on the webpage
authRouter.get('/logout', (req, res) => res.send("Logout Route"));  // on the webpage     


export default authRouter;