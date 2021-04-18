const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aswals8991@gmail.com',
        subject: 'Welcome To QwertyAswal task-manager',
        text: `Thanks for joining, ${name}!!`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aswals8991@gmail.com',
        subject: 'Hey we heard that you cancelled',
        text: `Hello ${name}. Please help us improve by giving your valuable feedback.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}