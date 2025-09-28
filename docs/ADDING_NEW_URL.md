# Adding a New URL to the Application

This guide outlines the steps required to add a new URL/route to your Laravel + React application.

## 1. Backend (Laravel) Setup

### 1.1 Add Route to `routes/web.php`

```php
// Example: Add a new route
Route::get('/your-new-route', function () {
    return Inertia::render('YourNewComponent');
})->name('your-route-name');
```

### 1.2 Create Controller (if needed)
If your route requires server-side logic, create a controller:

```bash
php artisan make:controller YourNewController
```

## 2. Frontend (React) Setup

### 2.1 Add Route to TypeScript Definitions

1. Open `resources/js/routes/index.ts`
2. Add a new route definition following the existing pattern:

```typescript
/**
 * @see routes/web.php:XX (update line number)
 * @route '/your-new-route'
 */
export const yourNewRoute = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: yourNewRoute.url(options),
    method: 'get',
})

yourNewRoute.definition = {
    methods: ["get","head"],
    url: '/your-new-route',
} satisfies RouteDefinition<["get","head"]>

// Add URL method
yourNewRoute.url = (options?: RouteQueryOptions) => {
    return yourNewRoute.definition.url + queryParams(options)
}

// Add HTTP method handlers
yourNewRoute.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: yourNewRoute.url(options),
    method: 'get',
})

yourNewRoute.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: yourNewRoute.url(options),
    method: 'head',
})

// Add form handling (if needed)
const yourNewRouteForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: yourNewRoute.url(options),
    method: 'get',
})

yourNewRouteForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: yourNewRoute.url(options),
    method: 'get',
})

yourNewRouteForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: yourNewRoute.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

yourNewRoute.form = yourNewRouteForm
```

### 2.2 Create React Component

1. Create a new component in `resources/js/pages/`:

```tsx
// resources/js/pages/YourNewComponent.tsx
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { yourNewRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Page Title',
        href: yourNewRoute().url,
    },
];

export default function YourNewComponent() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Page Title" />
            <div>Your page content here</div>
        </AppLayout>
    );
}
```

### 2.3 Update Navigation (if needed)

If this should be in the main navigation, update `resources/js/components/app-sidebar.tsx`:

```typescript
import { yourNewRoute } from '@/routes';

// Add to your navigation items array
{
    title: 'Your Page',
    href: yourNewRoute(),
    icon: YourIcon, // Import from 'lucide-react'
}
```

## 3. Testing

1. Start your development server:
   ```bash
   npm run dev
   php artisan serve
   ```

2. Visit `http://localhost:8000/your-new-route` to verify it works

## 4. Type Safety

If you encounter TypeScript errors, ensure:
- All route methods are properly typed
- The component name matches the one in your Laravel route
- All imports are correct

## 5. Production Build

After adding new routes, remember to rebuild your assets for production:

```bash
npm run build
```

## Common Issues

- **404 Errors**: Double-check route names and file paths
- **Type Errors**: Verify all TypeScript types are correctly defined
- **Component Not Found**: Ensure the component name in `Inertia::render()` matches your React component name exactly
