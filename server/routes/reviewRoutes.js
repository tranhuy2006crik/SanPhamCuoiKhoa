import express from 'express';
import { addReview, getMovieReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addReview);
router.get('/:movieId', getMovieReviews);

export default router;
