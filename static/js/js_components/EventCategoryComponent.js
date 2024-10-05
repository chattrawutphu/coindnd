import { modalDuration } from "/static/js/global-script.js";
export default function renderContent() {
  const tradingConditions = {
    price: {
      icon: 'M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      conditions: [
        { icon: 'plus', text: 'Price Condition', isNew: true, description: 'Set a general condition based on price' },
        { icon: 'plus', text: 'Price is between', isNew: true, description: 'Trigger when price is within a specified range' },
        { icon: 'plus', text: 'Volume Condition', isNew: true, description: 'Set a general condition based on trading volume' },
        { icon: 'plus', text: 'Volume is between', isNew: true, description: 'Trigger when volume is within a specified range' },
        { icon: 'plus', text: 'Marketcap Condition', isNew: true, description: 'Set a general condition based on market capitalization' },
        { icon: 'plus', text: 'Marketcap is between', isNew: true, description: 'Trigger when market cap is within a specified range' },
      ]
    },
    price2: {
      icon: 'M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      conditions: [
        { icon: 'plus', text: 'Price is above', isNew: true, description: 'Trigger when price exceeds a specified value' },
        { icon: 'plus', text: 'Price is below', isNew: true, description: 'Trigger when price falls below a specified value' },
        { icon: 'plus', text: 'Price is between', isNew: true, description: 'Trigger when price is within a specified range' },
        { icon: 'plus', text: 'Price crosses above', description: 'Trigger when price moves from below to above a specified value' },
        { icon: 'plus', text: 'Price crosses below', description: 'Trigger when price moves from above to below a specified value' }
      ]
    },
    volume: {
      icon: 'M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z',
      conditions: [
        { icon: 'plus', text: 'Volume is above', description: 'Trigger when trading volume exceeds a specified value' },
        { icon: 'plus', text: 'Volume is below', description: 'Trigger when trading volume falls below a specified value' },
        { icon: 'plus', text: 'Volume spike', description: 'Trigger when there is a sudden increase in trading volume' }
      ]
    },
    indicators: {
      icon: 'M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
      conditions: [
        { icon: 'plus', text: 'MA crossover', description: 'Trigger when moving averages cross each other' },
        { icon: 'plus', text: 'RSI overbought', description: 'Trigger when Relative Strength Index indicates overbought conditions' },
        { icon: 'plus', text: 'RSI oversold', description: 'Trigger when Relative Strength Index indicates oversold conditions' },
        { icon: 'plus', text: 'MACD signal', description: 'Trigger based on Moving Average Convergence Divergence signal' }
      ]
    },
    timeAndPatterns: {
      icon: 'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z',
      conditions: [
        { icon: 'plus', text: 'Time-based trigger', description: 'Set actions to occur at specific times or intervals' },
        { icon: 'plus', text: 'Triangle pattern', description: 'Detect and act on triangle chart patterns' },
        { icon: 'plus', text: 'Flag pattern', description: 'Detect and act on flag chart patterns' },
        { icon: 'plus', text: 'Head and shoulders', description: 'Detect and act on head and shoulders chart patterns' }
      ]
    },
    positionOrder: {
      icon: 'M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605',
      upgradeBtn: true,
      conditions: [
        { icon: 'plus', text: 'Market order', isPro: true, description: 'Place an order to be executed immediately at the current market price' },
        { icon: 'plus', text: 'Limit order', isPro: true, description: 'Place an order to be executed at a specified price or better' },
        { icon: 'plus', text: 'Stop order', isPro: true, description: 'Place an order to be executed when the price reaches a specified stop price' },
        { icon: 'plus', text: 'Trailing stop', isPro: true, description: 'Place a stop order that adjusts automatically as the price moves in your favor' }
      ]
    },
    balance: {
      icon: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z',
      upgradeBtn: true,
      conditions: [
        { icon: 'plus', text: 'Account balance above', isPro: true, description: 'Trigger when account balance exceeds a specified amount' },
        { icon: 'plus', text: 'Account balance below', isPro: true, description: 'Trigger when account balance falls below a specified amount' },
        { icon: 'plus', text: 'Use percentage of balance', isPro: true, description: 'Set conditions based on a percentage of the account balance' }
      ]
    }
  };

  const html = `
    <button data-modal-target="static-modal" data-modal-toggle="static-modal"
      class="block text-white opacity-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      type="button">
      Crypto Trading Events
    </button>

    <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
     class="fixed flex top-0 right-0 left-0 z-[1001] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden opacity-0 pointer-events-none transition-opacity duration-[${modalDuration}ms] ease-in-out">
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
            <div class="overflow-y-auto flex-grow space-y-4 p-5 py-7 max-h-[32rem] rounded-2xl dark:bg-primary-875/70">
              <div id="trading-conditions" class="">
              ${Object.entries(tradingConditions).map(([category, { upgradeBtn = false, icon, conditions }]) => `
                <div class="mb-3 py-5 category-group" data-category="${category}">
                  <div class="flex items-center gap-x-2 mb-2 pb-2 border-b border-b-primary-650">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="${icon}" />
                    </svg>
                    <h4 class="text-lg font-semibold text-primary-800 dark:text-white">${category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                    ${upgradeBtn ? `<button type="button"
                    class="h-full float-right text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 text-center">Upgrade
                    Plan</button>` : ''}
                  </div>
                  <div class="grid grid-rows-none">
                    ${conditions.map(condition => `
                      <div class="flex gap-x-2 items-center hover:bg-primary-650/60 px-2 py-1 rounded-md condition-item relative" data-condition="${condition.text}">
                        
                        <div class="text-md flex items-center target-search">
                          ${condition.isNew ? `<span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">NEW</span>` : ''}
                          ${condition.isPro ? `<span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">PRO</span>` : ''}
                          ${!condition.isNew && !condition.isPro ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 me-2">
                              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                          </svg>` : ''}
                          ${condition.text}
                        </div>
                        <div class="text-sm dark:text-primary-525 float-end">${condition.description}</div>
                        <button class="favorite-btn absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 opacity-40">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                          </svg>
                        </button>
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

  // Load favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('favoriteConditions')) || [];

  // Function to update favorite status in UI for a single item
  function updateFavoriteUIForItem(conditionElement, isFavorite) {
    const favoriteBtn = conditionElement.find('.favorite-btn');
    const favoriteSvg = favoriteBtn.find('svg');
    if (isFavorite) {
      favoriteSvg.attr('fill', 'currentColor');
      favoriteBtn.css('opacity', '1');
    } else {
      favoriteSvg.attr('fill', 'none');
      favoriteBtn.css('opacity', '0');
    }
  }

  // Function to update favorite status for all items
  function updateAllFavoriteUI() {
    $('.condition-item').each(function() {
      const condition = $(this).data('condition');
      updateFavoriteUIForItem($(this), favorites.includes(condition));
    });
  }

  // Handle favorite button click
  $(document).on('click', '.favorite-btn', function(e) {
    e.stopPropagation();
    const conditionItem = $(this).closest('.condition-item');
    const condition = conditionItem.data('condition');
    const index = favorites.indexOf(condition);

    if (index === -1) {
      favorites.push(condition);
    } else {
      favorites.splice(index, 1);
    }

    // Update localStorage
    localStorage.setItem('favoriteConditions', JSON.stringify(favorites));

    // Update UI for all items
    updateAllFavoriteUI();

    // Refresh the favorites category
    updateFavoritesCategory();
  });

  function updateFavoritesCategory() {
    let favoritesHTML = '';
    favorites = JSON.parse(localStorage.getItem('favoriteConditions')) || [];
    if (favorites.length > 0) {
      favoritesHTML = '<div class="mb-3 py-5 category-group" data-category="favorites">' +
        '<div class="flex items-center gap-x-2 mb-2 pb-2 border-b border-b-primary-650">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">' +
            '<path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z" clip-rule="evenodd" />' +
          '</svg>' +
          '<h4 class="text-lg font-semibold text-primary-800 dark:text-white">Favorites</h4>' +
        '</div>' +
        '<div class="grid grid-cols-1 sm:grid-cols-2">' +
          favorites.map(function(condition) {
            return '<div class="flex gap-x-2 items-center hover:bg-primary-650/60 px-2 py-1 rounded-md condition-item relative" data-condition="' + condition + '">' +
              '<div class="text-md flex items-center">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 me-2">' +
                  '<path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />' +
                '</svg>' +
                condition +
              '</div>' +
              '<button class="favorite-btn absolute right-2 top-1/2 transform -translate-y-1/2" style="opacity: 1;">' +
                '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 opacity-40">' +
                  '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />' +
                '</svg>' +
              '</button>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }

    // Insert or update the favorites category
    var $favoritesCategory = $('#trading-conditions').find('[data-category="favorites"]');
    if ($favoritesCategory.length) {
      $favoritesCategory.replaceWith(favoritesHTML);
    } else {
      $('#trading-conditions').prepend(favoritesHTML);
    }

    // Update UI for all items, including those in other categories
    updateAllFavoriteUI();

    // Reattach hover events for the new elements
    $('.condition-item').hover(
      function() {
        const favoriteBtn = $(this).find('.favorite-btn');
        const isFavorite = favorites.includes($(this).data('condition'));
        if (!isFavorite) {
          favoriteBtn.css('opacity', '1');
        }
      },
      function() {
        const favoriteBtn = $(this).find('.favorite-btn');
        const isFavorite = favorites.includes($(this).data('condition'));
        if (!isFavorite) {
          favoriteBtn.css('opacity', '0');
        }
      }
    );
  }

  // Initial update of favorites category
  updateFavoritesCategory();
  
  // Store the original HTML content
  const originalContent = $tradingConditions.html();

function openModal() {
  $backdrop.removeClass('opacity-0 pointer-events-none');
  $modal.removeClass('opacity-0 pointer-events-none');
  $('body').css('overflow', 'hidden');
  updateFavoritesCategory();
  setTimeout(() => {
    $backdrop.addClass('opacity-100');
    $modal.addClass('opacity-100');
  }, 10);
}

function closeModal() {
  $backdrop.removeClass('opacity-100').addClass('opacity-0 pointer-events-none');
  $modal.removeClass('opacity-100').addClass('opacity-0 pointer-events-none');
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
        const $targetSearch = $item.find('.target-search');
        const text = $targetSearch.text().toLowerCase();
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
    updateAllFavoriteUI();
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

  // Initial update of all favorite UI elements
  updateAllFavoriteUI();
  updateFavoritesCategory();
});
</script>
`;
  return $('<div>').append(
    $(html),
    $(script)
  );
}