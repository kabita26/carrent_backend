
// const Review = require('../models/reviewModel');

// const reviewSchema = async (req, res) => {
//     try {
//       const { bookId, rating } = req.body;
  
//       const newReview = new Review({ bookId, rating });
//       await newReview.save();
  
//       res.status(201).json({ message: 'Review submitted successfully' });
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

//   module.exports =  reviewSchema;