const express = require("express");
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError");
const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const usersRoute = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");





const port = 9000;
// const mongoDB=process.env.mongoDB;
const DB_URL = process.env.ATLASDB_URL;
 
const Store = MongoStore.create({
    mongoUrl:DB_URL,
    crypto:{
        secret : process.env.SECRET,
    },
    touchAfter: 24 * 3600
})

Store.on("error",(err) =>{
    console.log(`error from mongo store`,err);
})

const sessionInfo = {
    store : Store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }

}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionInfo));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then(res => {
    console.log(`DataBase connection successful`);
}).catch(err => {
    console.log(`Error connecting with Database`);
})



async function main() {
    await mongoose.connect(DB_URL);
}


app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})



app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", usersRoute);



app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not Found"));
})


//Error Handler
app.use((err, req, res, next) => {
    let { status = 500, message = "Something wrong" } = err;

    res.status(status).render("listings/error.ejs", { err });
    // res.status(status).send(message);
})

app.listen(port, () => {
    console.log(`app listing at port ${port}`);
})