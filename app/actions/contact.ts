"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${formData.name}" <${process.env.SMTP_USER}>`,
    to: "kaalbhairavy@gmail.com",
    replyTo: formData.email,
    subject: `Contact from ${formData.name}`,
    text: `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    html: `
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <br/>
      <p>${formData.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
