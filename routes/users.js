let express = require('express');
let router = express.Router();
let request = require("sync-request");
// Model :
let UserModel = require('../models/users');

/* ROUTES */

/* ACCOUNT ACCESS */

/* POST Signup Page */
router.post('/signup', async function(req, res, next) {
  let email_check = await UserModel.findOne({ email:req.body.email });
  if (!email_check) {
    newUser = await addUser(req); 
    req.session._id = newUser._id;
    req.session.user_name = newUser.user_name;
    res.redirect('/weather');
  } else {
    req.session.message = req.body.email +': this email already has an account. Please log in.';
    res.render('login', { message: req.session.message });
  }
});

/* POST Signin Page */
router.post('/signin', async function(req, res, next) {
  let login_check = await UserModel.findOne({email: req.body.email, password:req.body.password});
  console.log("sign in ", login_check);
  if (login_check) {
    req.session._id = login_check._id;
    req.session.user_name = login_check.user_name;
    res.redirect('/weather');
  } else {
    req.session.message = 'There is no account linked to this email and password.'
    res.redirect('/');
  }
});

/* GET Logout Page */
router.get('/logout', function(req, res, next) {
  req.session._id = null;
  req.session.user_name = null;
  req.session.message = null;
  res.redirect('/');
});

/* FUNCTION */
addUser = async (req) => {
  newUser = new UserModel({
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
  });
  await newUser.save();
  return newUser;
}

module.exports = router;
