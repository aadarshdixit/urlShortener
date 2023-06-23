
const shortid = require('shortid');
const QRcode = require('qrcode');
const Url = require('../../model/Url');
const User = require('../../model/User');
const urlRoutes =async (req,res)=>{
    // console.log(req.user);
    const domain ="http://localhost:5000/api";
     const {orgUrl,note} = req.body;
     let doc = await Url.findOne({orgUrl,note});
     if(doc){
        res.send(doc);
     }
     else {
        const urlId = shortid.generate();
        const shortUrl = `${domain}?id=${urlId}`;
        try {
            doc = await Url.create({
                orgUrl,
                shortUrl,
                urlId,
                note,
                users:req.user.id,
                date: new Date(),
              })
              res.send(doc)
              console.log(doc);
        } catch (error) {
            console.log(error.message);
        }
     }
}

module.exports = {urlRoutes};