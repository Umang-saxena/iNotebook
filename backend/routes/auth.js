const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');  
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');


const JWT_SECRET = "UmangSaxena@";  //JWT secret variable for using  jwt web token
//Route 1: Create a User using: POST "/api/auth/createuser". No Login required

router.post("/createuser", [
    body('name').isLength({ min: 3 }).withMessage(" Enter a Valid Name"),
    body('email').optional().trim().isEmail().withMessage('Not a valid e-mail address'),
    body('password').isLength({ min: 5 }).withMessage("Password must be atleast 5 characters"),
], async (req, res) => {
// Empty Nmae Validtions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  try {
      // Returnig bad reqeust and errors if there are errors
      const { name, email, password } = req.body; //Array Destructuring of req.body
      
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error:" Sorry !! A User with same email already exists" });
      }
      
      
        const salt= await bcrypt.genSalt(10);
        const securedPassword= await bcrypt.hash( password,salt );
        const user = new User({
          name,
          email,
          password: securedPassword //Schema is ecpecting a variable names password so we have to use password:secuedPassword instead of securedPassword 
        });
        const data={
          id: user.id
        }
        const authToken= jwt.sign( data, JWT_SECRET );
        res.json({ authToken });
        await user.save();
        return res.status(201);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Some Error occured" );
      }
    }
  );

// Route 2: Create a User using: POST "/api/auth/login". No Login required

router.post("/login", [
  // Data Valifations using express-validator
  body('email').optional().trim().isEmail().withMessage('Not a valid e-mail address'),
  body('password').exists().withMessage("Password must be atleast 5 characters"),
], async (req, res) => {
  // Checking Error in th entered data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body; //Array Destructuring of req.body
  try {
    let user= await User.findOne({email});
    if( !user ){
      return res.status(400).json({error:"Double Check the Entered Credentials"});
    }
    
    const passwordCompare= await bcrypt.compare(password,user.password);
    if( !passwordCompare ){
      return res.status(400).json({error:"Double Check the Entered Credentials"});

    }
    // Sending Data
    const data={
      id: user.id
    }
    const authToken= jwt.sign( data, JWT_SECRET );
    res.json({ authToken });

  } catch (error) {
    console.error(error);
        return res.status(500).send("Internal Server Error Occured" );
        
      }
      
      
    })  
    
    
// Route 3: Getting Logged in User Details using: POST "/api/auth/getuser". Login required
//  Here we are going to user middleware fetchuser .This fetchuser we have to use everyrime whenever we use authentication in any route .Thats why we are seperating it to mnaintain code readability
router.post("/getuser",fetchuser, async (req, res) => {
try {
  const userId=req.user.id;
  const user= await User.findById(userId).select( "-password" );  // -password will not send password to the response body
  res.send(user);
} catch (error) {
  console.error(error);
      return res.status(500).send("Internal Server Error Occured" );
}
});
module.exports = router


