const User = require('../models/user');
const mongoose = require("mongoose");

const Manager = {
    getById: async id => {
        const t = await User.findById(id);
        if (t === null)
            return false;

        return t;
    },
    getByEmail: async email => {
        const t = await User.findOne({ email: email });
        if (t === null)
            return false;

        return t;
    },
    create: async t => {
        let user = new User({ ...t });
        const r = await user.save();
        if (r === null)
            return false;

        return r;
    },
    list: async () => {
        return await User.find({});
    },
    update: async (id, user) => {
        await User.updateOne({_id: id}, {$set: user});
        return await User.findById(id);
    },
    deleteUser: async id => {
        return await User.deleteOne({_id: id});
    }
};

module.exports = Manager;