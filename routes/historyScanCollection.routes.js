const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const HistoryScanCollectionController = require('../controllers/historyScanCollection.controller');

router.post('/', HistoryScanCollectionController.storeScanHistory);
router.get('/', HistoryScanCollectionController.index);
router.get('/get-all', HistoryScanCollectionController.index);
router.get('/:collectionId/count', HistoryScanCollectionController.getScanCount);
router.get('/:collectionId/lastScan', HistoryScanCollectionController.getLastScan);

module.exports = router;
