# apiBlog - RESTful Blog API (Node.js + Express)

Initial skeleton for a **RESTful Blog API** built with Node.js and Express.js.  
Clean MVC folder structure set up, ready for MongoDB integration and feature development.

**Current Status**: Basic project setup (folders + entry point). No endpoints or features implemented yet – under active development.

## Planned Features
- User registration/login (JWT auth)
- CRUD for blog posts
- Comments on posts
- Role-based access
- Pagination, search, validation
- Image upload, categories, etc.

## Tech Stack (Planned)
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcrypt
- dotenv, helmet, cors, rate-limit...

## Project Structure
apiBlog/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── package.json
└── README.md

## Quick Start
1. Clone: `git clone https://github.com/MoezBaya/apiBlog.git`
2. Install: `npm install`
3. Add `.env` (PORT, MONGO_URI, JWT_SECRET...)
4. Run: `node app.js` or `npm start`

**Note**: Add `.gitignore` to ignore `node_modules/` and `.env`!

## Next Steps
- Implement auth routes
- Add post model & CRUD
- Connect to MongoDB
- Add tests & Docker

Personal/learning project – contributions welcome!

MIT License  
Built by [Moez Baya](https://github.com/MoezBaya) – February 2026
