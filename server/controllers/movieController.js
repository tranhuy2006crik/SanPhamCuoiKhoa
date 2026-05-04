import Movie from '../models/Movie.js';

export const getAllMovies = async (req, res) => {
    try {
        const { page = 1, limit = 12, genre, year, search, sort } = req.query;
        const query = {};

        if (genre) {
            query.genres = { $regex: genre, $options: 'i' };
        }

        if (year) {
            query.releaseDate = { $regex: year, $options: 'i' };
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        let sortQuery = {};
        if (sort === 'totalrating') {
            sortQuery = { totalrating: -1 };
        }

        const skip = (page - 1) * limit;
        const movies = await Movie.find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Movie.countDocuments(query);

        res.status(200).json({
            movies,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalMovies: total
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Không tìm thấy phim' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Không tìm thấy phim' });
        }
        res.status(200).json({ message: 'Đã xóa phim thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ message: 'Không tìm thấy phim' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
