const mongoose = require("mongoose");
const urlSchema = mongoose.Schema(
    {
          urlId: {
            type: String,
            required: true,
          },
          orgUrl: {
            type: String,
            required: true,
          },
          shortUrl: {
            type: String,
            required: true,
          },
          users: 
            { type: mongoose.Schema.Types.ObjectId, 
              required: true,
             }
          ,
          note:{
            type:String,
          },
          clicks: {
            type: Number,
            required: true,
            default: 0,
          },
        
          date: {
            type: Object,
            default: Date.now,
          },      
    },
    { timestaps: true }
  );
const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
