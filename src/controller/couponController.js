const couponModel = require('../models/couponModel.js');
// Validations////////*////
const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidPlan = function(type){
    return ["FLAT","PERCENTAGE"].indexOf(type) !== -1
}
const dateRegex = (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)

//******************************Create Api */
const createCoupons = async function (req,res){
    try{
        let requestBody =req.body
        if(!isValidRequestBody(requestBody)){
            return res.status(400).send({status:false,Message:"Request Body should not be empty"})
        }
        let {type, issueDate, expiryDate, minimumOrderAmount, maximumDiscountAmount, discountPercentage} = requestBody;
        if(!isValid(type)){
            return res.status(400).send({status:false,Message:"Type parameter should not be empty"})

        }
        if(!isValidPlan(type)){
            return res.status(400).send({status:false,Message:"Type parameter should only be flat or percentage"})

        }
        if(!isValid(issueDate)){
            return res.status(400).send({status:false,Message:"Issue Date parameter should not be empty"})

        }
        if(!dateRegex.test(issueDate)){
            return res.status(400).send({status:false,Message:"Date is in incorrect format"})
        }
        if(!isValid(expiryDate)){
            return res.status(400).send({status:false,Message:"Expiry Date parameter should not be empty"})

        }
        if(!dateRegex.test(expiryDate)){
            return res.status(400).send({status:false,Message:"Date is in incorrect format"})
        }
        if(!isValid(minimumOrderAmount)){
            return res.status(400).send({status:false,Message:"minimumOrderAmount parameter should not be empty"})

        }
        if(!isValid(maximumDiscountAmount)){
            return res.status(400).send({status:false,Message:"maximumDiscountAmount parameter should not be empty"})

        }
        function randomString(length, chars) {/**Referred from stackover flow (https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript) */
            var result = '';
            for (var i = length; i > 0; --i)
             result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var coupon = randomString(5, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        const counDetails = {
            coupon,
            issueDate : issueDate ?  issueDate : new Date(),
            expiryDate,
            minimumOrderAmount,
            maximumDiscountAmount,
            type,
        }

        if(type ==="PERCENTAGE") {
          counDetails['discountPercentage'] = discountPercentage
        }
        const subsData = await couponModel.create(counDetails)
        return res.status(200).send({status:true,msg:"Created",data:subsData})
 
    }catch(err){
        return res.status(500).send({status:false,Message:err.message})
    }

}

// const listCoupons = async function (req, res) {

// }


// const applyCoupon = async function(req,res) {


//     const { orderAmount, coupon} = req.body
//     //Validation code here

//     const couponDetails = await couponModel.findOne({coupon})
//     if(!couponDetails){

//     }
//     const {expiryDate, maximumDiscountAmount, minimumOrderAmount, type , discountPercentage} = couponDetails

//     const isCouponValid = Date.now(expiryDate) >  Date.now()

//     if(!isCouponValid) {
//         //code
//     }

//     if( type === "PERCENTAGE") {
//         let discountAmount = (discountPercentage/100)* orderAmount

//         discountAmount =( discountAmount >maximumDiscountAmount) ? maximumDiscountAmount : discountAmount
//         return res.status(200).send({status: true,  finalAmount: discountAmount})
//     }

//     const discountedAmount = orderAmount - maximumDiscountAmount

//     return res.status(200).send({})



// }
module.exports={createCoupons}