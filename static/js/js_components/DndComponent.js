/*<div data-class="panelWrapperClasses"
    dnd-id="{{item.id}}"
    dnd-type="{{item.type}}"
    dnd-subtype="{{item.subtype}}"
    dnd-title="{{item.title}}"
    dnd-show-children="{{item.showChildren}}"
    dnd-message="{{item.message}}">
    
    <div data-class="leftPanelClasses">
        {% for condition in item.conditions %}
            <div class="commonFlexClasses"
                dnd-id="{{condition.id}}"
                dnd-type="{{condition.type}}"
                dnd-title="{{condition.title}}"
                dnd-message="{{condition.message}}">
            </div>
        {% endfor %}
    </div>
    
    <div data-class="rightPanelClasses">
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
    if (message.includes('{params[')) {
        message = message.replace(/{params\[(\d+)\]}/g, (match, index) => {
            const paramIndex = parseInt(index, 10);
            const param = params[paramIndex];

            if (param) {
                const color = param.color;
                const text = param.text ? param.text : param.value;
                const unit = param.unit;

                if (text) {
                    if (color) {
                        return `<span class="dark:bg-[#414b5a] text-sm font-medium border-gray-400 border rounded-md px-1 pb-0.5 mb-1" style="color: ${color};">${text}${unit}</span>`;
                    } else {
                        return `<span>${text}${unit}</span>`;
                    }
                } else { return ""}
            }
            return match;
        });
    }
    
    return message;
}
function createDndParams(params, message) {
    const div = document.createElement('div');
    div.className = 'flex flex-wrap text-sm gap-x-1'; // Add classes to the div
    div.innerHTML = renderConditionMessage(params, message); // Use innerHTML to render HTML

    return div.outerHTML;
}

export async function renderContent(items, level, parentid="") {

    const results = await Promise.all(items.map(async (item) => {

        const addMoreTemplate = (text) => `
        <div data-class="addMoreClasses">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            <p>${text}</p>
        </div>
    `;

        const addMoreCondition = addMoreTemplate('Add condition');
        const addMoreAction = addMoreTemplate('Add action');

        const leftPanels = item.conditions.map(condition => `
            <div data-class="commonFlexClasses"
                 dnd-id="${condition.id}"
                 dnd-type="${condition.type}"
                 dnd-title="${condition.title}"
                 dnd-message="${condition.message}"
                 dnd-template="${condition.template}"
                 dnd-param="${LZString.compressToEncodedURIComponent(JSON.stringify(condition.params))}">
                 <div class="flex">
                    <div data-class="commonTextClasses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-class="iconClasses">
                            <path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div data-class="commonTitleClasses">${condition.title}</div>
                    ${createDndParams(condition.params, condition.message)}
                    </div>
                    <div data-class="panelBgClasses openProperty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                            <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                    </div>
                 </div>
        `).join('');

        const rightPanels = item.actions.map(action => `
            <div data-class="commonFlexClasses"
                 dnd-id="${action.id}"
                 dnd-type="${action.type}"
                 dnd-title="${action.title}"
                 dnd-message="${action.message}"
                 dnd-template="${action.template}">
                 <div class="flex">
                    <div data-class="commonTextClasses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-class="iconClasses">
                            <path fill-rule="evenodd"
                        d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z"clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div data-class="commonTitleClasses">${action.title}</div>
                    ${createDndParams(action.params, action.message)}
                    </div>
                    <div data-class="panelBgClasses openProperty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                            <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                    </div>
                 </div>
        `).join('');

        const variablesContent = item.variables.map(variable => `
            <div class="flex gap-x-1 mx-2 justify-between">
                <div class="flex gap-x-1">
                    <div class="text-[13px]/[18px] text-green-500">${variable.type}</div>
                    <div class="text-[15px]/[18px] text-green-500 font-bold">${variable.name}</div>
                    <div class="text-[13px]/[18px] text-green-500"> = ${['integer', 'boolean'].includes(variable.type) ? variable.value : `"${variable.value}"`}</div>
                </div>
                ${variable.description ? `<div class="text-sm/[18px] text-green-500"> # ${variable.description}</div>` : ''}
            </div>
        `).join('');

        const hasVariables = item.variables && item.variables.length > 0;

        let childrenContent = '';

        if (item.children && item.children.length > 0) {
            level = level + 1;
            childrenContent = await renderContent(item.children, level, item.id);
        }

        return `
        <div data-class="panelWrapperClasses"
            dnd-parent-id="${parentid}"
            dnd-id="${item.id}"
            dnd-type="${item.type}"
            dnd-subtype="${item.subtype}"
            dnd-title="${item.title}"
            dnd-show-children="${item.showChildren}"
            dnd-message="${item.message}"
            dnd-level="${level}">
            ${hasVariables ? `<div class="mb-1 col-[span_30/span_30] ml-[${(level) * 24}px]">${variablesContent}</div>` : ''}
            <div data-class="numberPanelClasses">
                xx
            </div>
            <div class="col-[span_29/span_29] ml-[${(level-1) * 24}px]">
                <div class="grid grid-cols-[repeat(30,_minmax(0,_1fr))]">
                
                    <div data-class="leftPanelClasses">
                        ${leftPanels}
                        ${addMoreCondition}
                    </div>
                    <div data-class="rightPanelClasses">
                        ${rightPanels}
                        ${addMoreAction}
                    </div>
                </div>          
            </div>
        </div>
        ${childrenContent}
    `;
    }));
            /*<div data-class="childrenPanelClasses" dnd-parent-id="${item.id}">
                ${childrenContent}
            </div>*/

    return results.join('');
}
