<div {{ $attributes->merge(['class' => 'p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md' . ($attributes->get('class') ? ' ' . $attributes->get('class') : '')]) }}>
    @if(isset($title))
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $title }}</h3>
    @endif
    {{ $slot }}
</div>
