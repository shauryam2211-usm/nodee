    const mongoose=require("mongoose");
    const Schema = mongoose.Schema;
    const ObjectId=mongoose.ObjectId; 
    const user=new Schema({
        email:{ type:String,unique:true},
        password:String,
        name:String
    });
    const Todo=new Schema({
        title: String,
        done: Boolean,
        userId: ObjectId,

    })
    const UserModel= mongoose.model('user',user);
    const TodoModel=mongoose.model('todo',Todo);

    module.exports={
         UserModel: UserModel,
        TodoModel : TodoModel
    };