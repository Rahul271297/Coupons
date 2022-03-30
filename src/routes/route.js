const express = require('express');
const router = express.Router();
const CouponController = require('../controller/couponController.js')

router.post("/generate-coupons",CouponController.createCoupons)
module.exports = router;



