import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        collation: {
            locale: 'en',
            strength: 2
        },
        required: true,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    email: {
        type: String,
        unique: true,
        collation: {
            locale: 'en',
            strength: 2
        },
        required: true,
        maxLength: 254
    },
    avatar: {
        type: String,
        default: 'https://github.com/asmtilde/moricode-assets/img/pfp.png',
        maxLength: 500,
    },
    privaleges: {
        type: Number,
        default: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

export default User;