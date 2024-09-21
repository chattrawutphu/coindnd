export default function renderContent() {
    const html = `
        <div class="absolute top-11 right-4" style="z-index:2000;">
            <div id="minimap" class="h-64 w-12 backdrop-blur-sm bg-[#4D5568]/60 rounded-md relative cursor-pointer group">
                <div id="minimap-slider" class="absolute bg-zinc-200/60 rounded-sm w-full cursor-grab active:cursor-grabbing">
                </div>
            </div>
            <button id="hide-minimap" class="absolute -bottom-7 right-3 p-1 bg-[#4D5568] text-white rounded-full hover:bg-[#5A6477] transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
        <div id="button-container" class="absolute top-[2.6rem] right-14 flex flex-wrap justify-end max-w-md gap-2"></div>
        <button id="show-minimap" class="absolute top-10 right-8 p-1 bg-[#4D5568] text-white rounded-full hover:bg-[#5A6477] transition-all duration-300 ease-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
            </svg>
        </button>
        <button  id="updateUI" class="hidden"></button>
    `;
    // Return both HTML and script as a jQuery object
    return html;
}



