export default function renderContent() {
    const html = `
        <div data-class="inputContainerWrapperClasses">
            <label for="actions" data-class="inputLabelClasses">More Addition</label>
        </div>
        <div data-class="inputContainerContentClasses">
            <div class="grid grid-cols-5 gap-y-2">
                <div class="col-span-5">
                    <select id="actions" data-class="inputContainerClasses">
                        <option value="" selected>-- Select an action --</option>
                        <option value="inc-int">Increase price by integer</option>
                        <option value="inc-last">Increase price by last digit</option>
                        <option value="inc-percent">Increase price by percent</option>
                        <option value="dec-int">Decrease price by integer</option>
                        <option value="dec-last">Decrease price by last digit</option>
                        <option value="dec-percent">Decrease price by percent</option>
                    </select>
                </div>
                <div class="col-span-5">
                    <input type="text" id="value_input" data-class="inputContainerClasses" value="0.001" />
                </div>
            </div>
        </div>
    `;

    return $(html);
}