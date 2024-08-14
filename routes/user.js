const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const Users = require("../controllers/users.js");




//SIGNUP ROUTE
router.get("/signup", Users.signupForm);

//REGISTRATION ROUTE
router.post("/signup", Users.userRegistration);

//LOGIN ROUTE
router.get("/login", Users.loginForm);

//LOGIN ROUTE
router.post("/login",
    saveRedirectUrl,
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureFlash: true
        }), Users.checkLoginCredentails)

//LOGOUT ROUTE
router.get("/logout", Users.userLogout)

//EDIT ACCOUNT DETAILS FORM
router.get('/user/:id/edituserdetails', wrapAsync(Users.edituserdetailsform)); 

router.put('/user/:id',wrapAsync(Users.updateuser))
 
module.exports = router;