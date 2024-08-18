export default function renderContent() {
    const html = `
        <div data-class="inputContainerWrapperClasses">
            <label for="countries" data-class="inputLabelClasses">Symbol</label>
        </div>
        <div data-class="inputContainerContentClasses">
            <select id="countries" data-class="inputContainerClasses">
                <option selected>Choose a symbol</option>
                <option value="BTCUSDT">BTC/USDT</option>
                <option value="ETHUSDT">ETH/USDT</option>
                <option value="SKOPUSDT">SKOP/USDT</option>
            </select>
        </div>
    `;

    return $(html);
}