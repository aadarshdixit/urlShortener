const Url = require("../../model/Url");

// api?id="id"
const indexRoutes =async (req,res)=>{
    // console.log(`${req.query.id}`);
    try {
        const url = await Url.findOne({ urlId: req.query.id});

        if (url) {
          await Url.updateOne(
            {
              urlId: req.params.urlId,
            },
            { $inc: { clicks: 1 } }
          ).populate("users","-password");
           res.redirect(url.orgUrl)
        } else res.status(404).json('Not found');
      } catch (err) {
        res.status(500).send(err.message);
      }
}

module.exports = {indexRoutes};