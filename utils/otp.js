
const {User} = require('../models');
const nodemailer = require('nodemailer');



function Otp(){
    let otp = Math.random()*100000>>0;
  
    return otp;
}


let sendOtp = async (otp,mail)=>{

  
 let transporter = nodemailer.createTransport({
     service:'gmail',
     auth:{
         user:process.env.id,
         pass:process.env.pass
     }
 })

 let mailOptions = {
     from:process.env.id,
     to:mail,
     subject:'Mail from Oyester for otp',
     text:"Here is your otp is"+" "+otp
 }
 transporter.sendMail(mailOptions,function(err,info){
     if(err){
         console.log(err)
     }
    else{
        console.log(`Mail is sent ${info.response}`);
    } })
  
    
    let data = await User.findOne({
        where:{
            email:mail
        }
    })
     data.otp = otp;
     await data.save();

}
const generateOtp = async (mail,name)=>{

let otp = Otp();
console.log(otp)
await sendOtp(otp,mail);




}


module.exports ={
    generateOtp
}