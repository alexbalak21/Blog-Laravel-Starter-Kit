# Authentication System

This document provides a comprehensive guide to the authentication system implemented in the Laravel Starter Kit, which uses Laravel Fortify and Inertia.js.

## Table of Contents
1. [Authentication Flow](#authentication-flow)
2. [Key Components](#key-components)
3. [User Registration](#user-registration)
4. [User Login](#user-login)
5. [Email Verification](#email-verification)
6. [Password Reset](#password-reset)
7. [Protected Routes](#protected-routes)
8. [Customization](#customization)
9. [Troubleshooting](#troubleshooting)

## Authentication Flow

The authentication system follows this high-level flow:

1. **Registration**: User signs up with email and password
2. **Email Verification**: Optional email verification (if enabled)
3. **Login**: User authenticates with credentials
4. **Session Management**: Secure session is established
5. **Authorization**: Middleware protects routes
6. **Logout**: Session is terminated

## Key Components

### Backend (Laravel Fortify)
- **Controllers**: `app/Http/Controllers/Auth/*`
- **Models**: `app/Models/User.php`
- **Migrations**: `database/migrations/*_create_users_table.php`
- **Configuration**: `config/fortify.php`
- **Policies**: `app/Policies/*`

### Frontend (React/Inertia)
- **Pages**: `resources/js/Pages/Auth/*`
- **Components**: `resources/js/Components/Auth/*`
- **Layouts**: `resources/js/Layouts/Auth/*`

## User Registration

### Process
1. User visits `/register`
2. Submits registration form with required details
3. Laravel Fortify validates the input
4. User record is created in the database
5. Verification email is sent (if enabled)
6. User is redirected to the dashboard or verification notice

### Relevant Files
- `resources/js/Pages/Auth/Register.jsx`
- `app/Http/Controllers/Auth/RegisterController.php`
- `app/Http/Requests/Auth/RegisterRequest.php`

## User Login

### Process
1. User visits `/login`
2. Submits email and password
3. Fortify authenticates the credentials
4. Session is established
5. User is redirected to the intended page or dashboard

### Relevant Files
- `resources/js/Pages/Auth/Login.jsx`
- `app/Http/Controllers/Auth/LoginController.php`
- `app/Http/Requests/Auth/LoginRequest.php`

## Email Verification

### Process
1. After registration, verification email is sent
2. User clicks verification link
3. Email is verified in the system
4. User gains access to protected routes

### Configuration
Enable/disable in `config/fortify.php`:
```php
'features' => [
    Features::emailVerification(),
],
```

## Password Reset

### Process
1. User clicks "Forgot Password"
2. Enters email address
3. Receives password reset link
4. Clicks link and sets new password
5. Can now log in with new credentials

### Relevant Files
- `resources/js/Pages/Auth/ForgotPassword.jsx`
- `resources/js/Pages/Auth/ResetPassword.jsx`
- `app/Http/Controllers/Auth/PasswordResetLinkController.php`
- `app/Http/Controllers/Auth/NewPasswordController.php`

## Protected Routes

### Middleware
Routes can be protected using:
- `auth` - Requires authentication
- `verified` - Requires verified email
- `password.confirm` - Requires password confirmation

### Example
```php
Route::middleware(['auth', 'verified'])->group(function () {
    // Protected routes here
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
```

## Customization

### Customizing Authentication Logic
1. **Controllers**: Publish and modify Fortify's controllers
   ```bash
   php artisan vendor:publish --provider="Laravel\Fortify\FortifyServiceProvider"
   ```

2. **Views**: Customize the authentication views
   ```bash
   php artisan vendor:publish --tag=fortify-views
   ```

3. **Validation**: Modify validation rules in `app/Providers/FortifyServiceProvider.php`

### Adding Custom Fields to Registration
1. Update the users table migration
2. Modify the registration controller
3. Update the registration request validation

## Troubleshooting

### Common Issues
1. **CSRF Token Mismatch**
   - Ensure `APP_URL` in `.env` matches your application URL
   - Clear config cache: `php artisan config:clear`

2. **Email Not Sending**
   - Check mail configuration in `.env`
   - Verify mail driver (e.g., smtp, mailhog, log)

3. **Session Issues**
   - Clear session: `php artisan session:clear`
   - Check `SESSION_DRIVER` in `.env`

4. **Routes Not Found**
   - Clear route cache: `php artisan route:clear`
   - Ensure routes are properly defined in `routes/web.php`

## Security Considerations

- Always use HTTPS in production
- Enable CSRF protection
- Use secure, random `APP_KEY`
- Implement rate limiting for authentication endpoints
- Regularly update dependencies
- Use strong password policies
