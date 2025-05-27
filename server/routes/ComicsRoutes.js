const express = require('express');
const { getAllComics, getComicById, createComic, updateComic, deleteComic, getApprovedComics, getComicByUserId } = require('../controllers/comics.controller');

const router = express.Router();

// Get all comics
router.get('/', getAllComics);
router.get('/approved', getApprovedComics)

router.get('/user/:userId', getComicByUserId);

// Get a comic by ID
router.get('/:id', getComicById);

// Create a new comic
router.post('/', createComic);

// Update a comic by ID
router.put('/:id', updateComic);

// Delete a comic by ID
router.delete('/:id', deleteComic);

// Get all approved comics


module.exports = router;