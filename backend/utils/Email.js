const nodemailer = require("nodemailer");
class sendEmail {
  constructor(url, user) {
    this.username = user.name;
    this.to = user.email;
    this.from = "ibendjellal2@gmail.com";
    this.url = url;
  }
  createTransport() {
    return nodemailer.createTransport({
      port: process.env.EMAIL_PORT,
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async sendEmail(sub, message) {
    const options = {
      from: this.from,
      to: this.to,
      subject: sub,
      text: message,
    };
    return await this.createTransport().sendMail(options);
  }
  async resetPassword() {
    await this.sendEmail("reset Password", `visite ${this.url}`);
  }
}

module.exports = sendEmail;
