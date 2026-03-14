import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import Url from '../models/Url.js';

export const shortenUrl = async (req, res) => {
  // 1. Destructure the new field: expiresAfterDays
  const { longUrl, customCode, expiresAfterDays } = req.body;
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

  // 2. Calculate expiration date if the user provided one
  let expirationDate = null;
  if (expiresAfterDays) {
    expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expiresAfterDays);
  }

  // Inside shortenUrl
if (customCode) {
  // Remove spaces and special characters, only allow letters, numbers, and hyphens
  const sanitizedCode = customCode.replace(/[^a-zA-Z0-9-_]/g, '');
  
  // Check if someone else is already using this code
  const codeExists = await Url.findOne({ shortCode: sanitizedCode });
  if (codeExists) {
    return res.status(400).json({ error: 'Custom code already in use' });
  }
  shortCode = sanitizedCode;
}else {
    // 3. Fallback: If no custom code, generate a random one
    shortCode = nanoid(6);
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json({ error: 'Invalid URL provided' });
  }

  try {
    let url = await Url.findOne({ originalUrl: longUrl });
    
    // If it exists, we return it (Note: old ones will still have null expiresAt)
    if (url) return res.json(url);

    let shortCode = customCode || nanoid(6);

    // 3. Create new document with expiration and analytics
    url = new Url({
      originalUrl: longUrl,
      shortCode,
      expiresAt: expirationDate, // <--- New!
      createdAt: new Date()
    });

    await url.save();
    res.status(201).json(url);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (url) {
      // 4. Check if the link is expired (Feature 6)
      if (url.expiresAt && new Date() > url.expiresAt) {
        return res.status(410).json({ error: 'This link has expired' });
      }

      // 5. Update click count and last accessed time (Feature 3)
      url.clickCount++;
      url.lastAccessed = new Date(); 
      await url.save();

      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'No URL found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    // This command looks for the code and wipes it from MongoDB
    const url = await Url.findOneAndDelete({ shortCode });

    if (!url) {
      // If we try to delete something that doesn't exist
      return res.status(404).json({ error: 'URL not found' });
    }

    // Success!
    res.json({ message: 'URL deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // Newest first
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};