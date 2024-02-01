const User= require('../model/user');
const {setUser}=require('../service/auth')
const {v4 : uuidv4}=require('uuid');
const {hashSync}=require("bcrypt")


async function handleUserSignup(req,res){
    
    const {name,username,password} = req.body;
    // password=hashSync(password,10);
    
    const user = await User.create({
        name :name,
        username:username,
        password : hashSync(password,10),
    });
    
   
    
    // const token = await setUser(user);
    // res.cookie("uid",token);
    
    
    return res.redirect("/home");
}

async function handleUserLogIn(req,res){
    
    const {username,password} = req.body;
    const user = await User.findOne({username,password});

    if(!user){
        return res.render("signup",{
            error: "Invalid UserName and LogIn",
        });
    }
    
    const token = await setUser(user);
    console.log(token)
    res.cookie("uid",token);
    return res.redirect("/home");
}


module.exports = {
    handleUserSignup,
    handleUserLogIn,
}