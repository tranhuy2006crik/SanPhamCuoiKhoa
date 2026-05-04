import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '15m' } // Token ngắn hạn
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
            { expiresIn: '7d' } // Refresh token dài hạn
        );

        // Lưu refresh token vào DB
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            token,
            refreshToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isMember: user.isMember,
                favorites: user.favorites
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndUpdate(userId, { refreshToken: null });
        res.status(200).json({ message: 'Đã đăng xuất thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Không có refresh token' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret');
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Refresh token không hợp lệ' });
        }

        const newToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '15m' }
        );

        res.status(200).json({ token: newToken });
    } catch (error) {
        res.status(403).json({ message: 'Refresh token hết hạn' });
    }
};
