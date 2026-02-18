import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendMail = async (to, ticket) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Compra realizada",
    html: `
      <h1>Gracias por tu compra</h1>
      <p>Código de ticket: ${ticket.code}</p>
      <p>Total: $${ticket.amount}</p>
      <p>Fecha: ${ticket.purchase_datetime}</p>
    `
  });
};
