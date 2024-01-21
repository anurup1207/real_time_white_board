
async function getSignupPage(req,res){
    return res.render('signup');
}

async function getLoginPage(req,res){
    return res.render("login");
}



module.exports ={
    
    getSignupPage,
    getLoginPage,
    
}