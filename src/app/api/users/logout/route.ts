import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json(
            {
                message:'Logout Successfully',
                success:true
            }

        )
                response.cookies.set("toke", "token", {
            httpOnly: true, maxAge:315360000000000 
            
        })
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
