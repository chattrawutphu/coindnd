export default function renderContent() {
    const html = `
<button id="undoBtn"
    class="justify-center  h-8  p-0.5 overflow-hidden text-xs text-primary-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
    <span
        class="flex items-center  h-full py-1 px-1.5 relative transition-all ease-in duration-75 bg-white dark:bg-primary-900 rounded-md group-hover:bg-opacity-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            class="w-5 h-5">
            <path fill-rule="evenodd"
                d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
                clip-rule="evenodd" />
        </svg>
        <span class="ml-1 text-sm font-medium">Undo</span>
    </span>

</button>
<button id="redoBtn"
    class="justify-center  h-8 p-0.5 overflow-hidden text-xs text-primary-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
    <span
        class="flex items-center  h-full py-1 px-1.5 relative transition-all ease-in duration-75 bg-white dark:bg-primary-900 rounded-md group-hover:bg-opacity-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            class="w-5 h-5">
            <path fill-rule="evenodd"
                d="M12.207 2.232a.75.75 0 0 0 .025 1.06l4.146 3.958H6.375a5.375 5.375 0 0 0 0 10.75H9.25a.75.75 0 0 0 0-1.5H6.375a3.875 3.875 0 0 1 0-7.75h10.003l-4.146 3.957a.75.75 0 0 0 1.036 1.085l5.5-5.25a.75.75 0 0 0 0-1.085l-5.5-5.25a.75.75 0 0 0-1.06.025Z"
                clip-rule="evenodd" />
        </svg>
        <span class="ml-1 text-sm font-medium">Redo</span>
    </span>

</button>
    `;
    return $(html);
}