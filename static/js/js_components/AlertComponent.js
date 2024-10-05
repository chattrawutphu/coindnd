export function renderAlertComponent(text, template) {
    const id = 'alert-' + Date.now();
    let templateHTML = '';
    let icon = '';
  
    switch (template) {
      case "normal":
        icon = `
          <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
        `;
        templateHTML = `
          <div id="${id}" class="alert-item opacity-0 transition-all duration-200 ease-out transform translate-y-[-10px]">
            <div class="inline-flex dark:bg-primary-800/70 border-2 backdrop-blur-sm dark:border-primary-500/30 items-center leading-none dark:text-primary-250 rounded-full p-2 shadow text-teal text-sm">
              ${icon}
              <span class="inline-flex px-2">${text}</span>
              <button type="button" class="ms-auto -mx-1.5 -my-1.5 text-blue-500 rounded-lg inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#${id}" aria-label="Close">
                <span class="sr-only">Dismiss</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        break;
      case "fail":
        icon = `
          <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
        `;
        templateHTML = `
          <div id="${id}" class="alert-item opacity-0 transition-all duration-200 ease-out transform translate-y-[-10px]">
            <div class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
              ${icon}
              <div class="ms-3 text-sm font-medium">
                ${text}
              </div>
              <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#${id}" aria-label="Close">
                <span class="sr-only">Dismiss</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        break;
      case "redo":
        icon = `
          <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        `;
        templateHTML = `
          <div id="${id}" class="alert-item opacity-0 transition-all duration-200 ease-out transform translate-y-[-10px]">
            <div class="inline-flex dark:bg-primary-800/70 border-2 backdrop-blur-sm dark:border-primary-500/30 items-center leading-none dark:text-primary-250 rounded-full p-2 shadow text-teal text-sm">
              ${icon}
              <span class="inline-flex px-2">${text}</span>
              <button type="button" class="ms-auto -mx-1.5 -my-1.5 text-blue-500 rounded-lg inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#${id}" aria-label="Close">
                <span class="sr-only">Dismiss</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        break;
      case "undo":
        icon = `
          <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        `;
        templateHTML = `
          <div id="${id}" class="alert-item opacity-0 transition-all duration-200 ease-out transform translate-y-[-10px]">
            <div class="inline-flex dark:bg-primary-800/70 border-2 backdrop-blur-sm dark:border-primary-500/30 items-center leading-none dark:text-primary-250 rounded-full p-2 shadow text-teal text-sm">
              ${icon}
              <span class="inline-flex px-2">${text}</span>
              <button type="button" class="ms-auto -mx-1.5 -my-1.5 text-blue-500 rounded-lg inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#${id}" aria-label="Close">
                <span class="sr-only">Dismiss</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        break;
      case "copy":
        icon = `
          <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
        `;
        templateHTML = `
          <div id="${id}" class="alert-item opacity-0 transition-all duration-200 ease-out transform translate-y-[-10px]">
            <div class="inline-flex dark:bg-primary-800/70 border-2 backdrop-blur-sm dark:border-primary-500/30 items-center leading-none dark:text-primary-250 rounded-full p-2 shadow text-teal text-sm">
              ${icon}
              <span class="inline-flex px-2">${text}</span>
              <button type="button" class="ms-auto -mx-1.5 -my-1.5 text-blue-500 rounded-lg inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#${id}" aria-label="Close">
                <span class="sr-only">Dismiss</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        break;
      default:
        console.error('Invalid template type');
        return null;
    }
  
    return { html: templateHTML, id: id };
  }