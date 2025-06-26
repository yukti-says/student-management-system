const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


// config .env
dotenv.config()

// connecting to database
// Connect to MongoDB and start the server using async/await with try-catch
const startServer = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🟢 MongoDB connected!");

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        // Handle connection errors
        console.log("MongoDB Error:", err);
    }
};

startServer();