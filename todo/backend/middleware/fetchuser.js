var jwt=require('jsonwebtoken');
const JWT_SECRET = 'SHYAMshyam@gmail'
 
const fetchuser=(req,res,next)=>{
    //  GET THE USER FROM THE JWT TOKEN AND add ID TO REQUEST OBJECT
    // yahe hum header sa hum token la rhe ha aur aga ka procedre kar rahe ha 
    const token=req.header('auth-token')
    if (!token) {
        res.status(401).send({error:"please authenticate using a valid  "})
    }
       
        try {
            const data=jwt.verify(token,JWT_SECRET)
            req.user=data.user;
            next();

        } catch (error) {
        res.status(401).send({error:"please authenticate using a valid  "})
             
        }
}


module.exports=fetchuser;