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
    return res.render("home");
}

module.exports={
    getHomePage,
    HandleGenerateNewShortURL,
}