const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    coupon: {
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: String,
        enum : ["FLAT","PERCENTAGE"]
        },
    issueDate :{
        type: Date,
        required: true
        },
    expiryDate:{
        type: Date,
        required: true
    },
    minimumOrderAmount :{
        type:Number,
    },
    maximumDiscountAmount :{
        type:Number
    },
    discountPercentage: Number, 
    }, { timestamps: true })

module.exports = mongoose.model('Coupons', couponSchema)