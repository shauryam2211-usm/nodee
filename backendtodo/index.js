const bcrypt=require("bcrypt");
const express=require("express");
const { z } = require("zod");
const mongoose=require("mongoose")
const jwt= require("jsonwebtoken");
const JWT_SECRET="dgdfkjn@121"
const{UserModel,TodoModel}=require("./db");
mongoose.connect("mongodb+srv://shauryam2211_db_user:SHAURYAmishra@cluster0.qup4rir.mongodb.net/?authSource=admin");
const app = express();
app.use(express.json());
app.post("/signup", async function(req,res) {
   const requestBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(5),        
    });
    const parsedRequest = requestBodySchema.safeParse(req.body);
    if (!parsedRequest.success) {
        return res.status(400).json({
            message: "Invalid request body",
            error: parsedRequest.error.errors
        });
    }
    const { email, password, name } = parsedRequest.data;
    try {
        const hashedpassword = await bcrypt.hash(password, 5);
        console.log(hashedpassword);
        await UserModel.create({
            email: email,
            password: hashedpassword,
            name: name
        });
        res.json({
            message: "duplicate mail"
        });
    } catch(e) {
        res.status(500).json({
            message: "signup failed",
            error: e.message
        });
    }
});
app.post("/signin", async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({
        email: email
    });
    if (!user) {
        return res.status(403).json({
            message: "signin failed!"
        });
    }
    const passwordmatch = await bcrypt.compare(password, user.password);
    if(passwordmatch){
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "signin failed!"
        });
    }
});
app.post("/todo", auth, function(req,res){
    res.json({ message: "todo route" });
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