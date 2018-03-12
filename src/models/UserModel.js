const mongoose = require('mongoose');

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

UserSchema.methods.describeForLogs = function () {
    console.log(`User ${this.first} ${this.last} saved to DB`);
};

UserSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.name.last}`;
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;