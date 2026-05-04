import User from '../models/User.js';

export const toggleFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        const index = user.favorites.indexOf(movieId);
        if (index === -1) {
            user.favorites.push(movieId);
            await user.save();
            res.status(200).json({ message: 'Đã thêm vào danh sách yêu thích', favorites: user.favorites });
        } else {
            user.favorites.splice(index, 1);
            await user.save();
            res.status(200).json({ message: 'Đã xóa khỏi danh sách yêu thích', favorites: user.favorites });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
