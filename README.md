# HejIntern

A full-stack travel booking and tour customization application built with:
- **Frontend:** React, Vite, Tailwind CSS, React Router, Zustand
- **Backend:** Node.js, Express, Prisma, MongoDB
- **Media & Email:** Cloudinary image/video uploads, Nodemailer email verification and contact replies

## Project Structure

- `/client` — React frontend application
- `/server` — Express backend API
- `styles.css` — optional root stylesheet if needed for static landing or global style

## Key Features

- Homepage UI with responsive design (current completed work)
- React + Vite frontend scaffold
- Backend API structure with Express and Prisma (scaffolded)
- MongoDB data models for users, themes, packages, bookings, and customization
- Planned features: authentication, booking, admin dashboard, Cloudinary uploads, email flow

## Project Status

- ✅ Completed: Home page in the frontend
- ⚠️ In progress: full frontend routing and admin pages
- ⚠️ In progress: backend route integration and end-to-end workflows

## Technologies

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Zustand state management
- Lucide React icons

### Backend
- Node.js + Express
- Prisma ORM with MongoDB
- bcryptjs for password hashing
- jsonwebtoken for JWT authentication
- express-validator for request validation
- helmet and express-rate-limit for security
- Cloudinary for file uploads
- Nodemailer for email delivery

## Getting Started

### 1. Prerequisites

- Node.js 18+ / npm
- MongoDB Atlas or MongoDB connection URI
- Cloudinary account
- Gmail account or SMTP credentials for sending email

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server` with the following values:

```env
PORT=5000
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Use secure credentials in production and never commit `.env` to source control.

Generate Prisma client and push schema to the database:

```bash
npx prisma generate
npx prisma db push
```

Seed initial data (roles, languages, admin user, themes, tour packages):

```bash
node prisma/seed.js
```

Start the backend server:

```bash
npm run dev
```

The API will run on `http://localhost:5000` by default.

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

## Default Admin Account

The seed script creates an admin user with these credentials:

- Email: `admin@hejceylon.com`
- Password: `Admin@1234`

Use this account to access admin routes and manage tours, stays, and packages.

## Available API Endpoints

### Authentication
- `POST /api/v1/auth/register` — register a new user
- `GET /api/v1/auth/verify-email/:token` — verify email address
- `POST /api/v1/auth/login` — login and receive JWT token
- `POST /api/v1/auth/forgot-password` — send password reset email
- `POST /api/v1/auth/reset-password` — reset password via token

### User
- `GET /api/v1/users` — user listing / profile
- `PUT /api/v1/users/:id` — update user profile

### Application Data
- `GET /api/v1/themes` — list travel themes
- `GET /api/v1/destination` — list destinations
- `GET /api/v1/activity` — list activities
- `GET /api/v1/packages` — list tour packages
- `GET /api/v1/stays` — list stays

### Customization & Booking
- `POST /api/v1/customization` — create a trip customization
- `GET /api/v1/customization` — fetch customizations
- `POST /api/v1/bookings` — create a booking
- `GET /api/v1/bookings` — list bookings

### Media Upload
- `POST /api/v1/images` — upload images/videos via Cloudinary

### Contact
- `POST /api/v1/contact` — send a contact inquiry with auto-reply email

## Frontend Routes

- `/` — main home page (completed)

> Other routes such as `/sv`, `/about`, `/admin/*` are currently planned or under development.

## Notes

- The backend uses JWT authentication with token validation middleware and role-based authorization.
- The app stores user, role, language, theme, destination, activity, package, customization, booking, and image data in MongoDB.
- Cloudinary is used for media storage, and images/videos are stored as `theme` assets.
- Email flows depend on valid SMTP credentials configured in `.env`.

## Development Tips

- Run frontend and backend in separate terminals for development.
- If using a custom frontend port, update `server.js` CORS origin accordingly.
- `npm run lint` is available in `/client` for frontend linting.

## Optional Improvements

- Add TypeScript support to the backend
- Add frontend form validation and error handling
- Add end-to-end tests for registration, booking, and admin flows
- Add API documentation (Swagger/OpenAPI)

---

Made for the `HejIntern` travel booking and customization platform. Enjoy building and extending the app!
