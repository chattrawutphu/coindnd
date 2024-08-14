/*<div data-class="panelWrapperClasses"
    dnd-id="{{item.id}}"
    dnd-type="{{item.type}}"
    dnd-subtype="{{item.subtype}}"
    dnd-title="{{item.title}}"
    dnd-show-children="{{item.showChildren}}"
    dnd-message="{{item.message}}">
    
    <div data-class="leftPanelClasses">
        {% for condition in item.conditions %}
            <div data-class="commonFlexClasses"
                dnd-id="{{condition.id}}"
                dnd-type="{{condition.type}}"
                dnd-title="{{condition.title}}"
                dnd-message="{{condition.message}}">
            </div>
        {% endfor %}
    </div>
    
    <div data-class="rightPanelClasses">
        {% for action in item.actions %}
            <div data-class="commonFlexClasses"
                dnd-id="{{action.id}}"
                dnd-type="{{action.type}}"
                dnd-title="{{action.title}}"
                dnd-message="{{action.message}}">
            </div>
        {% endfor %}
    </div>
</div>*/
import { loadComponentScripts } from '/static/js/dnd-editor.js';

function renderConditionMessage(params, message) {
    if (message.includes('{params[')) {
        message = message.replace(/{params\[(\d+)\]}/g, (match, index) => {
            const paramIndex = parseInt(index, 10);
            return params[paramIndex] ? params[paramIndex].value : match;
        });
    }
    return message;
}

function createDndParams(params, message) {
    const div = document.createElement('div');
    params.forEach((param, index) => {
        div.setAttribute(`dnd-param${index}-name`, param.value);
        div.setAttribute(`dnd-param${index}-type`, param.type);
        div.setAttribute(`dnd-param${index}-unit`, param.unit);
        if (param.price !== undefined) {
            div.setAttribute(`dnd-param${index * 3}-price`, param.price);
        }
    });
    div.textContent = renderConditionMessage(params, message);
    return div.outerHTML;
}

export async function renderContent(items) {
    const results = await Promise.all(items.map(async (item) => {

        const addMoreTemplate = (text) => `
        <div data-class="addMoreClasses">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
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
                 dnd-message="${condition.message}">
                 <div class="flex items-center">
                    <div data-class="commonTextClasses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-class="iconClasses">
                            <path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div data-class="commonTitleClasses">${condition.title}</div>
                    ${createDndParams(condition.params, condition.message)}
                    </div>
                    <div data-class="panelBgClasses">
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
                 dnd-message="${action.message}">
                 <div class="flex items-center">
                    <div data-class="commonTextClasses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-class="iconClasses">
                            <path fill-rule="evenodd"
                        d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z"clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div data-class="commonTitleClasses">${action.title}</div>
                    ${createDndParams(action.params, action.message)}
                    </div>
                    <div data-class="panelBgClasses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                            <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                    </div>
                 </div>
        `).join('');

        const childrenContent = item.children && item.children.length > 0
        ? await renderContent(item.children)
        : '';

        console.log(childrenContent)

    return `
        <div data-class="panelWrapperClasses"
             dnd-id="${item.id}"
             dnd-type="${item.type}"
             dnd-subtype="${item.subtype}"
             dnd-title="${item.title}"
             dnd-show-children="${item.showChildren}"
             dnd-message="${item.message}">
            <div data-class="leftPanelClasses">
                ${leftPanels}
                ${addMoreCondition}
            </div>
            <div data-class="rightPanelClasses">
                ${rightPanels}
                ${addMoreAction}
            </div>
            <div data-class="childrenPanelClasses" dnd-parent-id="${item.id}">
                ${childrenContent}
            </div>
        </div>
    `;
}));

return results.join('');
}
