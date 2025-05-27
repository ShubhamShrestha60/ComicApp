const Comics = require('../model/comic.model');

exports.getAllComics = async (req, res) => {
    try {
        console.log('Fetching all comics');
        const comics = await Comics.find();
        res.json(comics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getComicById = async (req, res) => {
    try {
        const comic = await Comics.findById(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.json(comic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createComic = async (req, res) => {
    const comic = new Comics(req.body);
    try {
        const newComic = await comic.save();
        res.status(201).json(newComic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateComic = async (req, res) => {
    try {
        const updatedComic = await Comics.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComic) return res.status(404).json({ message: 'Comic not found' });
        res.json(updatedComic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteComic = async (req, res) => {
    try {
        const deletedComic = await Comics.findByIdAndDelete(req.params.id);
        if (!deletedComic) return res.status(404).json({ message: 'Comic not found' });
        res.json({ message: 'Comic deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getApprovedComics = async (req, res) => {
    try {
        const comics = await Comics.find({ isapproved: true })
            .sort({ createdAt: -1 });
        res.status(200).json(comics);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch approved comics', error });
    }
};

exports.getComicByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const comics = await Comics.find({ uploadedBy: userId });
        if (!comics) return res.status(404).json({ message: 'Comics not found' });
        res.json(comics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}