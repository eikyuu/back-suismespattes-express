const nodemailer = require("nodemailer");
const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure:false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
}
const transporter = nodemailer.createTransport(config);

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
