const JWT = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const signToken = user => {
    const { JWT_ISSUER, JWT_SECRET } = process.env;
    return JWT.sign({
        iss: JWT_ISSUER,
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 7)
    }, JWT_SECRET);
};

const signup = async(req, res, next) => {
    const requestBody = req.validated.body;
    const { email } = requestBody;
    try {
        const foundUser = await UserModel.findOne({ email });
        
        if (foundUser) {
            res.status(403).json({ error: 'Email is already in use'});
            return;
        }

        const saveErr = false;
        const newUser =  new UserModel({ ...requestBody });
        await newUser.save(function (err, user) {
            if (err) {
                res.status(500).json({ error: err });
                saveErr = true;
                return;
            } else {
                user.describeForLogs();
            }
        });

        if (!saveErr) {
            const token = signToken(newUser);
            res.status(200).json({ "access-token": token });
        }
    } catch(error) {
        res.status(500).json({ error })
    }
};

const login = async(req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ "access-token": token });
};

const updateUser = (req, res, next) => {
    res.json({ status: 'INCOMPLETE' });
};

const deleteUser = (req, res, next) => {
    res.json({ status: 'INCOMPLETE' });
};

const listUsers = (req, res, next) => {
    const users = UserModel.find(function (err, users) {
        if (err) {
            console.error(err);
        } else {
            res.status(200).json({ users });
        }
    });
}

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    listUsers,
}