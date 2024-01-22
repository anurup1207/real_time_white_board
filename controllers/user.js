const User= require('../model/user');
const {setUser}=require('../service/auth')
const {v4 : uuidv4}=require('uuid');


async function handleUserSignup(req,res){
    
    const {name,email,password} = req.body;
    // console.log(req.body);
    await User.create({
        name,
        email,
        password,
    });
   


    
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
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/home");
}


module.exports = {
    handleUserSignup,
    handleUserLogIn,
}