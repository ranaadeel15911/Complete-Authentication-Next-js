// import {connect} from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import User from "@/model/userModel";
import connect from "@/dbConfig/dbConfig";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message:'User Not Founded By This Mail'})
        }

        //hash password

        //before giving message of User Created successfully we will send verification email

        await sendEmail({email, emailType: "RESET", userId: user._id})
/* from here we will provide email of user and after emailType and also savedUser id of mongodb */
        return NextResponse.json({
            message: "Sending Email To User gmail",
            success: true,
            user
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}