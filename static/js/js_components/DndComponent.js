function getDarkColor(color) {
    switch (color) {
        case "red": return "darkred";
        case "yellow": return "goldenrod"; 
        case "white": return "black";
        case "green": return "darkgreen";
        case "blue": return "navy";
        case "aqua": return "darkcyan";
        case "lawngreen": return "green";
        case "pink": return "deeppink";
        case "orange": return "darkorange";
        // Add more color mappings as needed
        default: return color;
    }
}

const renderConditionMessage = (params, message) => message.replace(/{params\[(\d+)\]}/g, (_, index) => {
    const param = params[index];
    if (!param?.text && !param?.value) return '';
    const text = param.text || param.value;
    return param.color
        ? `<span class="dark:bg-zinc-700 bg-zinc-50 text-sm font-medium border-zinc-400 border rounded-md px-1 pb-0.5 mb-1 text-[${getDarkColor(param.color)}] dark:text-[${param.color}]">${text}${param.unit || ''}</span>`
        : `<span>${text}${param.unit || ''}</span>`;
});

const createDndParams = (params, message) => `<div class="flex flex-wrap text-sm gap-x-1">${renderConditionMessage(params, message)}</div>`;

const svgIcon = (path, className = 'size-4') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="${className}"><path d="${path}" /></svg>`;

const addMoreTemplate = (type, text) => `<div dnd-type="${type}" data-class="addMoreClasses">
<div class="flex items-center gap-x-1">
    ${svgIcon("M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z")}
    <p>${text}</p>
</div>
</div>`;

const renderPanel = (items, type) => items.map((item, index, array) => `
    <div data-class="commonFlexClasses" class=" ${item.active ? '' : 'line-through'} decoration-rose-500 decoration-2 border-b
    ${item.type === 'condition' ? 'bg-zinc-100 dark:bg-[#52525b] border-b-zinc-300 dark:border-b-[#71717a]' : 'bg-zinc-100 dark:bg-[#44444b] border-b-zinc-300 dark:border-b-[#62626b]'}
    
    "
         dnd-id="${item.id}" dnd-type="${item.type}" dnd-title="${item.title}"
         dnd-message="${item.message}" dnd-template="${item.template}"
         ${type === 'condition' ? `dnd-param="${LZString.compressToEncodedURIComponent(JSON.stringify(item.params))}"` : ''}>
        <div class="flex">
            <div data-class="commonTextClasses">
                ${svgIcon(type === 'condition'
    ? "M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
    : "M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z",
    "iconClasses")}
            </div>
            <div data-class="commonTitleClasses">${item.title}</div>
            ${createDndParams(item.params, item.message)}
        </div>
        <div data-class="panelBgClasses" class="">
        <div class="cursor-pointer size-[18px] openProperty">${svgIcon("M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z", "size-4")}</div>
            
        </div>
    </div>
`).join('');

const renderVariables = variables => variables.map(v => `
    <div class="flex gap-x-1 justify-between">
        <div class="flex gap-x-1 items-center content-center">
            ${svgIcon("M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z", "size-3 text-green-500")}
            <div class="text-[13px]/[18px] text-green-500">${v.type}</div>
            <div class="text-[15px]/[18px] text-green-500 font-bold">${v.name}</div>
            <div class="text-[13px]/[18px] text-green-500"> = ${['integer', 'boolean'].includes(v.type) ? v.value : `"${v.value}"`}</div>
        </div>
        ${v.description ? `<div class="text-sm/[18px] text-zinc-400"> # ${v.description}</div>` : ''}
    </div>
`).join('');

export const renderContent = async (items, level = 1, parentId = '', isHidden = true) => {
    const results = await Promise.all(items.map(async item => {
        const spacingIndent = 48;
        const indent = `${level * spacingIndent}px`;

        if (item.subtype === "variable") {
            return `
            <div data-class="panelWrapperClasses" class="single-panel ml-section min-w-[32rem] ${item.active ? '' : 'line-through'} ml-[${indent}] decoration-rose-500 decoration-2 col-[span_30/span_30]"
            dnd-parent-id="${parentId}" dnd-id="${item.id}" dnd-type="${item.type}" dnd-subtype="${item.subtype}">
                    <div data-class="panelContainerClasses" class="relative  pb-[1.5px]  pt-[0.75px]">    
                        <div class="flex gap-x-1 justify-between">
                            <div class="flex gap-x-1 items-center content-center text-nowrap">
                                ${svgIcon("M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z", "size-3 text-green-700 dark:text-green-500")}
                                <div class="text-[13px]/[18px] text-green-600 dark:text-green-500 ">${item.variableType}</div>
                                <div class="text-[15px]/[18px] text-green-600 dark:text-green-500 font-bold">${item.name}</div>
                                <div class="text-[13px]/[18px] text-green-600 dark:text-green-500"> = ${['integer', 'boolean'].includes(item.type) ? item.value : `"${item.value}"`}</div>
                            </div>
                            ${item.message ? `<div class="text-sm/[18px] text-zinc-900 dark:text-zinc-400 truncate"> # ${item.message}</div>` : ''}
                        </div>
                    </div>
            </div>`
        }

        if (item.subtype === "message") {
            return `
            <div data-class="panelWrapperClasses" class="single-panel ml-section min-w-[32rem]  ${item.active ? '' : 'line-through'} text-sm text-zinc-900 dark:text-zinc-400 ml-[${indent}] decoration-rose-500 decoration-2 col-[span_30/span_30]"
            dnd-parent-id="${parentId}" dnd-id="${item.id}" dnd-type="${item.type}" dnd-subtype="${item.subtype}">
                    <div data-class="panelContainerClasses"  class="relative  pb-[1.5px] pt-[0.75px]">
                    # ${item.message}
                    </div>
            </div>`
        }

        const { id, active, type, subtype, title, message, showChildren, highlight, variables, conditions, actions, children, backgroundColor, textColor } = item;
        const childrenContent = children?.length ? await renderContent(children, level + 1, id, showChildren) : '';
        const hasVariables = variables?.length;



        const iconSVG = (isExpanded) => `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="collapse-icon ${isExpanded == true ? '' : 'hidden'} size-4">
            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="expand-icon ${isExpanded == true ? 'hidden' : ''} size-4">
            <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
    `;
        //<div data-class="panelWrapperClasses" class="${isHidden ? 'max-h-[9999px]' : 'max-h-0'}  transition-[max-height] duration-500 ease-in-out" dnd-parent-id="${parentId}" dnd-id="${id}" dnd-type="${type}"
        /*${hasVariables ? `<div data-class="variablePanelClasses" class="mb-1 mt-1.5 col-[span_30/span_30] ml-[${indent}]">${renderVariables(variables)}</div>` : ''}
        ${message ? `<div data-class="messagePanelClasses" class="mb-1.5 col-[span_30/span_30] text-sm text-zinc-400 ml-[${indent}]"># ${message}</div>` : ''}        */

        return `
            <div data-class="panelWrapperClasses" class="${active ? '' : 'line-through'} decoration-rose-500 decoration-2  ${isHidden ? '' : 'hidden'}  relative text-sm col-[span_30/span_30] grid grid-cols-[repeat(30,_minmax(0,_1fr))] dark:text-zinc-100 text-zinc-900" dnd-parent-id="${parentId}" dnd-id="${id}" dnd-type="${type}"
                dnd-subtype="${subtype}" dnd-title="${title}" dnd-show-children="${showChildren}"
                dnd-message="${message}" dnd-level="${level}">
               
               
                ${subtype === "group" ? `
                    
                    <div data-class="groupSectionClasses" class="ml-section min-w-[32rem] my-0.5 relative rounded-[3px] bg-[${backgroundColor}] text-[${textColor}] col-[span_30/span_30] ml-[${indent}] font-semibold">
                        <div data-class="panelContainerClasses" class="w-full h-full pt-1 pb-2 px-3">
                        <div class="flex gap-x-1 justify-between">
                            <div class="text-[15px]/[18px]">${title}</div>
                            <div class="text-sm/[18px]"># ${message}</div>
                        </div>
                        </div>
                        ${children?.length > 0 ? `
                            <div data-class="expandButtonClasses">${iconSVG(showChildren)}</div>` : ''}
                    </div>
                ` : ''}
                
                    <div 
                        data-class="lineAreaClasses" 
                        class="ml-[${indent}] ml-section absolute h-full ${subtype === 'group' ? 'opacity-60 w-[2px]' : 'opacity-60 w-[1px] dark:bg-zinc-600 bg-zinc-400'}" 
                        style="background-color: ${subtype === 'group' ? backgroundColor : ''};">
                        <div class="bg-color-panel  ${subtype === 'group' ? `for-group ml-[2px] w-[${spacingIndent-2}px]` : `for-nonegroup ml-[1px] w-[${spacingIndent-1}px]`}  h-full  opacity-10" style="background-color: ${subtype === 'group' ? backgroundColor : ''}"></div>
                    </div>
                <div data-class="panelWrapperMargin" class="ml-section col-[span_30/span_30] flex ml-[${indent}]">

                    <div data-class="numberPanelClasses" class="absolute opacity-80 left-0.5 top-0 rounded p-0.5 pr-1 text-center text-sm ${highlight ? `rounded-md bg-[${highlight}] isHighlight` : 'opacity-30'}"  style="z-index:1;">xx</div>

                    ${subtype !== "group" ? `
                        <div data-class="panelContainerClasses" class="grid min-w-[32rem] border border-zinc-400 dark:border-none relative min-h-10 w-full grid-cols-[repeat(30,_minmax(0,_1fr))]">
                            
                            <div data-class="expandButtonClasses" class="${children?.length > 0 ? '':'hidden'}">${iconSVG(showChildren)}</div>
                            <div data-class="leftPanelClasses">
                                ${renderPanel(conditions, 'condition')}
                                ${addMoreTemplate('condition', 'Add condition')}
                            </div>
                            <div data-class="rightPanelClasses">
                                ${renderPanel(actions, 'action')}
                                ${addMoreTemplate('action', 'Add action')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                ${childrenContent}
            </div>
        `;
    }));

    return results.join('');
};