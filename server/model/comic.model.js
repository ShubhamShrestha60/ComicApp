const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true },
    summary: { type: String },
    genres: [{ type: String }],
    uploadedBy: { type: String, required: true },
    coverImage: { type: String },
    chapters: [{ type: String }],
    uploadedAt: { type: Date, default: Date.now },
    isapproved: { type: Boolean, default: false },
});

const Comics = mongoose.model('Comics', comicSchema);
module.exports = Comics;