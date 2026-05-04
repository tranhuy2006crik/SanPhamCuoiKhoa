import Review from '../models/Review.js';
import Movie from '../models/Movie.js';

export const addReview = async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;
        const userId = req.user.id;

        // Kiểm tra xem đã đánh giá chưa
        const existingReview = await Review.findOne({ userId, movieId });
        if (existingReview) {
            return res.status(400).json({ message: 'Bạn đã đánh giá phim này rồi' });
        }

        const review = new Review({
            userId,
            movieId,
            rating,
            comment
        });

        await review.save();

        // Cập nhật rating trung bình cho Movie
        const reviews = await Review.find({ movieId });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        
        await Movie.findByIdAndUpdate(movieId, {
            rating: avgRating.toFixed(1),
            totalrating: reviews.length
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const getMovieReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId })
            .populate('userId', 'username')
            .sort('-createdAt');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
