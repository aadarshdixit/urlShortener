const Url = require("../../model/Url");
const searchRoutes = async (req,res)=>{
    const keyword  = req.query.key? {
        $or: [
          { orgUrl: { $regex: req.query.key, $options: "i" } },
          { shortUrl: { $regex: req.query.key, $options: "i" } },
          { note: { $regex: req.query.key, $options: "i" } },
        ],
      }
    : {};
    const allUrl =  await Url.find(keyword).find({users:req.user.id})
    res.send(allUrl);
}


const searchAllRoutes = async (req,res)=>{
  const allUrl =  await Url.find({users:req.user.id})
  res.send(allUrl);
}


const updateNote = async(req,res)=>{
   const {id,newNote} = req.body;
   const update = await Url.findByIdAndUpdate(id,{note:newNote},{new:true});
   if(!update){
    res.send("not update");
   }
   else res.send(update)
}
module.exports = {searchRoutes,searchAllRoutes,updateNote};