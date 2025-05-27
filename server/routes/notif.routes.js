const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getUserNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    getUnreadCount
} = require('../controllers/notif.controller');

// All routes are protected and require authentication
router.use(protect);

// Get all notifications for the authenticated user
router.get('/', getUserNotifications);

// Get unread notification count
router.get('/unread/count', getUnreadCount);

// Create a new notification (typically used by admin or system)
router.post('/', createNotification);

// Mark a specific notification as read
router.patch('/:id/read', markAsRead);

// Mark all notifications as read
router.patch('/read-all', markAllAsRead);

// Delete a specific notification
router.delete('/:id', deleteNotification);

// Delete all notifications for the user
router.delete('/', deleteAllNotifications);

module.exports = router; 