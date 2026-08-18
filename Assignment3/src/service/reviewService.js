const createReview = async ({title, comment, rating, reviewerName}) => {
    const alreadyReviewed = await ReviewModel.findOne({ reviewerName, title });
    if (alreadyReviewed) {
      throw new Error("Review with this id already exists") ;
    }
    const review = await ReviewModel.create({
      title,
      comment,
      rating,
      reviewerName,
    });
    return review ;
}

const getReviews = async ( { status, page = 1, limit = 10 }) => {
     const filter = {};
    if (status) filter.status = status;
    const reviews = await ReviewModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);
      return reviews ;
}

module.exports = {createReview,getReviews} ;