<footer {{ $attributes->merge(['class' => 'bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700']) }}>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        {{ $slot }}
    </div>
</footer>
