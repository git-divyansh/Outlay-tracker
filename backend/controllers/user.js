const userSchema = require("../models/UserModel");

// exports.getUser = async (req,res) => {
//     const {id} = req.params;
//     userSchema.findById(id)
//     .then((user)=>{
//         res.status(200).json({message: 'user found'});
//     })
//     .catch((err) => {
//         res.status(200).json({message: 'not found'});
//     })
// }