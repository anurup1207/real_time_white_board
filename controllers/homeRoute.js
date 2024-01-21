
async function getHomePage(req,res){
    return res.render("home");
}

module.exports={
    getHomePage,
}