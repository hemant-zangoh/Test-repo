# CLAUDE.md - Project Context

## Project Overview
This repository contains the implementation for "New Task" - a user authentication system.

## Current Status
- **Branch:** new-feature
- **Phase:** Planning & Initialization
- **Implementation Plan:** See IMPLEMENTATION_PLAN.md

## Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow ESLint configuration
- Write descriptive commit messages
- Include tests for new features

### Testing Commands
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

### Git Workflow
1. Work on feature branches
2. Keep commits atomic and descriptive
3. Run tests before committing
4. Create PR when feature is complete

## Project Structure
```
/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   └── tests/          # Test files
├── server/
│   ├── routes/         # API routes
│   ├── models/         # Database models
│   ├── middleware/     # Express middleware
│   └── tests/          # Backend tests
└── docs/               # Documentation
```

## Environment Variables
Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `EMAIL_HOST` - SMTP server host
- `EMAIL_PORT` - SMTP server port
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password

## Important Notes
- Always run lint and tests before committing
- Update documentation when adding new features
- Follow security best practices for authentication
- Keep sensitive data in environment variables

---
*Last Updated: 2025-05-23*