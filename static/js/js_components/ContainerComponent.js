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

export function renderContent(item) {
    const addMoreCondition = `
        <div data-class="addMoreConditionClasses">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
</svg>
            <p>Add condition</p>
        </div>
    `;

    const addMoreAcion =`
        <div data-class="addMoreActionClasses">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
</svg>
            <p>Add action</p>
        </div>
    `;



    const leftPanels = item.conditions.map(condition => `
        <div data-class="commonFlexClasses"
             dnd-id="${condition.id}"
             dnd-type="${condition.type}"
             dnd-title="${condition.title}"
             dnd-message="${condition.message}"></div>
    `).join('');

    const rightPanels = item.actions.map(action => `
        <div data-class="commonFlexClasses"
             dnd-id="${action.id}"
             dnd-type="${action.type}"
             dnd-title="${action.title}"
             dnd-message="${action.message}"></div>
    `).join('');

    const content = `
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
                ${addMoreAcion}
            </div>
        </div>
    `;

    return content;
}