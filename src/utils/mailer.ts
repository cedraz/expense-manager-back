import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  auth: {
    user: 'apikey',
    pass: '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'
  }
})