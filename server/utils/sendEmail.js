import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendEmail(settings) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PW,
            }
        });

        await transporter.sendMail({
            from: `${process.env.EMAIL}`,
            to: settings.receiver,
            subject: settings.subject,
            // text: "something went wrong",
            html: settings.html,
        });

        return Promise.resolve('mail has been sent');

    } catch (err) {
        return Promise.reject('mail has been NOT sent');
    }
}

export default sendEmail;