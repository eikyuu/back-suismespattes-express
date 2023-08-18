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
