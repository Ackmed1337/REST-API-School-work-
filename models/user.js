const mongoose = require("mongoose");

const options = {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

const schema = new mongoose.Schema(
    {
        firstname: { type: String, require: true },
        lastname: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true, minlength: 8 },
        address: { type: String, require: true },
        city: { type: String, require: true },
        state: { type: String, require: true },
        zipcode: { type: String},
        phone: { type: String},
    },
    options
);

const User = mongoose.model("User", schema);

module.exports = User;
