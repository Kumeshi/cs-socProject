const express = require('express')
const userRoutes = express.Router()
const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

userRoutes.post('/add', async (req, res) => {
  const user = new User(req.body)

  const check = await User.findOne({ email: user.email })
  console.log(user)
  if (check == null) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user
      .save()
      .then((result) => {
        console.log(result)
        res.json('successfully registered')
      })
      .catch((err) => console.log(err))
  } else {
    res.json('already registered')
  }
});


userRoutes.get('/check/:email/:password', async (req, res) => {
  const findId = await User.findOne({
    email: req.params.email,
    //admin_password: req.params.password,
  })
  //console.log(findId)
  const validPassword = await bcrypt.compare(
    req.params.password,
    findId.password
    
  )
  console.log(validPassword)
  if (validPassword) {
    res.send('done')
  } else {
    res.send('incorrect')
  }
});

userRoutes.get('/check2/:email', async (req, res) => {
  const findId = await User.findOne({
    user_email: req.params.email,
    //admin_password: req.params.password,
  })

  res.send(findId)
});

userRoutes.put('/update/:id',async(req,res)=>{
  const update =await User.findOneAndUpdate({ _id: req.params.id },
        { $set: req.body },
    )
    res.send(update?"success":"failed")
});

userRoutes.delete('/delete/:id',async(req,res)=>{
  const user =  await User.findOne({ _id: req.params.id})
const dele = await User.findByIdAndDelete(
  { _id: req.params.id})
  console.log(user)
  res.send(user?"success":"failed");
});
userRoutes.get('/userdetails', async (req, res) => {
  const findId = await User.find()
    res.send(findId)
});

module.exports = userRoutes
