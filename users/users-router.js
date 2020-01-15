const bcrypt = require("bcryptjs")
const express = require("express")
const usersModel = require("./users-model")

const router = express.Router()

function restricted() {
  const authError = {
    message: "Invalid credentials"
  }
  
  return async (req, res, next) => {
    try {
      // authorize the user here
      const { username, password } = req.headers
      if (!username || !password) {
        return res.status(401).json(authError)
      }
      
      const user = await usersModel.findBy({ username })
      .first()
      if (!user) {
        return res.status(401).json(authError)
      }

      const passwordValid = await bcrypt.compare(passord, user.password)
      if (!passwordValid) {
        return res.status(401).json(authError)
      }
      
      next()// if we reach this point, the user is authenticated.
    } catch (err) {
      next(err) //error parameter goes to the error index below.
    }
  }
}

router.get("/", async (req, res, next) => {
  try {
    const users = await usersModel.find()
    
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router
