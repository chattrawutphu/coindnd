export default function renderContent() {
    const html = `
        <label class="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="relative w-9 h-5 bg-primary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-primary-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-primary-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-primary-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-primary-900 dark:text-primary-300">Disabled When True</span>
        </label>
    `;

    return $(html);
}