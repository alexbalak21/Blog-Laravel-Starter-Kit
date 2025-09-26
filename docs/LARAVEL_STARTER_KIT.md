# Laravel Starter Kit Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [Authentication Flow](#authentication-flow)
6. [Frontend Architecture](#frontend-architecture)
7. [Development Setup](#development-setup)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Common Tasks](#common-tasks)

## Project Overview

This Laravel Starter Kit is a modern web application template that combines the power of Laravel's backend with a React frontend using Inertia.js. It provides a solid foundation for building single-page applications with server-side routing and authentication.

## Technology Stack

### Backend
- **Laravel 10+**: PHP web application framework
- **Laravel Fortify**: Authentication backend services
- **Inertia.js**: Server-side routing and page rendering
- **PHP 8.2+**: Server-side programming language
- **MySQL/PostgreSQL/SQLite**: Database options

### Frontend
- **React 18+**: JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components

### Development Tools
- **Laravel Sail**: Docker development environment
- **Pint**: PHP code style fixer
- **ESLint & Prettier**: JavaScript/TypeScript linting and formatting
- **PHPUnit**: PHP testing framework

## Project Structure

```
.
├── app/                  # Application core
│   ├── Console/          # Artisan commands
│   ├── Exceptions/       # Exception handlers
│   ├── Http/             # Controllers, Middleware, Requests
│   ├── Models/           # Eloquent models
│   └── Providers/        # Service providers
├── bootstrap/            # Framework bootstrapping
├── config/               # Configuration files
├── database/             # Database migrations, seeders, factories
├── public/               # Web server entry point
├── resources/
│   ├── css/              # Global CSS
│   ├── js/               # Frontend JavaScript/TypeScript
│   │   ├── Components/   # Reusable React components
│   │   ├── Layouts/      # Page layouts
│   │   └── Pages/        # Page components
│   └── views/            # Blade templates
├── routes/               # Application routes
├── storage/              # Storage for logs, compiled views, etc.
└── tests/                # Test files
```

## Core Components

### Authentication
- **Laravel Fortify**: Handles user registration, login, password reset, and email verification
- **Session Management**: Secure session handling with CSRF protection
- **Middleware**: Authentication and verification middleware for protected routes

### Routing
- **Web Routes**: Defined in `routes/web.php`
- **API Routes**: Defined in `routes/api.php`
- **Inertia.js**: Handles client-side routing with server-side rendering

### Frontend Architecture
- **Inertia.js**: Bridges Laravel and React
- **React Components**: Organized by feature and reusability
- **State Management**: React Context API for global state
- **Styling**: Tailwind CSS with custom configuration

## Authentication Flow

1. **User Registration**
   - User submits registration form
   - Laravel Fortify validates and creates user
   - Email verification sent if enabled
   - User redirected to dashboard

2. **User Login**
   - User submits login credentials
   - Fortify authenticates and creates session
   - Inertia.js handles the authenticated state
   - User redirected to intended page or dashboard

3. **Password Reset**
   - User requests password reset
   - Reset link sent to email
   - User sets new password
   - Session established upon successful reset

## Development Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/PostgreSQL/SQLite

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd project-name
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```

4. Configure environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Configure database in `.env`

6. Run migrations:
   ```bash
   php artisan migrate
   ```

7. Start development servers:
   ```bash
   # Backend (in one terminal)
   php artisan serve
   
   # Frontend (in another terminal)
   npm run dev
   ```

## Deployment

### Production Requirements
- Web server (Nginx/Apache)
- PHP 8.2+ with required extensions
- Node.js 18+ (for building assets)
- Database server

### Deployment Steps

1. Install production dependencies:
   ```bash
   composer install --optimize-autoloader --no-dev
   npm install --production
   ```

2. Build assets:
   ```bash
   npm run build
   ```

3. Optimize Laravel:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

## Testing

### Running Tests
```bash
# Run PHPUnit tests
php artisan test

# Run PHPUnit with coverage
php artisan test --coverage

# Run JavaScript tests
npm test
```

## Common Tasks

### Creating a New Page
1. Create a new component in `resources/js/Pages`
2. Add a route in `routes/web.php`
3. Link to the page using Inertia's `Link` component

### Creating a New API Endpoint
1. Create a new controller in `app/Http/Controllers/Api`
2. Add a route in `routes/api.php`
3. Test the endpoint using Postman or curl

### Database Migrations
```bash
# Create migration
php artisan make:migration create_table_name_table

# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback
```

### Creating a New Component
1. Create a new file in `resources/js/Components`
2. Export the component
3. Import and use it in your pages

## Troubleshooting

### Common Issues
- **Missing Node modules**: Run `npm install`
- **Composer dependencies**: Run `composer install`
- **Environment configuration**: Ensure `.env` is properly configured
- **File permissions**: Check storage and bootstrap/cache permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is open-source and available under the [MIT License](LICENSE).
