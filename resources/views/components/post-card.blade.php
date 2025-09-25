<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-2">{{ $post->title }}</h2>
    <div class="prose dark:prose-invert max-w-none">
        {!! $post->body !!}
    </div>
    
    @if(isset($slot) && trim($slot) !== '')
        <div class="mt-6">
            {{ $slot }}
        </div>
    @endif
</div>
