export default function renderContent() {
    const html = `
        <div data-class="inputContainerWrapperClasses">
            <label for="first_name" data-class="inputLabelClasses">Price</label>
        </div>
        <div data-class="inputContainerContentClasses">
            <div class="grid grid-cols-5 gap-y-2">
                <div class="col-span-5">
                    <select id="countries" data-class="inputContainerClasses" >
                        <option value="highest" selected>Highest price</option>
                        <option value="highest">Highest open price</option>
                        <option value="highest">Highest close price</option>
                        <option value="lowest">Lowest price</option>
                        <option value="lowest">Lowest open price</option>
                        <option value="lowest">Lowest close price</option>
                    </select>        
                </div>
                <label data-class="inputSmallTextXSClasses">of the</label>
                <div class="col-span-5 flex flex-col relative">
                    <select id="timeframes" data-class="inputContainerClasses">
                        <option value="1m">1 minute time frame</option>
                        <option value="5m">5 minute time frame</option>
                        <option value="15m">15 minute time frame</option>
                        <option value="30m">30 minute time frame</option>
                        <option value="1h">1 hour time frame</option>
                        <option value="4h" selected>4 hour time frame</option>
                        <option value="1d">1 day time frame</option>
                        <option value="1w">1 week time frame</option>
                        <option value="1mo">1 month time frame</option>
                    </select>        
                </div>
                <label data-class="inputSmallTextXSClasses">within the last</label>
                <div class="col-span-3 flex flex-col relative ">
                    <input type="text" id="first_name" data-class="inputContainerClasses" value=20 />
                </div>
                <div class="col-span-2 self-end">
                    <select id="countries" data-class="inputContainerClasses" >
                        <option selected>candlesticks</option>
                    </select>        
                </div>
            </div>
        </div>
    `;

    return $(html);
}


