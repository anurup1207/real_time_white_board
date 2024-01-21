const User= require('../model/user');

async function handleUserSignup(req,res){
    
    const {name,email,password} = req.body;
    // console.log(req.body);
    await User.create({
        name,
        email,
        password,
    });
    
    return res.render("home");
}

async function handleUserLogIn(req,res){
    
    const {email,password} = req.body;
    const user = await User.findOne({email,password});

    if(!user){
        return res.render("signup",{
            error: "Invalid UserName and LogIn",
        });
    }
    
    
    
    return res.render("home");
}


module.exports = {
    handleUserSignup,
    handleUserLogIn,
}