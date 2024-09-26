export default function renderContent() {
  const tradingConditions = {
    price: [
      { icon: 'plus', text: 'Price is above', isNew: 'new' },
      { icon: 'plus', text: 'Price is below', isNew: 'new' },
      { icon: 'plus', text: 'Price is between', isNew: 'new' },
      { icon: 'plus', text: 'Price crosses above' },
      { icon: 'plus', text: 'Price crosses below' }
    ],
    volume: [
      { icon: 'plus', text: 'Volume is above' },
      { icon: 'plus', text: 'Volume is below' },
      { icon: 'plus', text: 'Volume spike' }
    ],
    indicators: [
      { icon: 'plus', text: 'MA crossover' },
      { icon: 'plus', text: 'RSI overbought' },
      { icon: 'plus', text: 'RSI oversold' },
      { icon: 'plus', text: 'MACD signal' }
    ],
    timeAndPatterns: [
      { icon: 'plus', text: 'Time-based trigger' },
      { icon: 'plus', text: 'Triangle pattern' },
      { icon: 'plus', text: 'Flag pattern' },
      { icon: 'plus', text: 'Head and shoulders' }
    ],
    positionOrder: [
      { icon: 'plus', text: 'Market order' },
      { icon: 'plus', text: 'Limit order' },
      { icon: 'plus', text: 'Stop order' },
      { icon: 'plus', text: 'Trailing stop' }
    ],
    balance: [
      { icon: 'plus', text: 'Account balance above' },
      { icon: 'plus', text: 'Account balance below' },
      { icon: 'plus', text: 'Use percentage of balance' }
    ]
  };

  const html = `
    <button data-modal-target="static-modal" data-modal-toggle="static-modal"
      class="block text-white opacity-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      type="button">
      Crypto Trading Events
    </button>

    <div id="modal-backdrop" class="fixed z-[49] inset-0 bg-primary-900 bg-opacity-60 backdrop-blur-xl hidden"></div>

    <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-[56rem] max-h-full">
        <div class="relative bg-primary-150 rounded-2xl shadow dark:bg-primary-675/40 dark:border dark:border-primary-400/50 flex flex-col">
          <div class="sticky top-0 z-10 rounded-t-lg">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-primary-300 dark:border-primary-600">
              <h3 class="text-xl font-semibold text-primary-800 dark:text-white my-auto">
                Add Crypto Trading Event
              </h3>
              <div class="flex items-center gap-x-2 ml-auto">
                <form class="sm:w-[28rem] max-w-[28rem]" id="search-form">
                  <div class="flex w-full">
                    <label for="search-dropdown" class="mb-2 text-sm font-medium text-primary-900 sr-only dark:text-white">Search Trading Events</label>
                    <button id="dropdown-button" data-dropdown-toggle="dropdown"
                      class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-primary-900 bg-primary-100 border border-primary-300 rounded-s-lg hover:bg-primary-200 dark:bg-primary-575/40 dark:hover:bg-primary-525/40 dark:text-white dark:border-transparent"
                      type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="m1 1 4 4 4-4"></path>
                      </svg></button>
                    <div id="dropdown"
                      class="z-10 hidden bg-white divide-y divide-primary-100 rounded-lg shadow w-44 dark:bg-primary-700/60">
                      <ul class="py-2 text-sm text-primary-700 dark:text-primary-200"
                        aria-labelledby="dropdown-button">
                        ${Object.keys(tradingConditions).map(category => `
                          <li>
                            <button type="button"
                              class="inline-flex w-full px-4 py-2 hover:bg-primary-100 dark:hover:bg-primary-600 dark:hover:text-white">${category}</button>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                    <div class="relative w-full">
                      <input type="search" id="search-dropdown"
                        class="block p-2.5 w-full z-20 text-sm text-primary-900 bg-primary-25 rounded-e-lg border-s-primary-50 border-s-2 border border-primary-300 dark:bg-primary-825 dark:border-transparent dark:border-s-transparent focus:outline-none dark:placeholder-primary-550 dark:text-primary-200"
                        placeholder="Search Trading Events..." required="">
                      <button type="submit"
                        class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg focus:outline-none dark:bg-primary-825 ">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                          fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                        </svg>
                        <span class="sr-only">Search</span>
                      </button>
                    </div>
                  </div>
                </form>
                <button type="button"
                  class="text-primary-400 dark:text-primary-300 bg-transparent hover:bg-primary-200 hover:text-primary-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:bg-primary-575/20 dark:hover:bg-primary-525 dark:hover:text-white"
                  data-modal-hide="static-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
            </div>
          </div>
          <div class="p-4 md:p-5 rounded-lg ">
            <div class="overflow-y-auto flex-grow space-y-4 p-5 py-7 max-h-[32rem] rounded-2xl dark:bg-primary-825/70">
              <div id="trading-conditions" class="">
                ${Object.entries(tradingConditions).map(([category, conditions]) => `
                  <div class="mb-3 py-5 category-group" data-category="${category}">
                    <div class="flex gap-x-2 mb-2 pb-2 border-b border-b-primary-650">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1 .719-.755V6Z" clip-rule="evenodd" />
                      </svg>
                      <h4 class="text-lg font-semibold text-primary-800 dark:text-white">${category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                    </div>
                    <div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                      ${conditions.map(condition => `
                        <div class="flex gap-x-2 items-center hover:bg-primary-650/60 px-2 py-1 rounded-md condition-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                          </svg>
                          <div class="text-md">${condition.text}</div>
                          ${condition.isNew ? `<span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">NEW</span>` : ''}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const script = `
  <script>
    $(document).ready(function () {
      const $modal = $('#static-modal');
      const $backdrop = $('#modal-backdrop');
      const $openButtons = $('[data-modal-target="static-modal"]');
      const $closeButtons = $('[data-modal-hide="static-modal"]');
      const $searchForm = $('#search-form');
      const $searchInput = $('#search-dropdown');
      const $tradingConditions = $('#trading-conditions');
      
      // Store the original HTML content
      const originalContent = $tradingConditions.html();

      function openModal() {
        $modal.removeClass('hidden').addClass('flex');
        $backdrop.removeClass('hidden');
        $('body').css('overflow', 'hidden');
      }

      function closeModal() {
        $modal.addClass('hidden').removeClass('flex');
        $backdrop.addClass('hidden');
        $('body').css('overflow', 'auto');
        // Reset search when closing the modal
        $searchInput.val('');
        resetSearch();
      }

      function filterConditions(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        let hasVisibleItems = false;

        // Reset all items to visible state
        $('.condition-item, .category-group').show();

        if (searchTerm !== '') {
          $('.condition-item').each(function() {
            const $item = $(this);
            const text = $item.text().toLowerCase();
            if (!text.includes(searchTerm)) {
              $item.hide();
            } else {
              hasVisibleItems = true;
            }
          });

          $('.category-group').each(function() {
            const $group = $(this);
            const $visibleItems = $group.find('.condition-item:visible');
            if ($visibleItems.length === 0) {
              $group.hide();
            }
          });
        } else {
          hasVisibleItems = true;
        }

        updateNoResultsMessage(hasVisibleItems, searchTerm);
      }

      function updateNoResultsMessage(hasVisibleItems, searchTerm) {
        if (!hasVisibleItems && searchTerm !== '') {
          if ($('#no-results').length === 0) {
            $tradingConditions.append('<p id="no-results" class="text-center text-primary-500 dark:text-primary-400">No matching conditions found.</p>');
          }
        } else {
          $('#no-results').remove();
        }
      }

      function resetSearch() {
        $tradingConditions.html(originalContent);
      }

      $openButtons.on('click', openModal);
      $closeButtons.on('click', closeModal);

      $modal.on('click', function (event) {
        if ($(event.target).is($modal)) {
          closeModal();
        }
      });

      $(document).on('keydown', function (event) {
        if (event.key === 'Escape' && !$modal.hasClass('hidden')) {
          closeModal();
        }
      });

      $searchForm.on('submit', function(e) {
        e.preventDefault();
        const searchTerm = $searchInput.val();
        filterConditions(searchTerm);
      });

      $searchInput.on('input', function() {
        const searchTerm = $(this).val();
        filterConditions(searchTerm);
      });
    });
  </script>
`;
  return $('<div>').append(
    $(html),
    $(script)
  );
}