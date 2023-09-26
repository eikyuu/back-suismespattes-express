const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const config = {
    name: process.env.SMTP_NAME,
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
}
const transporter = nodemailer.createTransport(config);

transporter.use('compile', hbs({
    viewEngine: {
        layoutsDir: path.resolve('src/email/views/'),
        partialsDir: path.resolve('src/email/views/'),
        defaultLayout: false,
    }, viewPath: path.resolve('src/email/views/')
}));


/**
 * Sends an email using the provided data.
 *
 * @param {object} data - The data for the email.
 * @returns {Promise<string>} A promise that resolves with the response from sending the email.
 */
export const send = async (data: object): Promise<string> => {
    try {
        const info = await transporter.sendMail(data);
        console.log("Message sent: %s", info.response);
        return info.response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
