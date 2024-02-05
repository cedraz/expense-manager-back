import nodemailer from 'nodemailer'
import { env } from 'process'

export const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  auth: {
    user: 'apikey',
    pass: env.API_KEY
  }
})