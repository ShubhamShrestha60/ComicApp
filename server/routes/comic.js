const express = require('express');
const Comics = require('../model/comic.model');
const router = express.Router();
const upload = require('../utils/uploadComic'); // multer config
const cloudinary = require('../utils/cloudinary'); // CommonJS import

router.post(
    '/upload',
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'chapters', maxCount: 20 }
    ]),
    async (req, res) => {
        try {
            // Upload cover image to Cloudinary
            const coverImageFile = req.files['coverImage']?.[0];
            let coverImageUrl = '';
            if (coverImageFile) {
                const coverResult = await cloudinary.uploader.upload(coverImageFile.path, {
                    resource_type: 'image'
                });
                coverImageUrl = coverResult.secure_url;
            }

            // Upload chapters (PDFs) to Cloudinary as raw files
            const chapterFiles = req.files['chapters'] || [];
            const chapterUrls = [];

            for (const file of chapterFiles) {
                const chapterResult = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'raw',             // Make sure it's treated as a file, not image
                    folder: 'comics/chapters',        // Optional: store in folder
                    use_filename: true,               // Use original filename
                    unique_filename: false,           // Avoid hashed names
                    format: 'pdf'                     // Force .pdf format
                });
                chapterUrls.push(chapterResult.secure_url);
            }

            // Prepare all data
            const comicData = {
                title: req.body.title,
                author: req.body.author,
                status: req.body.status,
                summary: req.body.summary,
                genres: Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres],
                uploadedBy: req.body.uploadedBy,
                coverImage: coverImageUrl,
                chapters: chapterUrls,
                uploadedAt: new Date()
            };

            //save the data to db
            const savedComic = await Comics.create(comicData);
            // Log the data or save to DB
            console.log('Comic Data:', savedComic);

            res.status(200).json({ message: 'Upload successful', comic: savedComic });
        } catch (err) {
            console.error('Upload error:', err);
            res.status(500).json({ error: err.message });
        }
    }
);


//add chapters to existing comic
router.post(
    '/add-chapters/:comicId',
    upload.array('chapters', 20),
    async (req, res) => {
        const { comicId } = req.params;
        const chapterFiles = req.files || [];

        try {
            // Upload chapters (PDFs) to Cloudinary as raw files
            const chapterUrls = [];

            for (const file of chapterFiles) {
                const chapterResult = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'raw',             // Make sure it's treated as a file, not image
                    folder: 'comics/chapters',        // Optional: store in folder
                    use_filename: true,               // Use original filename
                    unique_filename: false,           // Avoid hashed names
                    format: 'pdf'                     // Force .pdf format
                });
                chapterUrls.push(chapterResult.secure_url);
            }

            // Find the comic and update it with new chapters
            const updatedComic = await Comics.findByIdAndUpdate(
                comicId,
                { $push: { chapters: { $each: chapterUrls } } },
                { new: true }
            );

            if (!updatedComic) {
                return res.status(404).json({ error: 'Comic not found' });
            }

            res.status(200).json({ message: 'Chapters added successfully', comic: updatedComic });
        } catch (err) {
            console.error('Error adding chapters:', err);
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = router;
