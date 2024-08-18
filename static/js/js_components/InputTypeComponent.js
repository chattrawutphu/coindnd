export default function renderContent() {
    const html = `
        <div data-class="inputContainerWrapperClasses">
            <label for="countries" data-class="inputLabelClasses">Symbol</label>
        </div>
        <div data-class="inputContainerContentClasses">
            <select id="countries" data-class="inputContainerClasses">
                <option selected>if</option>
                <option value="and">and</option>
                <option value="or">or</option>
            </select>
        </div>
    `;

    return $(html);
}