const express = require('express');
const http = require('http');
const {sequelize , User} = require('./models');
const { generateOtp } = require('./utils/otp')
const bcrypt =require('bcrypt');



const app = express();
const server = http.createServer(app);

const { checkIfUserExists , checkIfUserverified } = require('./utils/user')

app.use(express.json());


app.post('/api/v1/register', async(req,res)=>{
try{
    let {name , email,password,device,ip_address ,time } = req.body;



    let exists =await checkIfUserExists(email);
   

    if(!exists){
      
        let hashedPassword = await bcrypt.hash(password,10);
        let verified = "No";
        let appear_order = await User.findAll({
           
            attributes:[[sequelize.fn('max',sequelize.col('appearance_order')),'appearance_order']]
        })
        let appearance_order = appear_order[0].appearance_order+1;
       
        let Data = await User.create({
            name,email,password:hashedPassword,device,ip_address,verified,time,appearance_order
        })
       
        let sendOtp = await generateOtp(email,name);

        return await res.json({
            ResgisteredData :Data,
            Otp:sendOtp
        })

    }
    else{
        let verified = await checkIfUserverified(email);
        if(!verified){

            let data = await User.findOne({
                where:{
                    email:email
                }
            })
            data.device = device;
            data.time=time;
            data.ip_address=ip_address;

            await data.save();

            let send = await generateOtp(email,name);
            res.json({
                status:"sucess",
                otp:"Otp is sent"
            })

        }
        else{
            return await res.json({
                error:"Data already present in databse"
            })
        }
    }
}
catch(err){
    console.log(err);
 res.json({
     status:"fail",
        Error:err
    })
}

})




app.post('/api/v1/login',async (req,res)=>{
try{
    let {  email , password } = req.body;

    let exists = await checkIfUserExists(email);
    if(!exists){
        await res.json({
            status:"fail",
            Error:"Data is not present"
        })
    }
    else{
        let verified = await checkIfUserverified(email);
        if(!verified){
            res.json({
                Error:"Data is not present in database"
            })
        }
        else{
            
            let user =await User.findOne({
                where:{
                    email:email
                }
                ,raw:true
            })

            let hashedPassword = await bcrypt.compare(password,user.password);
          
            if(email == user.email && hashedPassword == true){
                res.json({
                    status:"login successfully"
                }) 
            }
            else{
                res.json({
                    Error:"Please check your email or password"
                })
            }
                  
        }
    }

}
catch(err){
    console.log(err)
    res.json({
        Error:err
    })
}
    



})


app.post("/api/v1/forgot_password" ,async (req,res)=>{

try{

let { email , password } = req.body;

let data = await User.findOne({
    where:{
        email:email
    }
})

let hashedPassword = await bcrypt.hash(password,10);

data.password = hashedPassword;

await data.save();

res.json({
    status:"Password Successfully update"
})


}
catch(err){
    console.log(err)
    res.json({
        Error:err
    })
}

})



Port = process.env.port || 8080;
server.listen(Port,()=>{
    sequelize.authenticate()
    .then(()=>{
        console.log("Database created")
    })
    .then(()=>{
        console.log(`Server is started at port ${Port}`)
    })
    .catch((err)=>{
        console.log(err)
    })
})