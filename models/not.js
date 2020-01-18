const mongoose = require("mongoose");
const tarih = require("../controllers/tarih")
const moment = require("moment")



const productSchema = mongoose.Schema({
    dersler:Array,
    url:String,
    ortalama: Number,
    date: {
        type: Object,
        default: () => tarih()
    },
    ad: {
        type: String,
        default: "Anonim"
    }
});

module.exports=mongoose.model("Not",productSchema); // Product database'e products olarak kaydedilir.Otomatik "s" eklenir ve küçük harfe çevrilir.