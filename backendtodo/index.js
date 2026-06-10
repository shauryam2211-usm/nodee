const express=require("express");
const mongoose=require("mongoose")
const jwt= require("jsonwebtoken");
const JWT_SECRET="dgdfkjn@121"
const{UserModel,TodoModel}=require("./db");
mongoose.connect("mongodb+srv://shauryam2211_db_user:SHAURYAmishra@cluster0.qup4rir.mongodb.net/?authSource=admin");
const app = express();
app.use(express.json());
app.post("/signup",async function(req,res) {
    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;
    await UserModel.create({
        email : email,
        password : password,
        name : name
    })
    res.json({
            message: "you're logged in!"    
    })

});
app.post("/signin",async function(req,res){
    const email =req.body.email;
    const password=req.body.password;
    const user= await UserModel.findOne({
        email: email,
        password: password
    })
    if(user){
        const token= jwt.sign({
            id :user._id
        },JWT_SECRET);
        res.json({
            token : token
        });

    }
    else{
        res.status(403).json({
            message : "signin failed!"
        })
    }

});
app.todo("/todo",function(req,res){

});
function auth(req,res,next){
    const token=req.headers.token;
    const decodedData= jwt.verify(token,JWT_SECRET);
    if(decodedData){
        req.userID=decodedData.id;
        next();
    }else{
        res.json({
            message: "inccorect"
        })
    }
}
app.listen(3000);