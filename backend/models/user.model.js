// model = term for how we want particular data to be organized when sending to db
const mongoose = require('mongoose');

// JSON obj that defines shape & content of the data
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // field
    username: {
        // validations, can include error msgs in array form
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
}, {
    // automatically adds createdAt & updatedAt properties
    timestamps: true,
});

// registers schema with mongoose so that the user model can be accessed anywhere in app using mongoose.model('User')
const User = mongoose.model('User', userSchema);

module.exports = User;