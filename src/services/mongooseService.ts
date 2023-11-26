// In a new file, e.g., `mongooseService.js` in the `services` directory

const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;
