const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comics',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'Comment cannot be empty'],
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    isEdited: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // This will automatically update the updatedAt field
});

// Create indexes for better query performance
commentSchema.index({ comic: 1, createdAt: -1 }); // For fetching comments for a comic
commentSchema.index({ user: 1, createdAt: -1 }); // For fetching user's comments
commentSchema.index({ parentComment: 1 }); // For fetching replies

// Virtual for like count
commentSchema.virtual('likeCount').get(function() {
    return this.likes.length;
});

// Method to add a like
commentSchema.methods.addLike = async function(userId) {
    if (!this.likes.includes(userId)) {
        this.likes.push(userId);
        await this.save();
    }
    return this;
};

// Method to remove a like
commentSchema.methods.removeLike = async function(userId) {
    this.likes = this.likes.filter(id => id.toString() !== userId.toString());
    await this.save();
    return this;
};

// Method to add a reply
commentSchema.methods.addReply = async function(replyId) {
    if (!this.replies.includes(replyId)) {
        this.replies.push(replyId);
        await this.save();
    }
    return this;
};

// Pre-save middleware to update updatedAt when content is modified
commentSchema.pre('save', function(next) {
    if (this.isModified('content')) {
        this.isEdited = true;
        this.updatedAt = Date.now();
    }
    next();
});

// Static method to get comments for a comic with pagination
commentSchema.statics.getCommentsForComic = async function(comicId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.find({ 
        comic: comicId,
        parentComment: null // Only get top-level comments
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'username profileImage')
    .populate({
        path: 'replies',
        populate: {
            path: 'user',
            select: 'username profileImage'
        }
    });
};

// Static method to get replies for a comment
commentSchema.statics.getReplies = async function(commentId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.find({ parentComment: commentId })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'username profileImage');
};

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
