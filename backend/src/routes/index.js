const express = require('express');
const router = express.Router();
const { processVideo, getTranscriptionResults } = require('../controllers/videoController');

router.post('/process-video', processVideo);
router.get('/results/:fileName', getTranscriptionResults);

module.exports = router;
