// npm init -y
// npm install express mongoose jsonwebtoken bcryptjs dotenv cookie-parser nodemon
// npm install --save-dev nodemon
import express from "express";
import "dotenv/config"

// Initialize Express App
const app = express()

// Routes
app.get('/', (req, res) => res.send("Server is running"));  // on the webpage
app.get('/api/auth/signup', (req, res) => res.send("Signup Route"));  // on the webpage
app.get('/api/auth/login', (req, res) => res.send("Login Route"));  // on the webpage
app.get('/api/auth/logout', (req, res) => res.send("Logout Route"));  // on the webpage



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))  // on the Terminal

//$ npm run server - to start the project.
// By using "process.env.PORT || 3000", you create a single codebase that functions seamlessly both locally (on port 3000) and in production environments (using the required dynamic port assigned by services like Heroku, AWS Elastic Beanstalk, or Azure App Service).