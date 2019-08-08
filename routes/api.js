const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

router.post('/checkUserEmail',async (req, res, next) => {
  console.log(req.body.email)
  let queryResult = await UserModel.find({
    email: req.body.email
  });
  console.log(queryResult);
  if(queryResult.length > 0) {
    res.json({
      error: 1,
      msg: 'User with same email already exists'
    });
  } else {
    res.json({
      error: 0,
      msg: 'This email is available'
    });
  }

  return;
});

module.exports = router;
