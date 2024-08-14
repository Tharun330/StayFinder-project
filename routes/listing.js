if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });   // const upload = multer({ dest: "uploads/" });




router
    .route("/")
    .get(wrapAsync(ListingController.index))   //INDEX ROUTE
    .post(isLoggedIn,
         upload.single('listing[image]'),
         validateListing,
         wrapAsync(ListingController.newPost)) //UPLOAD NEW LIST TO DATABASE or CREATE ROUTE
 

//SEARCH 
router.post('/search',wrapAsync(ListingController.search));

//CREATE ROUTE ,TO ADD NEW PLACE
router.get("/new", isLoggedIn, ListingController.addPlaceForm);

//TO GET SPECIFIC ROOM CATEGORY LIST
router.get('/rooms',wrapAsync(ListingController.rooms));

//TO GET SPECIFIC ICONICCITY CATEGORY LIST
router.get('/iconiccity',wrapAsync(ListingController.iconiccity));

//TO GET SPECIFIC MOUNTAIN CATEGORY LIST
router.get('/mountains',wrapAsync(ListingController.mountains));

//TO GET SPECIFIC CASTLES CATEGORY LIST
router.get('/castles',wrapAsync(ListingController.castles));

//TO GET SPECIFIC AMAZINGPOOLS CATEGORY LIST
router.get('/amazingpools',wrapAsync(ListingController.amazingpools));

//TO GET SPECIFIC CAMPING CATEGORY LIST
router.get('/camping',wrapAsync(ListingController.camping));

//TO GET SPECIFIC ARCTIC CATEGORY LIST
router.get('/arctic',wrapAsync(ListingController.arctic));

//TO GET SPECIFIC FARMS CATEGORY LIST
router.get('/farms',wrapAsync(ListingController.farms));

//TO GET SPECIFIC BEACHFRONT CATEGORY LIST
router.get('/beachfront',wrapAsync(ListingController.beachfront));




router
    .route("/:id")
    .get(wrapAsync(ListingController.showIndividualPost))   //SHOW INDIVIDUAL PLACE ROUTE
    .put(upload.single('listing[image]'),isOwner,validateListing, wrapAsync(ListingController.updatePost))  //UPDATE POST ROUTE
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroy))  //DESTROY POST ROUTE



//EDIT THE POST
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(ListingController.editPostForm));


//BOOK THE HOTEL
router.get('/:id/book', isLoggedIn, wrapAsync(ListingController.book));

//BOOKING CONFIRM THE HOTEL
router.post('/:id/bookingconfirm', isLoggedIn, wrapAsync(ListingController.bookingconfirm));

//MYBOOKINGS ROUTE
router.get('/:id/mybookings',isLoggedIn,wrapAsync(ListingController.mybookings));

//MYACCOUNT
router.get('/:id/myaccount',isLoggedIn,wrapAsync(ListingController.myaccount));



//DESTROY POST ROUTE
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(ListingController.destroy));

// router.delete('/:id', isLoggedIn, isOwner, wrapAsync(ListingController.destroy));



module.exports = router;





















//saved these routes for future reference

//INDEX ROUTE
// router.get("/", wrapAsync(ListingController.index));

//CREATE ROUTE ,TO ADD NEW PLACE
// router.get("/new", isLoggedIn, ListingController.addPlaceForm);


//SHOW INDIVIDUAL PLACE ROUTE
// router.get("/:id",wrapAsync(ListingController.showIndividualPost));

// //UPLOAD NEW LIST TO DATABASE or CREATE ROUTE
// router.post("/",validateListing, wrapAsync(ListingController.newPost));

//EDIT THE POST
// router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(ListingController.editPostForm));

//UPDATE POST ROUTE
// router.put("/:id",validateListing,isOwner, wrapAsync(ListingController.updatePost));



//DESTROY POST ROUTE
// 