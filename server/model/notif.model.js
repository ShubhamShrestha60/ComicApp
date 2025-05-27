const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Notif = mongoose.model('Notif', notifSchema);
module.exports = Notif;