const multer = require('multer');
const path = require('path');
const os = require('os');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.tmpdir()); // store files in system temp folder
    },
    filename: (req, file, cb) => {
        // Sanitize the filename and avoid collisions
        const sanitizedName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
        cb(null, Date.now() + '-' + sanitizedName);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
        (file.fieldname === 'coverImage' && ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) ||
        (file.fieldname === 'chapters' && ext === '.pdf')
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type: ' + ext), false);
    }
};

module.exports = multer({ storage, fileFilter });
