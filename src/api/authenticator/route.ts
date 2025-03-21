import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { isProfane } from '../../util/profanity';
import { hasInvalidSymbols } from '../../util/invalid_symbols';
import User from '../../db/user_model';

const jwt_secret = process.env.JWT_SECRET;

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    if (hasInvalidSymbols(username)) return res.status(400).json({ error: 'Invalid symbols in username' });
    if (username.length < 6) return res.status(400).json({ error: 'Username is too short.' });
    if (username.length > 20) return res.status(400).json({ error: 'Username is too long.' });
    if (isProfane(username)) return res.status(400).json({ error: 'Username cannot have profanity.' });

    try {
        var hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hash,
            createdAt: Date.now(),
        });
        const token = jwt.sign({ username: user.username, id: user._id }, jwt_secret, { expiresIn: '3h' });
        return res.status(201).json({
            message: 'User created.',
            token: token,
        });
    } catch (err) {
        return res.status(400).json({ error: 'User creation failed.' });
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ error: 'User does not exist.' });
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ username: user.username, id: user._id }, jwt_secret, { expiresIn: '3h' });
            return res.status(200).json({
                message: 'User authenticated.',
                token: token,
            });
        } else {
            return res.status(400).json({ error: 'Incorrect password.' });
        }
    } catch (err) {
        return res.status(400).json({ error: 'Login failed.' });
    }
};

/*
    TODO: 
        - exports.getUser               ~ Get a users information based on ID or username
        - exports.updatePassword        ~ Update a users password
        - exports.updateUser            ~ Update a users information
        - exports.updatePermissions     ~ Update a users permissions
        - exports.deleteUser            ~ Delete a users account
        - exports.logout                ~ Logout a user

    Rules for user accounts:
        - Must strictly follow all preset model guidelines in `db/user_model.ts`.
*/
