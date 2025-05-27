const Notif = require('../model/notif.model');

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notif.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { user, message } = req.body;
        const notification = new Notif({
            user,
            message
        });
        const savedNotification = await notification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(400).json({ message: 'Error creating notification', error: error.message });
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notif.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error: error.message });
    }
};

// Mark all notifications as read for a user
exports.markAllAsRead = async (req, res) => {
    try {
        await Notif.updateMany(
            { user: req.user._id, read: false },
            { read: true }
        );
        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking all notifications as read', error: error.message });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notif.findByIdAndDelete(req.params.id);
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error: error.message });
    }
};

// Delete all notifications for a user
exports.deleteAllNotifications = async (req, res) => {
    try {
        await Notif.deleteMany({ user: req.user._id });
        res.status(200).json({ message: 'All notifications deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting all notifications', error: error.message });
    }
};

// Get unread notification count for a user
exports.getUnreadCount = async (req, res) => {
    try {
        const count = await Notif.countDocuments({
            user: req.user._id,
            read: false
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error getting unread count', error: error.message });
    }
};
