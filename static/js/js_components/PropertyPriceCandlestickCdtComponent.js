export default function renderContent() {
  const html = `
      <div class="mx-5 my-4">
          <form>
              <div data-class="inputFormWrapperClasses">
                  <div data-class="inputGridClasses" data-js-component="InputConditionTypeComponent"></div>
                  <div data-class="inputGridClasses" data-js-component="InputSymbolComponent"></div>
                  <div data-class="inputGridClasses" data-js-component="InputOperatorComponent"></div>
                  <div data-class="inputGridClasses" data-js-component="InputPriceCandlestickComponent"></div>
                  <div data-class="inputGridClasses" data-js-component="InputAdtCmdComponent"></div>
                  <div data-class="inputGridClasses pt-4 mt-4 border-t border-t-zinc-600" data-js-component="inputBasicOptionComponent"></div>
              </div>
          </form>
      </div>
  `;

  return $(html);
}