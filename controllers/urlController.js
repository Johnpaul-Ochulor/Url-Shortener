import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import validUrl from 'valid-url';

export const shortenUrl = async (req, res) => {
  const { longUrl, customCode } = req.body;

  // Feature 7: Validation
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json('Invalid base URL');
  }

  try {
    // Feature 4: Duplicate Check
    let url = await Url.findOne({ originalUrl: longUrl });
    if (url) return res.json(url);

    // Feature 5: Custom Code Logic
    const shortCode = customCode || nanoid(6);
    
    // Check if custom code is taken
    if (customCode) {
        const existingCode = await Url.findOne({ shortCode });
        if (existingCode) return res.status(400).json('Custom code already in use');
    }

    url = new Url({ originalUrl: longUrl, shortCode });
    await url.save();
    
    res.status(201).json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
};