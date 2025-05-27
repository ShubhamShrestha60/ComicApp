// const Upload = require('../model/Upload');

// // Get all approved comics
// const getApprovedComics = async (req, res) => {
//   try {
//     const comics = await Upload.find({ approved: true })
//       .select('title author genres status summary coverImageUrl chapterFiles')
//       .sort({ createdAt: -1 });
//     res.status(200).json(comics);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch approved comics', error });
//   }
// };

// module.exports = {
//   getApprovedComics
// };


