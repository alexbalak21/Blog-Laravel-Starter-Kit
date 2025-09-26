<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_posts = Post::where('user_id', auth()->id())->get()->toArray();
        return Inertia::render('Posts/Index', [
            'posts' => $user_posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        Post::create($validated);
        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        // Ensure the post belongs to the authenticated user
        if ($post->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
        
        return Inertia::render('Posts/Edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'body' => $post->body,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());
        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
        $post->delete();
        return redirect()->route('posts.index');
    }
}
