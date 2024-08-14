const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const Reviews = require("../controllers/reviews.js");





//review create/post route
router.post("/",isLoggedIn,validateReview, wrapAsync( Reviews.postReview));

//DELETE ROUTE FOR REVIEWS

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(Reviews.destroyReview))


module.exports = router;

