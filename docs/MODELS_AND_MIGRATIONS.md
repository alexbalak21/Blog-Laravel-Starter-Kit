# Working with Models, Migrations, Controllers, and Views

This guide explains how to add and work with models, migrations, controllers, and views in the Laravel Starter Kit.

## Table of Contents
1. [Creating a New Feature](#creating-a-new-feature)
2. [Models](#models)
   - [Creating a Model](#creating-a-model)
   - [Model Conventions](#model-conventions)
   - [Relationships](#relationships)
3. [Migrations](#migrations)
   - [Creating Migrations](#creating-migrations)
   - [Running Migrations](#running-migrations)
   - [Rolling Back Migrations](#rolling-back-migrations)
4. [Controllers](#controllers)
   - [Creating Controllers](#creating-controllers)
   - [Resource Controllers](#resource-controllers)
   - [API Controllers](#api-controllers)
5. [Views](#views)
   - [Creating Views](#creating-views)
   - [Inertia Pages](#inertia-pages)
   - [Components](#components)
6. [Putting It All Together](#putting-it-all-together)
7. [Best Practices](#best-practices)

## Creating a New Feature

When adding a new feature (e.g., a Blog Post system), follow these steps:

1. Create a migration for the database table
2. Create a model with relationships and business logic
3. Create a controller to handle HTTP requests
4. Create views/React components for the frontend
5. Define routes

## Models

### Creating a Model

```bash
# Create a model with migration and factory
php artisan make:model Post -m
```

This creates:
- `app/Models/Post.php`
- `database/migrations/YYYY_MM_DD_HHMMSS_create_posts_table.php`

### Model Conventions

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'published_at' => 'datetime',
    ];
}
```

### Relationships

#### One-to-Many (User has many Posts)

```php
// In User.php
public function posts()
{
    return $this->hasMany(Post::class);
}

// In Post.php
public function user()
{
    return $this->belongsTo(User::class);
}
```

#### Many-to-Many (Post has many Tags)

```php
// In Post.php
public function tags()
{
    return $this->belongsToMany(Tag::class);
}

// In Tag.php
public function posts()
{
    return $this->belongsToMany(Post::class);
}
```

## Migrations

### Creating Migrations

```bash
# Create a new migration
php artisan make:migration create_posts_table

# Add columns to existing table
php artisan make:migration add_published_at_to_posts_table --table=posts
```

Example migration:

```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->string('title');
        $table->text('content');
        $table->timestamp('published_at')->nullable();
        $table->timestamps();
        $table->softDeletes();
    });
}
```

### Running Migrations

```bash
# Run all pending migrations
php artisan migrate

# Run migrations for a specific path
php artisan migrate --path=/database/migrations/2023_*_create_posts_table.php
```

### Rolling Back Migrations

```bash
# Rollback the last batch of migrations
php artisan migrate:rollback

# Rollback all migrations
php artisan migrate:reset

# Rollback and re-run all migrations
php artisan migrate:refresh
```

## Controllers

### Creating Controllers

```bash
# Create a new controller
php artisan make:controller PostController

# Create a resource controller
php artisan make:controller PostController --resource

# Create an API controller
php artisan make:controller API/PostController --api
```

### Resource Controllers

```php
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(10);
        return Inertia::render('Posts/Index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(StorePostRequest $request)
    {
        $post = $request->user()->posts()->create($request->validated());
        
        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully.');
    }

    // Other resource methods...
}
```

### API Controllers

```php
class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(
            Post::with('user')->latest()->paginate(10)
        );
    }

    public function store(StorePostRequest $request)
    {
        $post = $request->user()->posts()->create($request->validated());
        
        return new PostResource($post);
    }

    // Other API methods...
}
```

## Views

### Creating Views (Inertia Pages)

Create new pages in `resources/js/Pages`:

```jsx
// resources/js/Pages/Posts/Index.jsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ posts }) {
    return (
        <AuthenticatedLayout>
            <Head title="Posts" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Posts</h2>
                                <Link 
                                    href={route('posts.create')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Create Post
                                </Link>
                            </div>
                            
                            {/* Post list */}
                            {posts.data.map((post) => (
                                <div key={post.id} className="mb-4 p-4 border rounded">
                                    <h3 className="text-xl font-semibold">{post.title}</h3>
                                    <p className="text-gray-600">{post.excerpt}</p>
                                    <Link 
                                        href={route('posts.show', post.id)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Read more
                                    </Link>
                                </div>
                            ))}
                            
                            {/* Pagination */}
                            <div className="mt-4">
                                {posts.links()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

### Components

Create reusable components in `resources/js/Components`:

```jsx
// resources/js/Components/PostCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function PostCard({ post }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">
                <Link href={route('posts.show', post.id)} className="hover:underline">
                    {post.title}
                </Link>
            </h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Posted by {post.user.name}
                </span>
                <Link 
                    href={route('posts.show', post.id)}
                    className="text-blue-500 hover:underline"
                >
                    Read more →
                </Link>
            </div>
        </div>
    );
}
```

## Putting It All Together

### Example: Blog Post System

1. **Create migration and model**
   ```bash
   php artisan make:model Post -m
   ```

2. **Define the migration**
   ```php
   // In the created migration file
   public function up()
   {
       Schema::create('posts', function (Blueprint $table) {
           $table->id();
           $table->foreignId('user_id')->constrained()->cascadeOnDelete();
           $table->string('title');
           $table->string('slug')->unique();
           $table->text('content');
           $table->timestamp('published_at')->nullable();
           $table->timestamps();
       });
   }
   ```

3. **Create controller**
   ```bash
   php artisan make:controller PostController --resource
   ```

4. **Define routes**
   ```php
   // routes/web.php
   Route::resource('posts', PostController::class)
       ->middleware(['auth', 'verified']);
   ```

5. **Create views**
   - `resources/js/Pages/Posts/Index.jsx`
   - `resources/js/Pages/Posts/Create.jsx`
   - `resources/js/Pages/Posts/Edit.jsx`
   - `resources/js/Pages/Posts/Show.jsx`

## Best Practices

1. **Models**
   - Keep models focused on data and relationships
   - Use accessors and mutators for data transformation
   - Move complex queries to query scopes or dedicated query builders

2. **Migrations**
   - Always include rollback logic in `down()` method
   - Use meaningful migration names
   - Add indexes for frequently queried columns

3. **Controllers**
   - Keep controllers thin
   - Use form requests for validation
   - Move business logic to service classes

4. **Views/Components**
   - Keep components small and focused
   - Use props for data passing
   - Reuse components when possible
   - Follow a consistent naming convention

5. **File Organization**
   - Group related files by feature
   - Use subdirectories for better organization
   - Follow Laravel and Inertia.js conventions
