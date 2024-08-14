const Review = require("../models/reviews");
const Listing = require("../models/listing");


module.exports.postReview = async (req, res, next) => {

    let listing = await Listing.findById(req.params.id)

    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    console.log(newReview);
    await listing.save();
    await newReview.save();
    console.log(`review saved to db`);
    req.flash("success", "Review Added!");
    res.redirect(`/listings/${req.params.id}`);
}


module.exports.destroyReview = async (req, res) => {

    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    req.flash("success", "Review Deleted!")
    res.redirect(`/listings/${id}`);
}