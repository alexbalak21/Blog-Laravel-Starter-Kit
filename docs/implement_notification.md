# Notification Implementation Guide

*Documentation for implementing the notification system in the Laravel + React application.*

## Overview

This document will cover the implementation details of the notification system.

## Table of Contents

1. [Setup and Configuration](#setup-and-configuration)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

## Setup and Configuration

### Prerequisites
- Node.js (v14 or higher)
- npm (v7 or higher)
- Laravel project with Vite configured

### Installation

1. Install shadcn/ui components:
   ```bash
   npx shadcn@latest add toast
   ```

2. The command will install the following dependencies:
   - @radix-ui/react-toast
   - class-variance-authority
   - clsx
   - tailwind-merge
   - lucide-react

### Configuration

1. Add the Toaster component to your app layout (typically in `resources/js/layouts/app-layout.tsx`):

   ```tsx
   import { Toaster } from "@/components/ui/toaster"

   function AppLayout({ children, breadcrumbs, ...props }) {
       return (
           <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
               {children}
               <Toaster position="bottom-right" richColors />
           </AppLayoutTemplate>
       )
   }
   ```

2. Make sure your Tailwind CSS is properly configured to include the necessary styles. The shadcn installation should handle this automatically, but verify your `tailwind.config.js` includes:

   ```js
   module.exports = {
     content: [
       "./resources/**/*.{js,ts,jsx,tsx}",
       "./node_modules/@radix-ui/themes/**/*.{js,ts,jsx,tsx}",
     ],
     // ... rest of the config
   }
   ```

## Backend Implementation

### Flash Messages Setup

To enable flash messages in your Laravel application, you need to configure the `AppServiceProvider` to share flash data with Inertia.js.

#### 1. Update AppServiceProvider

Modify your `app/Providers/AppServiceProvider.php` file to include the following code:

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                    'info' => session('info'),
                    'warning' => session('warning'),
                ];
            },
        ]);
    }
}
```

#### 2. Sending Flash Messages from Controllers

You can send flash messages from your controllers like this:

```php
// Success message
return back()->with('success', 'Operation completed successfully!');

// Error message
return back()->with('error', 'An error occurred!');

// Info message
return back()->with('info', 'Here is some information.');

// Warning message
return back()->with('warning', 'Please check your input.');
```

#### 3. How It Works

1. The `AppServiceProvider` shares flash messages with the frontend through Inertia.js
2. The flash data is automatically passed to your React components via the `usePage()` hook
3. The `useFlashToast` hook detects these messages and displays them as toast notifications
4. After displaying, the flash messages are automatically cleared from the session

## Frontend Implementation

### useFlashToast Hook

The `useFlashToast` hook handles flash messages from the server and displays them as toast notifications. It automatically clears the flash messages from the URL after displaying them.

#### Usage

1. **Recommended**: Add the hook to your main layout component (e.g., `app-layout.tsx`) to handle notifications across your entire application:

```tsx
import useFlashToast from '@/hooks/useFlashToast';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    useFlashToast();

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster position="bottom-right" richColors />
        </AppLayoutTemplate>
    );
}
```

2. **Alternative**: Use the hook in individual page components if you need more control:

```tsx
import useFlashToast from '@/hooks/useFlashToast';

function YourPage() {
    useFlashToast();
    // ... rest of your component
}
```

#### How It Works

1. The hook listens for flash messages in the page props
2. When a flash message is detected, it:
   - Displays the appropriate toast notification based on the message type (success, error, info, warning)
   - Makes a new request to the same URL to clear the flash messages from the session
   - Updates the browser history to maintain a clean URL

#### Implementation Details

```typescript
import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type FlashMessages = {
    success?: string;
    error?: string;
    info?: string;
    warning?: string;
};

export default function useFlashToast() {
    const { flash } = usePage().props as { flash?: FlashMessages };

    useEffect(() => {
        if (!flash) return;

        const showToast = (
            type: keyof FlashMessages,
            fn: (msg: string) => void,
        ) => {
            const message = flash[type];
            if (message) {
                fn(message);
                router.visit(window.location.pathname, {
                    only: [],
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        window.history.replaceState(
                            {},
                            document.title,
                            window.location.pathname,
                        );
                    },
                });
            }
        };

        showToast('success', toast.success);
        showToast('error', toast.error);
        showToast('info', toast.info);
        showToast('warning', toast.warning);
    }, [flash]);
}
```

#### Features

- **Automatic Cleanup**: Automatically removes flash messages from the URL after display
- **Multiple Message Types**: Supports success, error, info, and warning messages
- **Preserves State**: Uses Inertia's `preserveState` to maintain component state
- **Clean URLs**: Maintains clean URLs by removing flash message parameters

### Showing Notifications from Components

You can trigger toast notifications directly from any React component using the `toast` function from `sonner`:

```tsx
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

function NotificationExample() {
    return (
        <div>
            <h1>Notification Examples</h1>
            
            {/* Normal Notification */}
            <Button 
                className='mx-2' 
                onClick={() => toast('Normal notification')}
            >
                Normal Notification
            </Button>

            {/* Success Notification */}
            <Button 
                className='bg-green-500 text-white mx-2' 
                onClick={() => toast.success('Success notification')}
            >
                Success Notification
            </Button>

            {/* Error Notification */}
            <Button 
                className='bg-red-500 text-white mx-2' 
                onClick={() => toast.error('Error notification')}
            >
                Error Notification
            </Button>

            {/* Info Notification */}
            <Button 
                className='bg-blue-500 text-white mx-2' 
                onClick={() => toast.info('Info notification')}
            >
                Info Notification
            </Button>

            {/* Warning Notification */}
            <Button 
                className='bg-yellow-500 text-white mx-2' 
                onClick={() => toast.warning('Warning notification')}
            >
                Warning Notification
            </Button>
        </div>
    );
}
```

### Showing Notifications from Server-Side (Laravel)

You can also trigger notifications from your Laravel controllers, which is useful after form submissions or other server-side operations:

```php
// In your controller methods
public function store(Request $request)
{
    // Your logic here...
    
    // Return with a success message
    return redirect()->route('posts.index')
        ->with('success', 'Post created successfully');
    
    // Or for errors
    return back()->with('error', 'Failed to create post');
    
    // Or for info messages
    return back()->with('info', 'Your changes were saved');
    
    // Or for warnings
    return back()->with('warning', 'Please review your changes');
}
```

### Customizing Notifications

You can customize the appearance and behavior of your notifications:

```tsx
// With custom duration
toast.success('This will close after 2 seconds', { duration: 2000 });

// With custom position
toast('Custom position', { position: 'top-center' });

// With JSX content
toast(
  <div className="flex items-center gap-2">
    <span>✅</span>
    <span>Custom JSX content</span>
  </div>
);
```

## Testing

### Frontend Testing

#### Testing Notification Component

You can test your notification components using React Testing Library. Here's an example test for a component that triggers notifications:

```tsx
// __tests__/NotificationButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { toast } from 'sonner';
import NotificationButton from '@/components/NotificationButton';

// Mock the toast module
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

describe('NotificationButton', () => {
  it('triggers success notification on button click', () => {
    render(<NotificationButton />);
    
    const button = screen.getByRole('button', { name: /show success/i });
    fireEvent.click(button);
    
    expect(toast.success).toHaveBeenCalledWith('Operation successful!');
  });
});
```

#### Testing useFlashToast Hook

To test the `useFlashToast` hook, you can use React's testing utilities along with a test component:

```tsx
// __tests__/useFlashToast.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { usePage } from '@inertiajs/react';
import useFlashToast from '@/hooks/useFlashToast';

// Mock usePage
jest.mock('@inertiajs/react', () => ({
  usePage: jest.fn(),
  router: {
    visit: jest.fn(),
  },
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

describe('useFlashToast', () => {
  it('shows success toast when flash.success is present', () => {
    // Mock the usePage hook to return flash message
    (usePage as jest.Mock).mockReturnValue({
      props: {
        flash: {
          success: 'Operation successful!',
        },
      },
    });

    const { result } = renderHook(() => useFlashToast());
    
    // The effect runs on mount, so we can assert immediately
    expect(toast.success).toHaveBeenCalledWith('Operation successful!');
  });
});
```

### Backend Testing

#### Testing Controller Flash Messages

You can test your Laravel controller's flash messages using PHPUnit:

```php
// tests/Feature/PostControllerTest.php

public function test_store_redirects_with_success_message()
{
    $response = $this->post(route('posts.store'), [
        'title' => 'Test Post',
        'content' => 'This is a test post',
    ]);

    $response->assertRedirect(route('posts.index'));
    $response->assertSessionHas('success', 'Post created successfully');
}

public function test_store_fails_with_validation_errors()
{
    $response = $this->post(route('posts.store'), [
        'title' => '', // Invalid: title is required
    ]);

    $response->assertSessionHasErrors(['title']);
}
```

### Integration Testing

Test the complete flow from controller to frontend:

```php
// tests/Feature/PostNotificationTest.php

public function test_success_notification_appears_after_post_creation()
{
    // Disable exception handling to see actual errors
    $this->withoutExceptionHandling();
    
    // Create a test user if needed
    $user = User::factory()->create();
    $this->actingAs($user);
    
    // Create a post
    $response = $this->post(route('posts.store'), [
        'title' => 'Test Post',
        'content' => 'This is a test post',
    ]);
    
    // Follow the redirect
    $response->assertStatus(302);
    $this->followRedirects($response)
         ->assertSee('Post created successfully');
}
```

### Tips for Testing

1. **Mock External Dependencies**: Always mock the toast notification library in your frontend tests to avoid rendering actual DOM elements.
2. **Test Edge Cases**: Test with different flash message types (success, error, info, warning).
3. **Test Message Content**: Verify that the correct message content is being passed to the notification.
4. **Test User Flow**: Test the complete user flow from form submission to notification display.
5. **Test Error States**: Ensure your application handles missing or malformed flash messages gracefully.

## Troubleshooting

*Common issues and their solutions will be documented here*
