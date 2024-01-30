const User= require('../model/user');
const {setUser}=require('../service/auth')
const {v4 : uuidv4}=require('uuid');


async function handleUserSignup(req,res){
    
    const {name,email,password} = req.body;
    // console.log(req.body);
    const user = await User.create({
        name,
        email,
        password,
    });
   
    
    const token = await setUser(user);
    res.cookie("uid",token);
    
    
    return res.redirect("/home");
}

async function handleUserLogIn(req,res){
    
    const {email,password} = req.body;
    const user = await User.findOne({email,password});

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