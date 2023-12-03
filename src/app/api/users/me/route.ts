import connect from "@/dbConfig/dbConfig";
import { fetchDataFromToken } from "@/helpers/fetchDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";

connect()

export async function GET(request:NextRequest){
try {
    // const userId = await fetchDataFromToken(request)
    /* We can use both of method means make a separate file like fetchDataFromToken and write code otherwise write these two line code
    14 and 15 */
    const token = request.cookies.get("token")?.value || ''
    const decodedInformation:any = jwt.verify(token,process.env.TOKEN_SECRET!)
     const user=await User.findOne({
        _id:decodedInformation.id
     }).select("-password -isAdmin")
    //  }).select("-password -isAdmin")
    /* this means get data without password and isAdmin */
    return NextResponse.json({
        message:'user found',
        data:user
    })
} catch (error:any) {
    return NextResponse.json({
        error:error.message
    },
    {status:400})
}
}