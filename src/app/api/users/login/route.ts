// import {connect} from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connect from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

connect()

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            console.log('User does not exist Please try again')
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        if(!user.isVerified){
            console.log('You Should Firstly verify your email')
return NextResponse.json({error: "Firstly verify your email"}, {status: 500})
        }
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "20d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, maxAge:315360000000000 
            
        })

        
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

