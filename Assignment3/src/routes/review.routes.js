const express = require("express");
const reviewService = require('../service/reviewService') ;
const router = express.Router();
router.post("/createReview", async (req, res) => {
  try {
    const { title, comment, rating, reviewerName } = req.body;
    const review = await reviewService.createReview(req.body) ;
    res.send(review);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal	server	error");
  }
});
router.get("/getReviews", async (req, res) => {
  try {
   const reviews = await reviewService.getReviews(req.params) ;
    res.send(reviews);
  } catch (err) {
    res.status(500).send("error");
  }
});
module.exports = router;
