export default function renderContent() {
    const html = `
<button type="button"
class="h-8 float-right text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 text-center">
Upgrade Plan</button>
    `;
    return $(html);
}