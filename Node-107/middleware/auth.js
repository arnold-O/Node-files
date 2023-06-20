const jwt = require('jsonwebtoken')





const auth = (req, res, next)=>{
    // console.log(req.cookies)
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // token in Header
      token = req.headers.authorization.split(" ")[1] || req.cookies.token
    }
    if (!token) {

        return res.status(403).json({message:"Not authorized to access this route"});
      }

      try {

        const decode = jwt.verify(token, process.env.SECRET_KEY_JWT)
        req.user = decode
        
      } catch (error) {

        return res.status(401).json({message: 'Invalid token'})
        
      }
      next()

}

module.exports = auth