const generatetoken = require("../../config/generateToken");
const User= require ("../../model/User");
const bcrypt = require('bcryptjs');
const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        res.status(400).send("fill all details");
        return ;
    }

    const userExit = await User.findOne({ email });
    if (userExit) {
        res.send("already");
       return ;
    }

    const doc = await User.create({
        name: name,
        email: email,
        password: password,
        pic: pic,
    })
    if (doc) {
        // console.log(doc);
        const data ={
            _id: doc.id,
            name: doc.name,
            email: doc.email,
            password:doc.password,
            pic: doc.pic,
            token: generatetoken(doc.id),
        }
        res.status(201).json(data);
        // console.log(data);
    }
    else {
        res.send('registration failed');
        return
    }


}


const autho = async(req,res)=>{
    const {email,password} = req.body;
    // console.log(email);
    const userExit = await User.findOne({email});
    if(userExit && (await bcrypt.compare(password,userExit.password))){
        const data = {
            _id: userExit.id,
            name: userExit.name,
            email: userExit.email,
            pic: userExit.pic,
            token: generatetoken(userExit.id),
        }
        res.status(201).json(data);
        // res.status(201);
        console.log(data);
    }
    else {
        res.send("invalid")
        // console.log('invalid');
    }
}    

module.exports = {registerUser,autho}
