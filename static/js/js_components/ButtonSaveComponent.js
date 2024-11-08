export default function renderContent() {
    const html = `
    <button id="saveBtn"
        class="relative inline-flex items-center justify-center h-8 p-0.5 overflow-hidden text-sm text-primary-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span
            class="flex items-center h-full gap-x-1 py-1.5 px-3 relative transition-all ease-in duration-75 bg-white dark:bg-primary-900 rounded-md group-hover:bg-opacity-0">
            <p>save</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="size-5">
                <path fill-rule="evenodd"
                    d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                    clip-rule="evenodd" />
            </svg>

        </span>
    </button>
    `;
    return $(html);
}