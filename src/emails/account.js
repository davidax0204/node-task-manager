const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email,name)=>
{
    sgMail.send({
        to: email,
        from: 'davidax5625@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. let me know how are getting alone with the app.`
        })
}

const sendCancellationEmail = (email,name)=>
{
    sgMail.send({
        to:email,
        from: 'davidax5625@gmail.com',
        subject: 'Sorry for cancellation',
        text : `Bye Bye from the app, ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}