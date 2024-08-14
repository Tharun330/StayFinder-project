const express = require("express");
const router = express.Router();
const User = require("../models/user");
const expressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { name } = require("ejs");
const { saveRedirectUrl, loginPath } = require("../middleware");
const Users = require("../controllers/users.js");

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");

};

module.exports.userRegistration = async (req, res, next) => {

    try {

        let { name, username, email, password } = req.body;

        let newUser = new User({
            email,
            name,
            username

        });
        let regUser = await User.register(newUser, password)
        console.log(regUser);
        //AUTOMATIC LOGIN CODE AFTER CLIENT SIGNUP 
        req.login(regUser, (err) => {

            if (err) {
                return next(err);
            }

            req.flash("success", `Welcome to StayFinder! ${name}`);
            res.redirect("/listings");

        })


    } catch (err) {
        req.flash("error", `${err.message}`);
        res.redirect("/signup");
    }

}



module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
}


module.exports.checkLoginCredentails = async (req, res) => {
    req.flash("success", `Welcome back! ${req.user.name}`);
    console.log(`asdfg ${res.locals.redirectUrl}`)
    let redirectUrl = res.locals.redirectUrl || "/listings"
    console.log(redirectUrl);
    res.redirect(redirectUrl);
}


module.exports.userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }

        req.flash("success", `You logged out!`);
        res.redirect("/listings");
    })
}

module.exports.edituserdetailsform = async(req,res,next) =>{

    let id = req.params.id;
    console.log(id);
    let user = await User.findById(id);
    console.log(user);
    // res.send('edit account details');
    res.render("users/edituser.ejs",{user})


}

module.exports.updateuser = async(req,res,next) =>{
    let {id} = req.params;
    let {name,username,email} = req.body.user;
    console.log(name,username,email)
    let user = await User.findByIdAndUpdate(id,{...req.body.user});
    console.log(req.user.username);
    if(req.user.username == username){
        req.flash("success", "Your Details updated! Successfully");
        res.redirect(`/listings/${id}/myaccount`);
    }else{

        req.flash("success", "Your Username updated! Successfully try to login again");
        res.redirect(`/listings`);
    }
   
}