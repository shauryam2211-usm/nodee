const express=require('express');
const jwt=require('jsonwebtoken');
const JWT_SECRET='RANDOM_TOKEN_SECRET';
const app=express();
app.use(express.json());
function generateToken(payload){
    return jwt.sign(payload,JWT_SECRET,{expiresIn:'1h'});
}
const memo=[];

app.post('/signin',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;   
    memo.push({username,password});
    res.json({message:'User signed in successfully'});
});

app.post('/signup',(req,res)=>{  
    const username=req.body.username;
    const password=req.body.password;
    memo.push({username,password});
    let founduser=null; 
    for(let i=0;i<memo.length;i++){
        if(memo[i].username===username && memo[i].password===password){
            founduser=memo[i];
            break;
        }   
    }
    if(founduser){
       const token=jwt.sign({username:username},JWT_SECRET,{expiresIn:'1h'});
       res.json({token:token});
    }else{
        res.status(401).json({message:'Invalid credentials'});
    }   
});
function auth(req,res,next) {
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_SECRET);
    if(decodedData.username) {
        next()
    }
    else{
        res.json({
            message : "you are not logged in" 
            
        })
    }
}
//always put token in header
app.get('/me',auth,function(req,res){
   // const token=req.headers['authorization'];

    for(let i=0;i<memo.length;i++){
        if(memo[i].username===username){    
            return res.json({username:memo[i].username,password:memo[i].password});
        }   

    }
    res.status(401).json({message:'Invalid token'});
}           
);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});