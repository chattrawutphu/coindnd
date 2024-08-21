export default function renderContent() {
    const html = `
        <div class="inputContainerWrapperClasses">
            <label for="countries" class="inputLabelClasses">Symbol</label>
        </div>
        <div class="inputContainerContentClasses">
            <select id="countries" class="inputContainerClasses">
                <option selected>Choose a symbol</option>
                <option value="BTCUSDT">BTC/USDT</option>
                <option value="ETHUSDT">ETH/USDT</option>
                <option value="SKOPUSDT">SKOP/USDT</option>
            </select>
        </div>
    `;

    return $(html);
}