const mongoose = require("mongoose");
const listingData = require("./data");
const Listing =require("../models/listing");

main().then(res =>{
    console.log("connected to database");
}).catch((err) =>{
    console.log("err");
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/stayFinder');
} 


const initDB = async () =>{
    await Listing.deleteMany({});
    listingData.data = listingData.data.map((obj) =>({...obj,owner:"66a2eaf9b67513068764aed8"}))
    await Listing.insertMany(listingData.data);

    console.log("Data inserted");
}

initDB();