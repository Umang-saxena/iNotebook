// const jwt = require('jsonwebtoken');

// const JWT_SECRET = "UmangSaxena@";

// // These 3 parameters aree compulsary in middleware functions
// const fetchuser=( req,res,next )=>{
//     // Get the use from jwt Token and add id to req object
//     const token= req.header('auth-token');
//     if( !token ){
//         res.status( 401 ).send({error: "Please Authenticate using correct credentials"});
//     }
//     try {
//         const data=jwt.verify(token, JWT_SECRET);
//         req.user=data;

//     } catch (error) {
//         res.status( 401 ).send({error: "Please Authenticate using correct credentials"});

//     }
//     next();
// }

// module.exports=fetchuser;

const jwt = require('jsonwebtoken');
const JWT_SECRET = "UmangSaxena@";

const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');
  
  // If there's no token, return an error
  if (!token) {
    return res.status(401).json({ error: "Access Denied! Please authenticate." });
  }

  try {
    // Verify the token
    const data = jwt.verify(token, JWT_SECRET);
    // Attach the user object to the request
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ error: "Access Denied! Invalid token." });
  }
};

module.exports = fetchuser;
