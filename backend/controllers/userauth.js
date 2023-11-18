const userSchema = require("../models/UserModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv");

dotenv.config();

const hashpass = async (password) =>{
    const salt = 10;
    const res = await bcrypt.hash(password, salt);
    return res;
}

const compare = async (userpass, hashpass) =>{
    const res = await bcrypt.compare(userpass, hashpass);
    return res;
}

exports.addUser = async (req,res) => {
    // console.log(req.body);
    const {username, email} = req.body;
    const password = await hashpass(req.body.password);
    const users = userSchema({
        username, 
        email,
        password
    })
  
    try {
        if(!username || !email || !password) 
            return res.satus(400).json({message : "All fields are requried!"})
        await users.save();
        res.status(200).json({message : "User Added"})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.loginUser = async (req, res) =>{
    // console.log(req.body);
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message : "Enter valid string"});
    }
    
    try{
        const check = await userSchema.findOne({username : username , email : email})
        const passCheck = await compare(password, check.password)

        if(check && passCheck) { 
            const id = check._id.toString();
            const token = jwt.sign({id}, process.env.JWT_SECRET);
            // console.log("jwt cookie is created");
            // console.log(token);
            res.cookie("jwt", token, {
                expires : new Date(Date.now() + 2589200000),
                httpOnly : true,
                secure : true,   
                sameSite: 'none'
            }).json({token, check, message : "Login successful"});
        }
    }
    catch(err){
        res.status(400).json({message : err})
    } 
}