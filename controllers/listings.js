const expressError = require("../utils/expressError");
const Listing = require("../models/listing");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodeClient = mbxGeoCoding({accessToken :mapToken})
const Booking = require("../models/booking");
const User = require('../models/user');



module.exports.index = async (req, res, next) => {
    const dataList = await Listing.find();

    res.render("listings/index.ejs", { dataList });

};


module.exports.addPlaceForm = (req, res) => {
    console.log(req.user);


    res.render("listings/new.ejs")
}


module.exports.showIndividualPost = async (req, res, next) => {

    let { id  } = req.params;

    const data = await Listing.findById(id).populate({ path: 'reviews', populate: { path: 'author', } }).populate('owner');

    console.log(data);
    console.log(data.geometry.coordinates);
    if (!data) {
        // next(new expressError(409,"No such data found"));
        req.flash("error", "Post you are looking for does not exist");
        res.redirect("/listings/:id");
    }

    res.render("listings/show.ejs", { data });

};


module.exports.newPost = async (req, res, next) => {
    // let {title,description,image,price,location,country} = req.body;
   let response = await geoCodeClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, filename);
    let {category, country} = req.body.listing;
    console.log(category);
    console.log(country.toUpperCase());

    if (!req.body.listing) {
        next(new expressError(400, "Try to send valid data"));
    }

    let newData = new Listing(req.body.listing);

    newData.owner = req.user._id;
    newData.image = { url, filename };
    newData.geometry = response.body.features[0].geometry;
    newData.country = country.toUpperCase();
    let saveData =await newData.save();
    console.log(saveData);


    req.flash("success", "Your Posting added successfully");


    res.redirect("/listings");
};


module.exports.editPostForm = async (req, res, next) => {
    let { id } = req.params;
    let post = await Listing.findById(id)
    let editFormImage = post.image.url;
   
    if (!post) {
       
        req.flash("error", "Post you are requested for does not exist");
        res.redirect("/listings");
    }
     console.log(editFormImage)
     
     editFormImage = editFormImage.replace("/upload","/upload/h_70,w_100");

    res.render('listings/edit.ejs', { post,editFormImage });
}


module.exports.updatePost = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {

        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    
    req.flash("success", "Your post updated! Successfully");
    res.redirect(`/listings/${id}`);
}


module.exports.destroy = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Post Deleted! Successfully");
    res.redirect('/listings');
}

module.exports.book = async(req,res,next) =>{
    let {id} = req.params;
    console.log('mod gud');
    console.log(id);
    let book = await Listing.findById(id);
    console.log(book);
    res.render("listings/booking.ejs",{book});

}

module.exports.bookingconfirm = async (req,res,next) =>{
   let {id} = req.params;

   let userId = req.user;
   console.log(`Customer ${userId.id}`)
   console.log(id);
   console.log(req.body);
   let bookedHotel = await Listing.findById(id);
   let totalprice = bookedHotel.price *.20 + bookedHotel.price;
   let bookingRefNO = Math.floor(Math.random() *99999999999999);
   console.log(`bookingRef ${bookingRefNO}`);
   let booking = new Booking({
    bookingRef : bookingRefNO,
    totalprice : totalprice,
    hotelId    : bookedHotel._id,
    customer   : userId.id
   });

   let confirmedBooking =  await booking.save();
   console.log(confirmedBooking);

    res.render(`listings/bookingconfirm.ejs`,{confirmedBooking});
}

module.exports.mybookings = async(req,res,next) =>{

    let userId = req.user;
    console.log(userId)
  
    let myBookings = await Booking.find({customer: userId}).populate('hotelId');
    console.log(myBookings);
    res.render('listings/mybookings.ejs',{myBookings});
}

module.exports.myaccount = async(req,res,next) =>{

    let userId = req.user.id;
    console.log(userId);
   let accountDetails = await User.findById(userId)
   console.log(accountDetails);
    res.render("listings/myaccount.ejs",{accountDetails});


}




module.exports.rooms = async (req,res,next) =>{
    let data = await Listing.find({category :'Rooms'});
    console.log(data);
     res.render("listings/rooms.ejs",{data});
}

module.exports.iconiccity = async (req,res,next) =>{
    let data = await Listing.find({category :'IconicCity'});
    console.log(data);
     res.render("listings/iconiccity.ejs",{data});
}

module.exports.mountains = async (req,res,next) =>{
    let data = await Listing.find({category :'Mountains'});
    console.log(data);
     res.render("listings/mountains.ejs",{data});
}

module.exports.castles = async (req,res,next) =>{
    let data = await Listing.find({category :'Castles'});
    console.log(data);
     res.render("listings/castles.ejs",{data});
}

module.exports.amazingpools = async (req,res,next) =>{
    let data = await Listing.find({category :'AmazingPool'});
    console.log(data);
     res.render("listings/amazingpools.ejs",{data});
}

module.exports.camping = async (req,res,next) =>{
    let data = await Listing.find({category :'Camping'});
    console.log(data);
     res.render("listings/camping.ejs",{data});
}

module.exports.arctic = async (req,res,next) =>{
    let data = await Listing.find({category :'Arctic'});
    console.log(data);
     res.render("listings/arctic.ejs",{data});
}

module.exports.farms = async (req,res,next) =>{
    let data = await Listing.find({category :'Farms'});
    console.log(data);
     res.render("listings/farms.ejs",{data});
}

module.exports.beachfront = async (req,res,next) =>{
    let data = await Listing.find({category :'BeachFront'});
    console.log(data);
     res.render("listings/beachfront.ejs",{data});
}


module.exports.search = async(req,res,next) =>{
    let {search} = req.body; 
    let results = await Listing.find({country:search.toUpperCase()});
    console.log(search.toUpperCase());
    console.log(results);
    res.render("listings/search.ejs",{results ,search});
}