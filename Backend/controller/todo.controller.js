const { TodoModel } = require("../modals/todo.modals");
const getTodo = async(req,res)=>{
    try {
        const todo = await TodoModel.find()
        res.status(200).json({todo})
    } catch (error) {
       console.log(error);
       res.status(500).json({msg:"something went wrong"}) 
    }
}

const postTodo = async(req,res)=>{
    const { username,mobileNo,email,address,profilePic}= req.body;
    const  newTodo = new TodoModel({
        username,
        mobileNo,
        email,
        address,
        profilePic    
    });
    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"something went wrong"})    
    }

}

const todoput = async(req,res)=>{
       const id = req.params.id;
       const { username,mobileNo,email, address,profilePic}= req.body;
       const newTodo = {
        username,
        mobileNo,
        email,
        address,
        profilePic,
      }
       try {
        await TodoModel.findOneAndUpdate(id,newTodo,{new:true});
        res.status(200).json(newTodo);
       } catch (error) {
        console.log(error);
        res.status(500).json({msg:"something went wrong"})
       }
}
const tododelete = async(req,res)=>{
    const id=req.params.id;
    try {
        const todo = await TodoModel.findOneAndRemove(id);
        res.status(202).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"something went wrong"})
    }
}
module.exports={
    postTodo,
    getTodo,
    todoput,
    tododelete
    
}