const express = require('express');

const router = express.Router();


const {generateNewShortURL, getURL, getAnalytics, getAllURL} = require('../controllers/url')

router.post('/', generateNewShortURL);
router.get('/getlinks', getAllURL )
router.get('/:shortid', getURL);
router.get('/analytics/:shortid', getAnalytics );

module.exports = router;
