const Comment = require('../model/comment.model');
const Notif = require('../model/notif.model');
const User = require('../model/User');

// Get comments for a comic
exports.getComicComments = async (req, res) => {
    try {
        const { comicId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const comments = await Comment.getCommentsForComic(comicId, page, limit);
        
        // Ensure likes array is initialized for each comment and reply
        const processedComments = comments.map(comment => {
            const processedComment = comment.toObject();
            processedComment.likes = processedComment.likes || [];
            
            // Process replies if they exist
            if (processedComment.replies) {
                processedComment.replies = processedComment.replies.map(reply => {
                    const processedReply = reply.toObject ? reply.toObject() : reply;
                    processedReply.likes = processedReply.likes || [];
                    return processedReply;
                });
            }
            
            return processedComment;
        });

        res.status(200).json(processedComments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
};

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { comicId } = req.params;
        const { content, parentCommentId, userId } = req.body;

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const commentData = {
            user: userId,
            comic: comicId,
            content,
            parentComment: parentCommentId || null
        };

        const comment = new Comment(commentData);
        await comment.save();

        // If this is a reply, add it to the parent comment's replies
        if (parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if (parentComment) {
                await parentComment.addReply(comment._id);
                
                // Create notification for the parent comment's author
                if (parentComment.user.toString() !== userId.toString()) {
                    const notification = new Notif({
                        user: parentComment.user,
                        message: `${user.username} replied to your comment`
                    });
                    await notification.save();
                }
            }
        }

        // Populate user data before sending response
        await comment.populate('user', 'username profileImage');
        
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating comment', error: error.message });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content, userId } = req.body;

        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is the comment author
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this comment' });
        }

        comment.content = content;
        await comment.save();
        
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.body;

        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is the comment author
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        // If this is a reply, remove it from parent comment's replies
        if (comment.parentComment) {
            const parentComment = await Comment.findById(comment.parentComment);
            if (parentComment) {
                parentComment.replies = parentComment.replies.filter(
                    replyId => replyId.toString() !== commentId
                );
                await parentComment.save();
            }
        }

        // Delete all replies to this comment
        await Comment.deleteMany({ parentComment: commentId });
        
        // Delete the comment itself
        await comment.deleteOne();
        
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
};

// Delete a comment (admin version - no user verification needed)
exports.deleteAdminComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // If this is a reply, remove it from parent comment's replies
        if (comment.parentComment) {
            const parentComment = await Comment.findById(comment.parentComment);
            if (parentComment) {
                parentComment.replies = parentComment.replies.filter(
                    replyId => replyId.toString() !== commentId
                );
                await parentComment.save();
            }
        }

        // Delete all replies to this comment
        await Comment.deleteMany({ parentComment: commentId });
        
        // Delete the comment itself
        await comment.deleteOne();
        
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
};

// Like/Unlike a comment
exports.toggleLike = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.body;

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const hasLiked = comment.likes.includes(userId);
        
        if (hasLiked) {
            await comment.removeLike(userId);
        } else {
            await comment.addLike(userId);
            
            // Create notification for the comment author
            if (comment.user.toString() !== userId.toString()) {
                const notification = new Notif({
                    user: comment.user,
                    message: `${user.username} liked your comment`
                });
                await notification.save();
            }
        }

        res.status(200).json({ 
            message: hasLiked ? 'Comment unliked' : 'Comment liked',
            likes: comment.likes.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling like', error: error.message });
    }
};

// Get replies for a comment
exports.getReplies = async (req, res) => {
    try {
        const { commentId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const replies = await Comment.getReplies(commentId, page, limit);
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching replies', error: error.message });
    }
};

// Get all comments for admin view
exports.getAllComments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        let query = {};
        
        // Apply search if provided
        if (search) {
            query.$or = [
                { content: { $regex: search, $options: 'i' } },
                { 'user.username': { $regex: search, $options: 'i' } },
                { 'comic.title': { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        
        // Get total count for pagination
        const totalComments = await Comment.countDocuments(query);
        const totalPages = Math.ceil(totalComments / limit);

        // Get comments with populated data
        const comments = await Comment.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'username profileImage')
            .populate('comic', 'title')
            .populate({
                path: 'parentComment',
                populate: {
                    path: 'user',
                    select: 'username'
                }
            });

        res.status(200).json({
            comments,
            totalPages,
            currentPage: page,
            totalComments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
}; 