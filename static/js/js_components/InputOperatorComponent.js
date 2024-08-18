export default function renderContent() {
    const html = `
        <div data-class="inputContainerWrapperClasses">
            <label for="countries" data-class="inputLabelClasses">Operator</label>
        </div>
        <div data-class="inputContainerContentClasses">
            <select id="countries" data-class="inputContainerClasses">
                <option selected>Choose an operator</option>
                <option value="gt">Greater than</option>
                <option value="gte">Greater than or equal to</option>
                <option value="eq">Equal to</option>
                <option value="neq">Not equal to</option>
                <option value="lt">Less than</option>
                <option value="lte">Less than or equal to</option>
                <option value="in">In list</option>
                <option value="nin">Not in list</option>
                <option value="contains">Contains</option>
                <option value="ncontains">Does not contain</option>
                <option value="startswith">Starts with</option>
                <option value="endswith">Ends with</option>
            </select>
        </div>
    `;

    return $(html);
}