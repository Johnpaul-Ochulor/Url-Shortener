import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';

const router = express.Router();

// @route   POST /api/shorten
// @desc    Create short URL
router.post('/shorten', shortenUrl);

// @route   GET /:shortCode
// @desc    Redirect to original URL
router.get('/:shortCode', redirectUrl);

export default router;