const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne().sort({ createdAt: -1 });
        console.log('Latest User:', user);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
