/* First of all install npm install nodemailer and this nodemailer will be attach with mailtrap through website of mailtrap*/
                                                              /* mailtrap  */
/* Go to mailtrap and than go to integration at that by default will be cUrl and click and selcet nodemailer here  */                                                     
/* after go to nodemailer website you can see documentation than go back to mail trap and copy bechind this after making logic can
see mailer.ts 
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9e8178ce3039ba",
    pass: "********02ae"
  }
});*/


/* search js on google and than open console and write window.location.search you will see after the question mark the query  */

/* First make mailer.ts in helper */
/* Secondly created verifyEmail(route.ts) in api/users */
/* Than go to signup page of route.js in api/users */

                      /* So the whole sanerio to understand verify User with email is that  */
/* Firstly see sign up page where we called to sendEmail function which is in mailer.ts file the purpose to call sendEmail was that 
we wants to grab some data on behalf of newly created user so we took email , emailType and userId which stored mongodb in itself
after taking go to mailer.ts file and see after grabing required things like email,emailType etc... we made hashed token on behalf of 
userId of user of mongodb and than find user by userId and updated it by function findOneAndUpdate we gave verifyEmail:hashedToken and
verifyEmailExpiry:Date.now() and than defined transport which will send email and our password of mailtrap inbox of nodemailer 
than we created mailOption where we stored to from subject and html and in html we gave link of out domain and in token we gave 
hashed token which we created on behalf of id and than we will await for sending sendEmail will send to mailOption which we created
that sit here mailtrap working finished and now after this   */                      
                      /* we will make in api/users a emailVerify routes.ts here we know we will get data from body so we used 
request.json and will get token from body as we know and than we will approve this by wrthing verifyToken:token which we got and
 verifyTokenExpiry:{$gt:Date.now()} by this we will find in database that this type of token we found or not if yes than 
 is verified true otherwise say invalid token and than after make a verifyemail page.js where we will make token we will send to 
 api/users/verifyEmail and will send this route as a body than we will get query by window.location.search.split('=).[1] by this
 we will get token as we know by spliting there become array of two if this 
 https://localhost/query?=js&rlz=1C1VDKB_en-GBPK1069PK1069&oq=js&gs_lcrp=EgZjaHJvbWUqBggAEEUY  will be 
 [(1)https://localhost/query? , (2)js&rlz=1C1VDKB_en-GBPK1069PK1069&oq=js&gs_lcrp=EgZjaHJvbWUqBggAEEUY] in deep see api deep video
 of sir naveed we can see how can get data from query 
 than after we will  get token and this token will go as a post method to api/users/verifyEmail and next procedure we know */