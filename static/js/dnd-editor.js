import { RemoveBorderLastcommonFlexClasses, getContrastColor, rgb2hex, applyGroupBackgroundColorToNonGroup,
    updateUIheight, appendEventButton
} from '/static/js/global-script.js';
import { defaultItems } from '/static/js/data.js';

const addMoreContainerTemplate = `
    <div data-class="addMoreClasses">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        <p>Add Event</p>
    </div>
`;

async function renderDndEditorScripts(items) {
    try {
        const $component = $('[data-js-component="DndComponent"]').first();
        if ($component.length === 0) return;

        const { renderContent } = await import('/static/js/js_components/DndComponent.js');
        if (typeof renderContent !== 'function') {
            throw new Error('renderContent function not found in DndComponent.js');
        }

        const content = await renderContent(items);
        $component.html(content).append(addMoreContainerTemplate);
    } catch (error) {
        console.error('Error rendering DndComponent:', error);
    }
}

async function renderComponent($el) {
    const componentName = $el.data('js-component');
    if (componentName === 'DndComponent') return;

    try {
        const { default: renderContent } = await import(`/static/js/js_components/${componentName}.js`);
        const content = renderContent();
        $el.html(content);

        // Process nested components sequentially
        const $nestedComponents = $el.find('[data-js-component]');
        for (let i = 0; i < $nestedComponents.length; i++) {
            await renderComponent($($nestedComponents[i]));
        }
    } catch (error) {
        console.error(`Error loading component "${componentName}":`, error);
    }
}

async function renderAllComponents($components) {
    for (let i = 0; i < $components.length; i++) {
        await renderComponent($($components[i]));
    }
}

async function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function updateUI() {
    return new Promise(resolve => {
        setTimeout(() => {
            $('[data-class="containerClasses"]').removeClass('hidden').hide().fadeIn(500);
            
            // Add spacing for message-panel and variable-panel
            $('.single-panel').each(function (index) {
                if ($(this).prevAll('.single-panel').length === 0) {
                    $(this).find(`[data-class="panelContainerClasses"]`).css('padding-top', '8px');
                }
                if ($(this).nextAll('.single-panel').length === 0) {
                    $(this).find(`[data-class="panelContainerClasses"]`).css('padding-bottom', '8px');
                }
            });

            appendEventButton();
            updateUIheight();
            RemoveBorderLastcommonFlexClasses();
            applyGroupBackgroundColorToNonGroup();
            $('#loadingSection').remove();
            resolve();
        }, 50);
    });
}

$(document).ready(async () => {
    try {
        // 1. Initialize items
        let items = defaultItems;
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            items = JSON.parse(storedItems);
        } else {
            localStorage.setItem('items', JSON.stringify(items));
        }

        // 2. Render DndEditor
        await renderDndEditorScripts(items);

        // 3. Render other components sequentially
        const $components = $('[data-js-component]').not('[data-js-component="DndComponent"]');
        await renderAllComponents($components);

        // 4. Apply classes
        const { default: applyClasses } = await import('/static/js/render/class-render.js');
        await applyClasses();

        // 5. Update number panels and group sections
        $('[data-class="numberPanelClasses"]').each(function (index) {
            $(this).html(`<span>${index + 1}</span>`);
            const bgColor = $(this).css('background-color');
            const hexColor = rgb2hex(bgColor);
            const textColor = getContrastColor(hexColor);
            $(this).css('color', textColor);
        });

        $('[data-class="groupSectionClasses"]').each(function (index) {
            const bgColor = $(this).css('background-color');
            const hexColor = rgb2hex(bgColor);
            const textColor = getContrastColor(hexColor);
            $(this).css('color', textColor);
        });

        // 6. Set up event handlers
        $(document).on('click', '#updateUI', updateUIheight);
        
        $(window).on('resize', () => {
            setTimeout(updateUIheight, 50);
        });

        // 7. Prevent duplicate IDs
        $('[data-class="commonFlexClasses"]').each(function () {
            const dndId = $(this).attr('dnd-id');
            const $duplicates = $(`[data-class="commonFlexClasses"][dnd-id="${dndId}"]`);
            $duplicates.slice(1).each(function () {
                $(this).attr('dnd-id', crypto.randomUUID());
            });
        });

        // 8. Load additional scripts and update UI
        await Promise.all([
            loadScript('/static/js/dnd-command.js'),
            loadScript('/static/js/dnd-command-menu.js'),
            loadScript('/static/js/input-property.js'),
            loadScript('/static/js/dnd-minimap.js')
        ]);
        
        await updateUI();

    } catch (error) {
        console.error('Error during initialization:', error);
    }
});