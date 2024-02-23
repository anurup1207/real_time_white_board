const shortid = require("shortid");
const URLID=require('../model/urlId')

async function HandleGenerateNewShortURL(req, res) {
  const body = req.body;
  
  const shortID = shortid();

  await URLID.create({
    id: shortID,
    createdBy:req.user._id,
  });

  return res.json({ id: shortID });
}

async function getHomePage(req,res){
  if(req.user){
    const allIds = await URLID.find({createdBy:req.user._id});
    return res.render("home",{
      islogin: true,
      ids : allIds,
      roomURL : process.env.baseURL,
      user:req.user.name,
    });
  }else{
    return res.render("home",{
      islogin:false,
      ids:[],
      roomURL:process.env.baseURL,
      user:"NA",
    });
  }
}

module.exports={
    getHomePage,
    HandleGenerateNewShortURL,
}