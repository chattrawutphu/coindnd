export default function renderContent() {
    const html = `
        <div class="inputContainerWrapperClasses">
            <label for="countries" class="inputLabelClasses">Type</label>
        </div>
        <div class="inputContainerContentClasses">
            <select id="countries" class="inputContainerClasses">
                <option value="if" selected>if</option>
                <option value="and">and</option>
                <option value="or">or</option>
            </select>
        </div>
    `;

    return $(html);
}