export default function renderContent() {
    const html = `
<script>
    $(document).ready(function () {
        const $dropdown = $('#runBtnDropdown > div');
        const animationDuration = 200;

        function showDropdown() {
            $dropdown.css({
                'display': 'block',
                'opacity': '0',
                'transform': 'scale(0.9)'
            });
            setTimeout(() => {
                $dropdown.css({
                    'opacity': '1',
                    'transform': 'scale(1)'
                });
            }, 10);
        }

        function hideDropdown() {
            $dropdown.css({
                'opacity': '0',
                'transform': 'scale(0.9)'
            });

            setTimeout(() => {
                if (parseFloat($dropdown.css('opacity')) === 0) {
                    $dropdown.css('display', 'none');
                }
            }, animationDuration);
        }

        $('#runBtn').click(function (e) {
            e.stopPropagation();
            if ($dropdown.css('display') === 'none') {
                showDropdown();
            } else {
                hideDropdown();
            }
        });

        $('#runBtnDropdown a').click(function (e) {
            e.preventDefault();
            var action = $(this).data('action');
            console.log('Selected action: ' + action);
            hideDropdown();
        });

        $(document).click(function (e) {
            if (!$(e.target).closest('#runBtnDropdown').length) {
                hideDropdown();
            }
        });
    });
</script>

<div id="runBtnDropdown" class="relative inline-block text-left">
    <button id="runBtn" type="button"
        class="inline-flex items-center justify-center h-8 p-0.5 overflow-hidden text-sm font-medium text-primary-100 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-600 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-800">
        <span
            class="flex items-centerl h-full gap-x-2 p-1 transition-all ease-in duration-75 bg-primary-900 rounded-md group-hover:bg-opacity-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="w-5 h-5">
                <path
                    d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="w-5 h-5">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
            </svg>
        </span>
    </button>

    <div class="absolute start-0 min-w-64 w-full p-2 gap-y-2 z-10 font-medium dark:text-primary-300 text-primary-700 dark:bg-primary-900/60 dark:border-primary-500/30 backdrop-blur-md bg-primary-100 border-2 border-primary-300 rounded-md transform scale-90 transition-all duration-200 ease-in-out opacity-0"
        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
        style="display: none;">
        <div class="py-1" role="none">
            <a href="#"
                class="flex items-center gap-x-2 p-1 rounded-md hover:dark:bg-primary-700/60 hover:bg-primary-200"
                role="menuitem" tabindex="-1" id="menu-item-0"
                data-action="run-market-simulator">Run Market Simulator</a>
            <a href="#"
                class="flex items-center gap-x-2 p-1 rounded-md hover:dark:bg-primary-700/60 hover:bg-primary-200"
                role="menuitem" tabindex="-1" id="menu-item-1" data-action="run-backtest">Run
                Backtest</a>
            <a href="#"
                class="flex items-center gap-x-2 p-1 rounded-md hover:dark:bg-primary-700/60 hover:bg-primary-200"
                role="menuitem" tabindex="-1" id="menu-item-3" data-action="live-trade">Run Live
                Trading</a>
        </div>
    </div>
</div>


    `;
    return $(html);
}