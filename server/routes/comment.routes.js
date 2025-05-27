const express = require('express');
const router = express.Router();
const {
    getComicComments,
    createComment,
    updateComment,
    deleteComment,
    toggleLike,
    getReplies,
    getAllComments,
    deleteAdminComment
} = require('../controllers/comment.controller');

// Get all comments (admin view)
router.get('/all', getAllComments);

// Admin delete comment
router.delete('/admin/:commentId', deleteAdminComment);

// Get comments for a comic
router.get('/comic/:comicId', getComicComments);

// Create a new comment on a comic
router.post('/comic/:comicId', createComment);

// Get replies for a comment
router.get('/:commentId/replies', getReplies);

// Update a comment
router.patch('/:commentId', updateComment);

// Delete a comment
router.delete('/:commentId', deleteComment);

// Like/Unlike a comment
router.post('/:commentId/like', toggleLike);

module.exports = router; 