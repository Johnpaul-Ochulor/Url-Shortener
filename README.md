# 🔗 URL Shortener API (Backend)
A robust, feature-rich URL shortening service built with Node.js, Express, and MongoDB.

## 🚀 Features
- **URL Shortening:** Generate 6-character secure IDs.
- **Custom Aliases:** Choose your own short links (e.g., /my-repo).
- **Analytics:** Tracks click counts and last accessed timestamps.
- **Expiration:** Set links to expire after X days or on a specific date.
- **Kill Switch:** Manually deactivate links using the `isActive` flag.
- **Input Sanitization:** Automatically cleans custom codes for URL safety.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Validation:** valid-url
- **ID Generation:** nanoid

## 📂 Project Structure
URL-Shortener/
├── node_modules/        # Installed dependencies
├── src/                 # Main Source Code
│   ├── config/          # Database connection (db.js)
│   ├── controllers/     # Business logic (urlController.js)
│   ├── models/          # Database Schemas (urlModel.js)
│   └── routes/          # API Endpoints (urlRoutes.js)
├── .env                 # Secret Keys & DB URI
├── .gitignore           # Tells Git which files to ignore
├── package.json         # Project metadata & scripts
├── package-lock.json    # The Dependency Lock
├── README.md            # Project Documentation
└── server.js            # Main Entry Point

## ⚙️ Installation & Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `BASE_URL=http://localhost:5000`
4. Start the server: `npm run dev`

## 📡 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/shorten | Create a short URL (supports customCode & manualExpirationDate) |
| GET | /api/all | View all shortened links |
| GET | /api/:shortCode | Redirect to original URL |
| DELETE| /api/:shortCode | Remove a link from the database |

### 🧪 How to Test
1. **Shorten a URL:** POST to `/api/shorten` with `{"longUrl": "https://google.com"}`.
2. **Custom Code:** POST to `/api/shorten` with `{"longUrl": "...", "customCode": "jayp-link"}`.
3. **Expiration:** POST with `{"longUrl": "...", "manualExpirationDate": "2026-12-25"}`.
4. **Deactivate:** Change `isActive` to `false` in MongoDB and try to visit the link.

## 👨‍💻 Author
**JAY_P** - Backend Developer


