import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'
import { env } from "process";

@Injectable()
export class MailService{
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para outras portas
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: process.env.AUTH_USER,
      to,
      subject,
      text,
      html,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      throw new Error('Erro ao enviar e-mail: ' + error.message);
    }
  }
}