
const URLID=require('../model/urlId')

async function HandleGenerateRoom(req,res){
  const id = req.params.id;
  const user = await URLID.findOne({id});
  
    if(!user){
      return res.redirect('/home')
  }
  
  const mydata={
    'id':id,
    'user':req.user.name,
    'user_email':req.user.username,
  }
  return res.render("index",{data:mydata});

}

module.exports={
    HandleGenerateRoom,
}