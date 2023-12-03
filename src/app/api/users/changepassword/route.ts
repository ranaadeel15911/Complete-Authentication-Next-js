import connect from "@/dbConfig/dbConfig";
import { fetchDataFromToken } from "@/helpers/fetchDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request:NextRequest,content:any){
    
try {
    const reqBody = await request.json()
   const {id,password} = reqBody
   const user = await User.findById(id)
   console.log(user)
   const salt = await bcryptjs.genSalt(10)
   const hashedPassword = await bcryptjs.hash(password, salt)
   const result = await User.findByIdAndUpdate(id, 
    {password: hashedPassword})
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "20d"})

    const response = NextResponse.json({
        message: "Password Changed Successfull",
        success: true,
        result
    })
    response.cookies.set("token", token, {
        httpOnly: true, maxAge:315360000000000 
        
    })
    return response;
// return NextResponse.json({result,success:true})
} catch (error:any) {
    return NextResponse.json({
        error:error.message
    },
    {status:400})
}
}