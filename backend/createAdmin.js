const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminExists = await User.findOne({ email: 'admin@test.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        const user = await User.create({
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@test.com',
            passwordHash: 'password123',
            role: 'ADMIN'
        });

        console.log('Admin created:', user);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
