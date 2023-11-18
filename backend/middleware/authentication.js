const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

exports.authentication = async (req, res, next) => {
        const token = req.cookies.jwt;
        console.log(req.body);
        
        // If token is not present then is response message will displayed.
        if (!token) {
            console.log("token not found");
            return res.status(401).send({
                status: false,
                message: "User is Unauthorized",
            });
        }
        
        try {
            const decode = jwt.verify(
                token,
                process.env.JWT_SECRET
            )
            const {id} = decode
            console.log(id);
            console.log(req.body.userid);
            if(id === req.body.userid){
                console.log(token);
                next()
            }
            else{
                console.log(token);
                console.log("wrong jwt");
                return res.status(401).send({ msg: "User is Unauthorized" });
            }

        } catch (error) {
            res.status(500).send({ msg: "Error catch 1", error: error.message });
        }
}; 