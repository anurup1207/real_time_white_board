
const URLID=require('../model/urlId')

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
    HandleGenerateRoom,
}