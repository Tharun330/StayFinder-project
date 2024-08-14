const Listing = require("./models/listing")
const listingSchema = require("./models/listing");
const Review = require("./models/reviews");
const reviewSchema = require("./models/reviews");


//SCHEMA SIDE VALIDATION USING JOI MIDDLEWARE
module.exports.validateListing = (req,res,next) =>{
    let {results} = listingSchema.validate(req.body.listing);

     if(results){
        let errorMessage = results.details.map((el) => el.message).join(",");
        throw new expressError(400,errorMessage)
     }else{
        next();
     }

}


//Reviews Section Code
module.exports.validateReview = (req,res,next) =>{
    let {results} = reviewSchema.validate(req.body.review);

     if(results){
        let errorMessage = results.details.map((el) => el.message).join(",");
        throw new expressError(400,errorMessage)
     }else{
        next();
     }

}





module.exports.isLoggedIn = (req,res,next) =>{
    console.log(req.path, "....", req.originalUrl);
    console.log("tharun")
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error",`You must be logged in, to Add Your Place`);
        return  res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let listData = await Listing.findById(id);
    if(!listData.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error",`You're not Owner of this post`);
        return res.redirect(`/listings/${id}`);
    }

    next();
}

module.exports.isReviewAuthor = async(req,res,next) =>{
    let {id,reviewId} = req.params;
    let reviewList = await Review.findById(reviewId);
    if(!reviewList.author._id.equals(res.locals.currentUser._id)){
        req.flash("error",`You're not Author of this Review`);
        return res.redirect(`/listings/${id}`);
    }

    next();
}
