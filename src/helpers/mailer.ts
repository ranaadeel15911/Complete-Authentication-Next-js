import nodemailer from 'nodemailer';
// import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import User from '@/model/userModel';

/* SMTP IS Simple Mail Transfer Protocol */
export const sendEmail = async({email, emailType, userId}:any) => {
/* here email is where to send email and emailType is type e.g forgot password or verify use and userId will be the id of user may be
mongodb id */    
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
/* here userId will come from database and provided 10 rounds that it will create first 10 to hash value and also applied .toString function
because we not sure that user will directly change userId in bson format  */
        if (emailType === "VERIFY") {
            /* here we will first time add verifyToken and verifyTokenExpiry we can see in usermodel we defined it but not as a required
            state that were not in our required list so here we know update fnction of mongodb if the updated material exist than
            it will update otherwise will add as a new in userModel we defind it but not in {} curly braces so here it will become 
            part of mandatory  */
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9e8178ce3039ba",
              pass: "524280159702ae"
            }
          });
/* createTransport will help to where to send data in that is mailtrap  */

        const mailOptions = {
            from: 'adeel@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
            </p>`
        }
        /* Here we used process.env.DOMAIN saved in .env as if we hosting than we will add hosting domain  */

/* This will help what type of message we will get from to and subject will be on top when we will open message we can see
Verify your email or Reset password at the top  */
        const mailresponse = await transport.sendMail(mailOptions);
/* here it means transport will send mailOption so it will take time used await  */        
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}