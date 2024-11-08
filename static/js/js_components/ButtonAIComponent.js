export default function renderContent() {
    const html = `
        <button class="relative inline-flex items-center justify-center h-8 p-0.5 overflow-hidden text-sm text-primary-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:scale-105 transition-all duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative flex rounded-full items-center h-full px-2 bg-white dark:bg-primary-900 transition-all duration-300 ease-in-out group-hover:bg-opacity-0">
                <div class="w-6 h-6 relative overflow-hidden transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                    <img src="/static/icon/ai.png" 
                            alt="AI Icon" 
                            class="w-full h-full object-cover opacity-100 transition-all duration-300 group-hover:opacity-90">
                </div>
            </span>
            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></span>
        </button>
    `;
    return $(html);
}