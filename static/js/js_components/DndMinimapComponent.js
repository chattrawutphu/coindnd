export default function renderContent() {
    const html = `
        <div class="absolute top-10 right-4">
            <div id="minimap"
                class="h-64 w-8 bg-[#4D5568]/20 rounded-sm relative cursor-pointer group opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div id="minimap-slider"
                    class="absolute bg-[#4D5568] rounded-sm w-full opacity-100 transition-opacity duration-300 ease-in-out cursor-grab active:cursor-grabbing">
                </div>
            </div>
        </div>
        <div id="button-container" class="absolute top-12 right-10 flex flex-wrap justify-end max-w-md gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
    `;
    return html;
}



