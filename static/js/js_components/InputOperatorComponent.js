export default function renderContent() {
    const html = `
        <div class="inputContainerWrapperClasses">
            <label for="countries" class="inputLabelClasses">Operator</label>
        </div>
        <div class="inputContainerContentClasses">
            <select id="countries" class="inputContainerClasses">
                <option selected>Choose an operator</option>
                <option value="gt">Greater than</option>
                <option value="gte">Greater than or equal to</option>
                <option value="eq">Equal to</option>
                <option value="neq">Not equal to</option>
                <option value="lt">Less than</option>
                <option value="lte">Less than or equal to</option>
            </select>
        </div>
    `;

    return $(html);
// }
//                 <option value="in">In list</option>
//                 <option value="nin">Not in list</option>