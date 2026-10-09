const cron = require('node-cron');
const userModel = require('../models/user.model');
const emailService = require('../services/email.service');

// Schedule tasks to be run on the server.
// Runs every day at 08:00 AM
console.log('Cron jobs initialized: Daily birthday and anniversary checks scheduled for 08:00 AM.');
cron.schedule('0 8 * * *', async () => {
    console.log('Running a job at 08:00 AM to check for birthdays and anniversaries');
    
    const today = new Date();
    const currentMonth = today.getMonth() + 1; 
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();

    try {
        const users = await userModel.find({});

        for (const user of users) {
            // Check Birthday
            if (user.dob) {
                const dob = new Date(user.dob);
                if (dob.getMonth() + 1 === currentMonth && dob.getDate() === currentDay) {
                    await emailService.sendBirthdayEmail(user.email, user.name);
                }
            }
            if (user.createdAt) {
                const createdAt = new Date(user.createdAt);
                if (createdAt.getMonth() + 1 === currentMonth && createdAt.getDate() === currentDay) {
                    const years = currentYear - createdAt.getFullYear();
                    if (years > 0) { // Only send anniversary if it's been at least 1 year
                        await emailService.sendAccountAnniversaryEmail(user.email, user.name, years);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error running daily email cron job:", error);
    }
});

module.exports = cron;