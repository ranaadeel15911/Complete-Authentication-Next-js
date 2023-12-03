import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const fetchDataFromToken = (request : NextRequest) =>{
try {
    const token = request.cookies.get("token")?.value || '';
    const decodedInformation:any = jwt.verify(token,process.env.TOKEN_SECRET!)
    /* in the devodedInformation we will have all the things we sent while log inwhich is user id email and username can see login route */
    /* we provide here any otherwise error will not leave at ine 7  */
    return decodedInformation.id
} catch (error:any) {
    console.log(error.message)
}
}