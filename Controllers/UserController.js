const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
  return jwt.sign({_id},process.env.SECRET, {expiresIn : '3d'})
}

const login = async (req, res) => {
  const {email,password} = req.body
  const user = await User.findOne({ email }) 

  if (!user)
    return res.status(404).json("Email does'nt exist")
  
  if (password !== user.password)
    return res.status(404).json("wrong password")
  
  const token = createToken(user._id)
  res.status(201).json({ user: user.user ,token})
}


const signup = async (req, res) => {
  try {
    const exists = await User.findOne({ email:req.body.email }) 

    if (exists)
      return res.status(403).json("Email allrddy exists")
    
    const user = await User.create(req.body)

    if (user) {
      const token = createToken(user._id)
      res.status(201).json({ user:user.user, token })
    }
    else
      res.status(501).json("Error signing up")
  } catch (err) {
    res.status(404).json(err.message)
  }
}

module.exports = {
  login,
  signup
}