export default function renderContent() {
    const html = `
        <div class="inputContainerWrapperClasses">
            <label for="first_name" class="inputLabelClasses">Price</label>
        </div>
        <div class="inputContainerContentClasses">
            <div class="grid grid-cols-5 gap-y-2">
                <div class="col-span-5">
                    <select id="countries" class="inputContainerClasses" >
                        <option value="high" selected>Highest price</option>
                        <option value="open">Highest open price</option>
                        <option value="close">Highest close price</option>
                        <option value="low">Lowest price</option>
                        <option value="lopen">Lowest open price</option>
                        <option value="lclose">Lowest close price</option>
                    </select>        
                </div>
                <label class="inputSmallTextXSClasses">of the</label>
                <div class="col-span-5 flex flex-col relative">
                    <select id="timeframes" class="inputContainerClasses">
                        <option value="1m">1 minute timeframe</option>
                        <option value="5m">5 minute timeframe</option>
                        <option value="15m">15 minute timeframe</option>
                        <option value="30m">30 minute timeframe</option>
                        <option value="1h">1 hour timeframe</option>
                        <option value="4h" selected>4 hour timeframe</option>
                        <option value="1d">1 day timeframe</option>
                        <option value="1w">1 week timeframe</option>
                        <option value="1mo">1 month timeframe</option>
                    </select>        
                </div>
                <label class="inputSmallTextXSClasses">within the last</label>
                <div class="col-span-3 flex flex-col relative ">
                    <input type="text" id="first_name" class="inputContainerClasses" value=20 />
                </div>
                <div class="col-span-2 self-end">
                    <select id="countries" class="inputContainerClasses" >
                        <option selected>candlesticks</option>
                    </select>        
                </div>
            </div>
        </div>
    `;

    return $(html);
}


