const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Node DNS servers:", dns.getServers());

const connectDB = require("./db");
const ReviewModel = require("./src/model/reviewModel");

async function testReview() {

    // try {

    //     await connectDB();

    //     console.log("Database connected!");

    //     const review = await ReviewModel.create({
    //         title: "Bahut accha product",
    //         comment: "Delivery fast thi aur quality bhi acchi hai",
    //         rating: 5,
    //         reviewerName: "Rahul"
    //     });

    //     console.log("TEST 1 PASSED!!");
    //     console.log(review);

    // } catch (error) {

    //     console.log("TEST FAILED");
    //     console.log(error.message);

    // } finally {

    //     process.exit();

    // }

    // TEST 2: rating = 6
try {
    await ReviewModel.create({
        title: "Invalid rating",
        comment: "This review should not be saved",
        rating: 6,
        reviewerName: "Rahul"
    });

    console.log("TEST 2 FAILED - rating 6 was accepted");

} catch (error) {
    console.log("TEST 2 PASSED - rating 6 rejected");
    console.log(error.message);
}


// TEST 3: rating = 3.5
try {
    await ReviewModel.create({
        title: "Decimal rating",
        comment: "This review should not be saved",
        rating: 3.5,
        reviewerName: "Rahul"
    });

    console.log("TEST 3 FAILED - rating 3.5 was accepted");

} catch (error) {
    console.log("TEST 3 PASSED - rating 3.5 rejected");
    console.log(error.message);
}


// TEST 4: status = blocked
try {
    await ReviewModel.create({
        title: "Invalid status",
        comment: "This review should not be saved",
        rating: 4,
        reviewerName: "Rahul",
        status: "blocked"
    });

    console.log("TEST 4 FAILED - blocked status was accepted");

} catch (error) {
    console.log("TEST 4 PASSED - blocked status rejected");
    console.log(error.message);
}


}

testReview();