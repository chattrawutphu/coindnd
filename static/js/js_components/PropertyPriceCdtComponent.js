export default function renderContent() {
  const html = `
      <div class="mx-2 my-3">
          <form>
              <div class="inputFormWrapperClasses">
                  <div class="inputGridClasses" data-js-component="InputConditionTypeComponent"></div>
                  <div class="inputGridClasses" data-js-component="InputSymbolComponent"></div>
                  <div class="inputGridClasses" data-js-component="InputOperatorComponent"></div>
                  <div class="inputGridClasses" data-js-component="InputAdtCmdComponent"></div>
              </div>
          </form>
      </div>
  `;

  return $(html);
}