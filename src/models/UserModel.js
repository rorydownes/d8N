const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    first: String,
    last: String,
    phone: String,
    zip: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    } catch(error) {
        next(error);
    }
});

UserSchema.methods.matchesSavedPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch(error) {
        throw new Error(error);
    }
};

UserSchema.methods.describeForLogs = function () {
    console.log(`User ${this.first} ${this.last} saved to DB`);
};

UserSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.name.last}`;
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;