# User Authentication System

A full-stack authentication system built with Node.js, Express, React, and PostgreSQL. Features JWT-based authentication, email verification, and password reset functionality.

## Features

- User registration with email verification
- Login/logout functionality
- JWT-based session management
- Password reset via email
- Role-based access control (User/Admin)
- Rate limiting for auth endpoints
- Secure password hashing with bcrypt
- Responsive UI with Material-UI

## Tech Stack

### Backend
- Node.js & Express
- PostgreSQL database
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email services
- Express-validator for input validation
- Express-rate-limit for rate limiting

### Frontend
- React 18
- React Router v6
- Material-UI for components
- React Hook Form for form handling
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- SMTP server for email functionality

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-repo
```

2. Install dependencies:

Backend:
```bash
npm install
```

Frontend:
```bash
cd client
npm install
cd ..
```

3. Set up environment variables:

Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

4. Set up the database:

Run the migration to create the users table:
```bash
psql -U your_username -d your_database -f migrations/001_create_users_table.sql
```

## Running the Application

### Development Mode

Run both backend and frontend concurrently:
```bash
npm run dev:full
```

Or run them separately:

Backend only:
```bash
npm run dev
```

Frontend only:
```bash
npm run client
```

### Production Mode

Build the frontend:
```bash
cd client
npm run build
cd ..
```

Start the server:
```bash
npm start
```

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify/:token` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/me` - Get current user (requires auth)

### Health Check

- `GET /health` - Server health check

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Security Features

- Passwords hashed with bcrypt (configurable rounds)
- JWT tokens with configurable expiry
- Rate limiting on authentication endpoints
- Input validation and sanitization
- CORS configuration
- SQL injection protection through parameterized queries
- XSS protection headers

## Project Structure

```
test-repo/
├── server/                 # Backend code
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Express middleware
│   ├── utils/             # Utility functions
│   └── tests/             # Backend tests
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
├── migrations/            # Database migrations
├── docs/                  # Documentation
└── package.json          # Dependencies
```

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request