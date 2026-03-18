import express from 'express';
import { shortenUrl, redirectUrl, deleteUrl, getAllUrls } from '../controllers/urlController.js';

const router = express.Router();

// @route   POST /api/shorten
// @desc    Create short URL
router.post('/shorten', shortenUrl);

router.get('/all', getAllUrls);

// @route   GET /:shortCode
// @desc    Redirect to original URL
router.get('/:shortCode', redirectUrl);

router.delete('/:shortCode', deleteUrl);



export default router;