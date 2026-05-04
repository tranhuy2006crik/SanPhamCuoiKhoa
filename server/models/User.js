import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isMember: {
        type: Boolean,
        default: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
