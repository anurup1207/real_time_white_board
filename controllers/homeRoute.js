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
    const allIds = await URLID.find({createdBy:req.user._id});
    return res.render("home1",{
      ids : allIds,
      roomURL : process.env.baseURL,
    });
}

module.exports={
    getHomePage,
    HandleGenerateNewShortURL,
}