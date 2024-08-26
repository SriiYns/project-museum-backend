const mongoose = require("mongoose");
const HistoryScanCollection = require('../models/historyScanCollection.model');
const Collection = require('../models/collection.model');

const index = async (req, res) => {
    try {
        const historyScans = await HistoryScanCollection.find();
        res.status(200).json({
            message: 'History Scan Collections retrieved successfully',
            data: historyScans,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
        console.log(err);
    }
};

const storeScanHistory = async (req, res) => {
    try {
        const { collectionId } = req.body;

        const regex = /\/collection\/([a-zA-Z0-9]+)/;
        const match = collectionId.match(regex);
        const extractedId = match[1];

        const collection = await Collection.findById(extractedId);
        
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found.' });
        }

        const history = new HistoryScanCollection({
            collectionId: extractedId,
        });
        await history.save();

        res.status(201).json({
            message: 'Scan history saved successfully.',
            data: history,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while saving scan history.',
            error: error.message,
        });
        console.log(error);
    }
};

const getScanCount = async (req, res) => {
    try {
        const { collectionId } = req.params;

        const count = await HistoryScanCollection.countDocuments({
            collectionId,
        });

        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching scan count.',
            error: error.message,
        });
        console.log(error);
    }
};

const getLastScan = async (req, res) => {
    try {
        const { collectionId } = req.params;

        const lastScan = await HistoryScanCollection.findOne({ collectionId })
            .sort({ scanDate: -1 })  // Mengurutkan berdasarkan scanDate descending
            .select('scanDate');  // Memilih hanya field scanDate

        if (!lastScan) {
            return res.status(404).json({ message: 'No scan history found for this collection.' });
        }

        res.status(200).json({ scanDate: lastScan.scanDate });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching last scan date.',
            error: error.message,
        });
        console.log(error);
    }
};

module.exports = {
    index,
    storeScanHistory,
    getScanCount,
	getLastScan,
};
