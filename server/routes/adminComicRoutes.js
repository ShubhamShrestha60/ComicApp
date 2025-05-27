const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'temp/' });
const {
  getAllComics,
  approveComic,
  rejectComic,
  uploadComic
} = require('../controllers/adminComicController');
const { protect, authorize } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(protect);
router.use(authorize('admin'));

// GET all comics
router.get('/', getAllComics);

// Upload comic (admin only)
router.post(
  '/upload',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'chapters', maxCount: 10 }
  ]),
  uploadComic
);

// PATCH to approve comic
router.patch('/:id/approve/:userid', approveComic);

// PATCH to reject comic
router.patch('/:id/reject', rejectComic);

module.exports = router;
