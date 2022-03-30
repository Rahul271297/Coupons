const express = require('express');
const router = express.Router();
const CouponController = require('../controller/couponController.js')

router.post("/generate-coupons",CouponController.createCoupons)
router.get("/list-all-coupons",CouponController.listCoupons)
router.post("/coupon-validations",CouponController.applyCoupon)

module.exports = router;



