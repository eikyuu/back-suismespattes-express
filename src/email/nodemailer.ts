const nodemailer = require("nodemailer");
const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure:false,
    auth: {
        user: "v.duguet.dev@gmail.com",
        pass: "rydsxhecsokowkyb"
    }
}
const transporter = nodemailer.createTransport(config);

/**
 * Sends an email using the provided data.
 *
 * @param {object} data - The data for the email.
 * @param {function} callback - The callback function to handle the response.
 * @return {string} The response from sending the email.
 */
export const send = (data) =>  {
    transporter.sendMail(data, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Message sent: %s", info.response);
            return info.response
        }
    })
}
