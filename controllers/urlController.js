import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import Url from '../models/Url.js';

/**
 * @desc    Create a short URL from a long URL
 * @route   POST /api/shorten
 */
export const shortenUrl = async (req, res) => {
  const { longUrl, customCode } = req.body;
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

  // 1. Feature 7: Validate URL format
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json({ error: 'Invalid URL provided' });
  }

  try {
    // 2. Feature 4: Duplicate Check (Return existing if found)
    let url = await Url.findOne({ originalUrl: longUrl });
    if (url) {
      return res.json({ 
        message: 'URL already exists', 
        shortUrl: `${baseUrl}/${url.shortCode}` 
      });
    }

    // 3. Feature 5: Custom Code vs Generated Code Logic
    let shortCode;
    if (customCode) {
      const existingCustom = await Url.findOne({ shortCode: customCode });
      if (existingCustom) {
        return res.status(400).json({ error: 'Custom code already in use' });
      }
      shortCode = customCode;
    } else {
      shortCode = nanoid(6); // Unique 6-character ID
    }

    // 4. Feature 1: Create and Save to local MongoDB
    url = new Url({
      originalUrl: longUrl,
      shortCode,
      createdAt: new Date()
    });

    await url.save();

    res.status(201).json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${baseUrl}/${shortCode}`
    });

  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Server error, please try again' });
  }
};

/**
 * @desc    Redirect to original URL and track clicks
 * @route   GET /:shortCode
 */
export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // 1. Feature 2: Search database for matching short code
    const url = await Url.findOne({ shortCode });

    if (url) {
      // 2. Feature 3: Increment click count (Analytics)
      url.clickCount++;
      await url.save();

      // 3. Perform Redirection
      return res.redirect(url.originalUrl);
    } else {
      // 4. Feature 7: Handle non-existing short codes
      return res.status(404).json({ error: 'No URL found for this code' });
    }
  } catch (err) {
    console.error('Redirection Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};