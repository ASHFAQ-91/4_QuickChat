// npm init -y
// npm install express mongoose jsonwebtoken bcryptjs dotenv cookie-parser nodemon
// npm install --save-dev nodemon
import express from "express";
import dotenv from "dotenv";
import "dotenv/config"
import authRouter from "./routes/authRoutes.js";

// Initialize Express App
const app = express()

// Routes
app.use('/api/auth', authRouter);   




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))  // on the Terminal

//$ npm run server - to start the project.
// By using "process.env.PORT || 3000", you create a single codebase that functions seamlessly both locally (on port 3000) and in production environments (using the required dynamic port assigned by services like Heroku, AWS Elastic Beanstalk, or Azure App Service).
// Primary file you can name = "server.js" or "index.js" or "app.js" or "main.js" or "backend.js".