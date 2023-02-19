const nodemailer = require("nodemailer");
// SMTP_HOST = 'smtp.gmail.com'
// SMTP_PORT = 587
// SMTP_USER='balashkotestevgen@gmail.com'
// SMTP_PASS='balu1989res123'
// API_URL = 'http://localhost:5000/

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: "balashkotestevgen",
        pass: "dgoivegnptymyowp",
      },
    });
  }

  async sendActivationMail(to, link) {
    this.transporter.sendMail({
      from: "balashkotestevgen@yandex.ru",
      to,
      subject: `Активация твоего аккаунта `,
      text: "",
      html: `
          <div>
          <h1> Перейдите по ссылке </h1>
          <a href=${link}>Жмяк!</a>
          </div>
      `,
    });
  }
}

module.exports = new MailService();
