const Upload = require('../model/Upload');
const path = require('path');
const fs = require('fs');
const Comics = require('../model/comic.model');
const Notif = require('../model/notif.model');

// Helper to move files
const moveFile = (file, folderName) => {
  const targetPath = path.join('uploads', folderName, file.originalname);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.renameSync(file.path, targetPath);
  return `/${targetPath}`;
};

// GET all comics (admin view)
const getAllComics = async (req, res) => {
  try {
    console.log('Fetching all comics');
    const comics = await Comics.find();
    res.json(comics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH - Approve a comic
// const approveComic = async (req, res) => {
//   try {
//     const comic = await Upload.findByIdAndUpdate(
//       req.params.id,
//       { approved: true },
//       { new: true }
//     );
//     if (!comic) return res.status(404).json({ message: 'Comic not found' });
//     res.status(200).json({ message: 'Comic approved', comic });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to approve comic', error });
//   }
// };

// PATCH - Reject a comic
// const rejectComic = async (req, res) => {
//   try {
//     const comic = await Upload.findByIdAndUpdate(
//       req.params.id,
//       { approved: false },
//       { new: true }
//     );
//     if (!comic) return res.status(404).json({ message: 'Comic not found' });
//     res.status(200).json({ message: 'Comic rejected', comic });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to reject comic', error });
//   }
// };


//approve comic

const approveComic = async (req, res) => {
  try {
    const comicId = req.params.id;
    const userId = req.params.userid;

    // Update comic status
    const comic = await Comics.findByIdAndUpdate(
      comicId,
      { isapproved: true },
      { new: true }
    );

    if (!comic) {
      return res.status(404).json({ error: 'Comic not found' });
    }

    // Only try to create notification if we have a valid userId
    if (userId && userId !== 'undefined' && userId !== 'null') {
      try {
        const notification = new Notif({
          user: userId,
          message: `Your comic "${comic.title}" has been approved and is now live on ComicZone!`
        });
        await notification.save();
      } catch (notifError) {
        console.error('Error creating notification:', notifError);
        // Continue with the approval process even if notification fails
      }
    }

    res.status(200).json({ 
      message: 'Comic approved successfully', 
      comic
    });
  } catch (error) {
    console.error('Error approving comic:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//reject comic
const rejectComic = async (req, res) => {
  try {
    const comicId = req.params.id;
    const comic = await Comics.findByIdAndUpdate(
      comicId,
      { isapproved: false },
      { new: true }
    );

    if (!comic) {
      return res.status(404).json({ error: 'Comic not found' });
    }

    res.status(200).json({ message: 'Comic rejected successfully', comic });
  } catch (error) {
    console.error('Error rejecting comic:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




// Upload comic (admin)
const uploadComic = async (req, res) => {
  try {
    const {
      title,
      author,
      genres,
      status,
      summary,
      approved
    } = req.body;

    // Files from multer
    const coverImage = req.files['coverImage']?.[0];
    const chapterFiles = req.files['chapters'] || [];

    if (!coverImage) {
      return res.status(400).json({ error: 'Cover image is required' });
    }

    const coverImageUrl = moveFile(coverImage, 'covers');
    const chapters = chapterFiles.map(file => ({
      fileName: file.originalname,
      fileUrl: moveFile(file, 'chapters')
    }));

    const newComic = new Upload({
      title,
      author,
      genres: Array.isArray(genres) ? genres : [genres],
      status,
      summary,
      coverImageUrl,
      chapterFiles: chapters,
      uploadedBy: req.user._id, // Admin's user ID
      approved: approved === 'true' // Set to true for admin uploads
    });

    await newComic.save();
    res.status(201).json({ message: 'Comic uploaded successfully!', comic: newComic });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllComics,
  approveComic,
  rejectComic,
  uploadComic
};
