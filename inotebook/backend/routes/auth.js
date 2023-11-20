const express=require('express');
const User = require('../models/User');
const router=express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcryptjs')
const jwt=require('jsonwebtoken') 
const fetchuser =require('../middleware/fetchuser') 
const JWT_SECRET = 'SHYAMshyam@gmail'




// Route 1: create a user using: POST "/api/auth/createuser"    Doesnt require auth yahe par ham create kar rhae ha user ko siliya
//   hame is par ppost request marni ha data bejhana ha  
//
router.post('/createuser',[
    body('email','Enter a valid email').isEmail(), 
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Enter a valid password').isLength({ min: 5 }),],
    async (req, res) => {
      let success=false;
  //  if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // create user aur usma value dal rahe ha express-validator ki madad sa  
    // check weather the user with this email already exist aur not 
    try {
    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success,error : " sorry a user with this email already exists !!!"})
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash( req.body.password,salt);     
    // create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password:secPass 
    })
    const data={
      user:{
        id:  user.id
      }
    }
    const authtoken=  jwt.sign(data,JWT_SECRET);
  success=true;
    // res.send(user);
    res.send({success,authtoken});
  
  } catch (error) {
       console.error(error.message)
       res.send(500).send("some error occured");
    }
})








// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx---------------------------------------------------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



// Route 2: Login a user using: POST "/api/auth/login"    NO login required 

router.post('/login',[  
  body('email','Enter a valid email').isEmail(),  
  body('password','password cannot be blank').exists()],  

  async (req, res) => {

    let success=false;
    //  if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
      // User wala collection ma check karenge ki ya email exist kar rahe ha ki nahi yadi kar rahe ha //to aga badege
      let user=await User.findOne({email});
      if(!user){
        return res.status(404).json({error:"Please try to login with correct credentials"});
      }
      // password compare kar rahe ha ki wo exist kar rah e ha ki sahi ha compare method ki shayta sa 
      const passwordCompare= await bcrypt.compare(password,user.password); 
      if(!passwordCompare){
        return res.status(404).json({success,error:"Please try to login with correct credentials"}); 
      }
      const data={
        user:{
          id:  user.id
        }
      }
      const authtoken=  jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken});


    } catch (error) { 
      console.error(error.message)
      res.send(500).send("internal server  error occured");
    }
  })


  // *******************************_------------------------------_****************************

// Route 3:   Get loggedn in user details using : Post   "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    const userId=req.user.id;
    const user=await User.findOne(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured")
  }
})


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjYTg5OWJjNGVlMzAzODFhOGEyMDdjIn0sImlhdCI6MTY5MTEzNzE4MX0.DMfKNi1vGNmxaT5cjEb7o4oyVegph146JKm9nu-rN8w













module.exports=router   

































// router.post('/',(req,res)=>{
//     // res.send("yooo shyam")
//     console.log(req.body)
//     const user=User(req.body);
//     user.save()
//     res.send(req.body)
// })


      // .then(user => res.json(user))
      // .catch(err=>{
      //   console.log(err)
      //   res.json({error:'Please enter a unquie email '})
      // })


