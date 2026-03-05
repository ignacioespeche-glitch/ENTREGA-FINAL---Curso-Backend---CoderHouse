import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html
    });

    console.log("Mail enviado correctamente");
  } catch (error) {
    console.error("Error enviando mail:", error.message);
    throw error;
  }
};