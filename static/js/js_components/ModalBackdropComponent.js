import { modalDuration } from "/static/js/global-script.js";
export default function renderContent() {
    const html = `
<div id="modal-backdrop" class="fixed z-[1000] inset-0 bg-primary-900 bg-opacity-65 backdrop-blur-xl transition-opacity duration-[${modalDuration}ms] ease-in-out opacity-0 pointer-events-none">/div>
    `;

    return $(html);
}