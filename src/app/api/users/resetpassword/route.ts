import connect from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/model/userModel";

connect()


export async function POST(request : NextRequest){
try {
    const reqBody = await request.json()
    const {token} = await reqBody
    console.log(token);
    const user = await User.findOne({
        forgotPasswordToken:token,
        forgotPasswordTokenExpiry:{$gt:Date.now()}
    })
    /* So here it will check the given token is matching with the new User which we created now during sign up and also verifyTokenExpiry
    is greater than the time now if yes than it will go ahead here ahead meaning agay jana */
    if (!user) {
        return NextResponse.json({
            error:"invalid Token"
        },{status:400})
    }
    console.log(user)
    /* If user found than make isVerified true and also make  verifyToken and verifyTokenExpiry undefined because we no longer need of them  */
    user.isAdmin = true;
    user.forgotPasswordToken= undefined;
    user.forgotPasswordTokenExpiry=undefined;
    await user.save();
/* and than save */
    return NextResponse.json({
        data:user,
        success:true
    })
} catch (error:any) {
    return NextResponse.json({
        message:error.message
    },{status:500})
}
}