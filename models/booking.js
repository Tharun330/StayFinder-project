const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingRef : {
        type : Number,
        required : true

    },
    totalprice :{
        type : Number,
        required: true
    },
    hotelId :{
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
    customer : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
});

const Booking = new mongoose.model("Booking",bookingSchema);

module.exports = Booking;