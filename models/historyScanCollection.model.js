const mongoose = require("mongoose");

const HistoryScanCollectionSchema = new mongoose.Schema({
  collectionId: { type: String, required: true },  // Changed to String
  scanDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model(
  "HistoryScanCollection",
  HistoryScanCollectionSchema
);
