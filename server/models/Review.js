import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    comment: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Mỗi người dùng chỉ được đánh giá 1 phim 1 lần
reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
