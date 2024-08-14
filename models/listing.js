const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./reviews");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
         url:String,
         filename : String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true

    },
    country: {
        type: String,
        required: true

    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        //   required: true
        },
        coordinates: {
          type: [Number],
        //   required: true
        }
      },
      category:{
        type:String,
        enum:['Rooms','IconicCity','Mountains','Castles','AmazingPools','Camping','Arctic','Farms','BeachFront'],
        
      }


})

listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing.reviews.length){
        console.log("deletion Middleware");
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
   
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;