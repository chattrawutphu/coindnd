/*<div class="panelWrapperClasses"
    dnd-id="{{item.id}}"
    dnd-type="{{item.type}}"
    dnd-subtype="{{item.subtype}}"
    dnd-title="{{item.title}}"
    dnd-show-children="{{item.showChildren}}"
    dnd-message="{{item.message}}">
    
    <div class="leftPanelClasses">
        {% for condition in item.conditions %}
            <div class="commonFlexClasses"
                dnd-id="{{condition.id}}"
                dnd-type="{{condition.type}}"
                dnd-title="{{condition.title}}"
                dnd-message="{{condition.message}}">
            </div>
        {% endfor %}
    </div>
    
    <div class="rightPanelClasses">
        {% for action in item.actions %}
            <div class="commonFlexClasses"
                dnd-id="{{action.id}}"
                dnd-type="{{action.type}}"
                dnd-title="{{action.title}}"
                dnd-message="{{action.message}}">
            </div>
        {% endfor %}
    </div>
</div>*/
function compressToBase64(input) {
    return btoa(unescape(encodeURIComponent(input)));
}

// ฟังก์ชันถอดรหัสข้อมูลจาก Base64
function decompressFromBase64(input) {
    return decodeURIComponent(escape(atob(input)));
}

function renderConditionMessage(params, message) {
    // Replace placeholders with corresponding params
    if (message.includes('{params[')) {
        message = message.replace(/{params\[(\d+)\]}/g, (match, index) => {
            const paramIndex = parseInt(index, 10);
            const param = params[paramIndex];

            // If the param exists
            if (param) {
                const color = param.color;
                const text = param.text;

                // If color is specified, apply it to the text
                if (text) {
                    if (color) {
                        return `<span class="dark:bg-[#414b5a] font-medium border-gray-400 border rounded-md p-1 mb-1" style="color: ${color};"><span>${text}</span></span>`;
                    } else {
                        return `<span  class="mb-1">${text}</span>`;
                    }
                } else { return ""}
            }
            return match;
        });
    }

    // Wrap individual words that are not inside any existing <span> or other tags
    message = message.replace(/(?!<\/?span[^>]*>)(\b\w+\b)(?![^<>]*>)/g, (match) => {
        return `<span class="items-center content-center mb-1">${match}</span>`;
    });

    return message;
}
function createDndParams(params, message) {
    const div = document.createElement('div');
    div.className = 'flex flex-wrap gap-x-1'; // Add classes to the div
    div.innerHTML = renderConditionMessage(params, message); // Use innerHTML to render HTML

    return div.outerHTML;
}

export async function renderContent(items, level) {

    const results = await Promise.all(items.map(async (item) => {

        const addMoreTemplate = (text) => `
        <div class="addMoreClasses">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            <p>${text}</p>
        </div>
    `;

        const addMoreCondition = addMoreTemplate('Add condition');
        const addMoreAction = addMoreTemplate('Add action');

        const leftPanels = item.conditions.map(condition => `
            <div class="commonFlexClasses"
                 dnd-id="${condition.id}"
                 dnd-type="${condition.type}"
                 dnd-title="${condition.title}"
                 dnd-message="${condition.message}"
                 dnd-template="${condition.template}"
                 dnd-param="${LZString.compressToEncodedURIComponent(JSON.stringify(condition.params))}">
                 <div class="flex">
                    <div class="commonTextClasses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="iconClasses">
                            <path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="commonTitleClasses">${condition.title}</div>
                    ${createDndParams(condition.params, condition.message)}
                    </div>
                    <div class="panelBgClasses openProperty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                            <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                    </div>
                 </div>
        `).join('');

        const rightPanels = item.actions.map(action => `
            <div class="commonFlexClasses"
                 dnd-id="${action.id}"
                 dnd-type="${action.type}"
                 dnd-title="${action.title}"
                 dnd-message="${action.message}"
                 dnd-template="${action.template}">
                 <div class="flex">
                    <div class="commonTextClasses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="iconClasses">
                            <path fill-rule="evenodd"
                        d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z"clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="commonTitleClasses">${action.title}</div>
                    ${createDndParams(action.params, action.message)}
                    </div>
                    <div class="panelBgClasses openProperty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                            <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                    </div>
                 </div>
        `).join('');

        let childrenContent = '';

        if (item.children && item.children.length > 0) {
            level = level + 1;
            childrenContent = await renderContent(item.children, level);
        }

        return `
        <div class="panelWrapperClasses"
             dnd-id="${item.id}"
             dnd-type="${item.type}"
             dnd-subtype="${item.subtype}"
             dnd-title="${item.title}"
             dnd-show-children="${item.showChildren}"
             dnd-message="${item.message}"
             dnd-level="${level}">
            <div class="leftPanelClasses">
                ${leftPanels}
                ${addMoreCondition}
            </div>
            <div class="rightPanelClasses">
                ${rightPanels}
                ${addMoreAction}
            </div>
            <div class="childrenPanelClasses" dnd-parent-id="${item.id}">
                ${childrenContent}
            </div>
        </div>
    `;
    }));

    return results.join('');
}
