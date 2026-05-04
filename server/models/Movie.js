import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0
    },
    totalrating: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String
    },
    duration: {
        type: Number
    },
    genres: {
        type: String
    },
    videoUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
