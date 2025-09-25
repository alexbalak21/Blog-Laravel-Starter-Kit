<header class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
            {{ $title ?? 'My Awesome Blog' }}
        </h1>
        @if(isset($nav))
            <nav class="mt-2">
                {{ $nav }}
            </nav>
        @endif
    </div>
</header>
