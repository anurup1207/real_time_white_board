const shortid = require("shortid");
const URLID=require('../model/urlId')
async function HandleGenerateNewShortURL(req, res) {
  const body = req.body;
  
  const shortID = shortid();

  await URLID.create({
    id: shortID,
  });

  return res.json({ id: shortID });
}

async function HandleGenerateRoom(req,res){
  const id = req.params.id;
  const user = await URLID.findOne({id});
  const mydata={
    'id':id,
  }
    if(!user){
      return res.redirect('/home')
  }
  return res.render("index",{data:mydata});

}

module.exports={
    HandleGenerateNewShortURL,
    HandleGenerateRoom,
}