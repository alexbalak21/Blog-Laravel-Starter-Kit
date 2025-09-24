# Laravel Starter Kit: Crash Course

Welcome to the Laravel Starter Kit! This crash course will help you get up and running quickly with the key concepts and features of this starter kit.

## 🚀 Quick Start

### 1. Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/PostgreSQL/SQLite

### 2. Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd your-project

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env

# Run migrations and seeders
php artisan migrate --seed

# Build assets
npm run build

# Start the development server
php artisan serve
```

## 🏗️ Project Structure

```
app/                 # Core application code
├── Http/            # Controllers, Middleware, Requests
├── Models/          # Eloquent models
└── Providers/       # Service providers

config/             # Configuration files

database/           # Migrations, seeders, factories

public/             # Web server entry point

resources/
├── js/              # Frontend JavaScript/TypeScript
│   ├── Components/  # Reusable React components
│   ├── Layouts/     # Page layouts
│   └── Pages/       # Inertia pages (routes)
└── views/          # Blade templates

routes/             # Application routes
```

## 🔑 Authentication

The starter kit uses Laravel Fortify for authentication:

### Available Auth Endpoints
- `/register` - User registration
- `/login` - User login
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/email/verify` - Email verification

### Protecting Routes
```php
// Single route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified']);

// Route group
Route::middleware(['auth', 'verified'])->group(function () {
    // Protected routes here
});
```

## 🛠️ Common Tasks

### Creating a New Page
1. Create a new component in `resources/js/Pages`
2. Add a route in `routes/web.php`
3. Link to it using Inertia's `Link` component

### Creating a Model with Migration
```bash
php artisan make:model Post -m
```

### Creating a Controller
```bash
# Regular controller
php artisan make:controller PostController

# Resource controller
php artisan make:controller PostController --resource
```

### Running Migrations
```bash
# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Refresh database
php artisan migrate:fresh --seed
```

## 🔄 Frontend Development

### Development Build
```bash
# Start Vite dev server
npm run dev
```

### Building for Production
```bash
# Build assets
npm run build

# Build and watch for changes
npm run watch
```

### Key Frontend Files
- `resources/js/app.js` - Main JavaScript entry point
- `resources/css/app.css` - Main stylesheet
- `resources/js/Layouts/` - Layout components
- `resources/js/Pages/` - Page components

## 🔍 Debugging

### Common Issues
1. **CSRF Token Mismatch**
   - Ensure `APP_URL` in `.env` matches your app URL
   - Clear config cache: `php artisan config:clear`

2. **Missing NPM Dependencies**
   ```bash
   npm install
   ```

3. **Class Not Found**
   ```bash
   composer dump-autoload
   ```

4. **Page Not Updating**
   - Clear view cache: `php artisan view:clear`
   - Restart Vite dev server

## 📚 Learning Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🚀 Next Steps

1. Explore the `resources/js/Pages` directory to understand the page structure
2. Check out the existing components in `resources/js/Components`
3. Review the authentication flow in `app/Http/Controllers/Auth`
4. Customize the default layout in `resources/js/Layouts`

## 🆘 Need Help?

If you encounter any issues or have questions:
1. Check the [Laravel documentation](https://laravel.com/docs)
2. Search the [Laravel Forge community](https://forge.laravel.com/)
3. Open an issue in the repository

---

Happy coding! 🎉
