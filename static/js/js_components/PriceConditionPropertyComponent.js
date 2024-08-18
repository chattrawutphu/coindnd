export default function renderContent() {
  const html = `
      <div class="mx-2 my-3">
          <form>
              <div data-class="inputFormWrapperClasses">
                  <div data-class="inputGridClasses" data-js-component="InputConditionTypeComponent"></div>
                  <div data-class="inputGridClasses" data-js-component="InputSymbolComponent"></div>
                  <div data-class="inputGridClasses" data-js-component="InputOperatorComponent"></div>
              </div>
          </form>
      </div>
  `;

  return $(html);
}