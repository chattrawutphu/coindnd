// constants.js
const MENU_ITEMS = {
    dashboard: {
        icon: `<path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />`,
        label: 'Dashboard'
    },
    exchanges: {
        icon: `<path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />`,
        label: 'Exchanges',
        children: ['Cryptocurrency', 'Forex', 'Stocks']
    },
    marketplace: {
        icon: `<path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" /><path fill-rule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clip-rule="evenodd" />`,
        label: 'Marketplace'
    },
    subscription: {
        icon: `<path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" /><path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />`,
        label: 'Subscription'
    },
    referral: {
        icon: `<path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" /><path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />`,
        label: 'Referral Program'
    }
};

const FOOTER_ITEMS = {
    settings: {
        icon: `<path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />`,
        label: 'Settings'
    },
    help: {
        icon: `<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />`,
        label: 'Help & Support'
    }
};

// components.js
const createSvgIcon = (pathData) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-3">
        ${pathData}
    </svg>
`;

const createMenuItem = ({ icon, label, hasChildren = false }) => `
    <div class="menu-item py-2 px-4 rounded-lg mb-1 flex items-center cursor-pointer hover:bg-primary-300 dark:hover:bg-primary-775 transition-colors duration-200">
        ${createSvgIcon(icon)}
        <span>${label}</span>
        ${hasChildren ? `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="size-4 ml-auto transition-transform duration-200">
                <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
        ` : ''}
    </div>
`;

const createDropdownContent = (children) => `
    <div class="dropdown-container max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
        <ul class="pl-8">
            ${children.map(child => `
                <li class="menu-item py-2 px-4 rounded-lg flex items-center cursor-pointer hover:bg-primary-300 dark:hover:bg-primary-775 transition-colors duration-200">
                    <span>${child}</span>
                </li>
            `).join('')}
        </ul>
    </div>
`;

const createStatusBar = () => `
    <div class="bg-primary-300 dark:bg-primary-800 rounded-lg p-2 mb-4 text-xs flex justify-between items-center">
        <span>The market is open</span>
        <button class="bg-primary-200 dark:bg-primary-800 px-2 py-1 rounded text-xs">View All</button>
    </div>
`;

// main.js
export default function renderContent() {
    const buildMenu = () => {
        return Object.entries(MENU_ITEMS).map(([key, item]) => {
            if (item.children) {
                return `
                    <li class="dropdown">
                        ${createMenuItem({ ...item, hasChildren: true })}
                        ${createDropdownContent(item.children)}
                    </li>
                `;
            }
            return `<li>${createMenuItem(item)}
            </li>`;
        }).join('');
    };

    const buildFooter = () => {
        return Object.entries(FOOTER_ITEMS).map(([key, item]) => `
            <li>
                ${createMenuItem(item)}
            </li>
        `).join('');
    };

    const html = `
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
            <div data-js-component="LogoTextComponent.js"></div>
        </div>

        <!-- Status Bar -->
        ${createStatusBar()}
        
        <!-- Main Navigation -->
        <nav class="flex-grow">
            <ul>${buildMenu()}</ul>
        </nav>

        <!-- Footer -->
        <div class="mt-auto">
            <ul>${buildFooter()}</ul>
            <!--${createThemeToggle()}-->
        </div>
    `;

    const $content = $(html);
    initializeDropdowns($content);
    initializeThemeToggle($content);
    return $content;
}

// utils.js - Utility functions
function createThemeToggle() {
    return `
        <div class="flex items-center justify-between mt-4 text-sm">
            <span>Dark Mode</span>
            <div class="theme-toggle w-12 h-6 bg-primary-300 dark:bg-primary-700 rounded-full p-1 flex items-center cursor-pointer">
                <div class="toggle-circle w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full transition-all duration-200 ${isDarkMode() ? 'ml-auto' : ''}"></div>
            </div>
        </div>
    `;
}

function isDarkMode() {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

// handlers.js - Event handlers
function initializeDropdowns($content) {
    $content.find('.dropdown .menu-item').click(function() {
        const $container = $(this).siblings('.dropdown-container');
        const $icon = $(this).find('svg:last');
        const isOpen = $container.height() > 0;
        
        // Close other dropdowns
        $('.dropdown-container').not($container).css('maxHeight', '0px');
        $('.dropdown svg:last').not($icon).css('transform', 'rotate(0deg)');
        
        // Toggle current dropdown
        $container.css('maxHeight', isOpen ? '0px' : $container.prop('scrollHeight') + 'px');
        $icon.css('transform', `rotate(${isOpen ? 0 : 180}deg)`);
    });
}

function initializeThemeToggle($content) {
    const $toggle = $content.find('.theme-toggle');
    const $circle = $toggle.find('.toggle-circle');

    // Set initial state
    if (isDarkMode()) {
        document.documentElement.classList.add('dark');
    }

    $toggle.click(function() {
        const isDark = document.documentElement.classList.toggle('dark');
        $circle.toggleClass('ml-auto');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Optional: Add window resize handler for responsive behavior
$(window).resize(function() {
    $('.dropdown-container').each(function() {
        const $container = $(this);
        if ($container.height() > 0) {
            $container.css('maxHeight', $container.prop('scrollHeight') + 'px');
        }
    });
});