export function getContrastColor(hexcolor) {
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

export function rgb2hex(rgb) {
    if (rgb.search("rgb") == -1) return rgb;
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


export function RemoveBorderLastcommonFlexClasses() {
    $('div[data-class="leftPanelClasses"]').each(function () {
        $(this).find('div[data-class="commonFlexClasses"]').removeClass('border-0').last().addClass('border-0');
    });

    $('div[data-class="rightPanelClasses"]').each(function () {
        $(this).find('div[data-class="commonFlexClasses"]').removeClass('border-0').last().addClass('border-0');
    });
};

export function updateUIheight() {
    const $panelWrappers = $('[data-class="panelWrapperClasses"]');

    $panelWrappers.each(function () {
        const $panelWrapper = $(this);
        const $lineArea = $panelWrapper.find('[data-class="lineAreaClasses"]').first();
        const $numberPanel = $panelWrapper.find('[data-class="numberPanelClasses"]').first();
        const $highlightArea = $panelWrapper.find('[data-class="highlightAreaClasses"]').first();

        //const panelContainer = $panelWrapper.find('[data-class="panelContainerClasses"]').first().height() || 0;
        const groupSection = $panelWrapper.find('[data-class="groupSectionClasses"]').first().height() || 0;

        const totalOffset = groupSection + 4;
        const newHeight = $panelWrapper.height() - totalOffset;

        $lineArea.css({
            'height': `${newHeight}px`,
            'margin-top': `${totalOffset}px`
        });

        $numberPanel.css('margin-top', `8px`);
        $highlightArea.css('margin-top', `${totalOffset}px`);
    });
}

export function applyGroupBackgroundColorToNonGroup() {
    $('.bg-color-panel.for-nonegroup').each(function () {
        var $nonGroup = $(this);
        var $panelWrapper = $nonGroup.closest('[data-class="panelWrapperClasses"][dnd-subtype="group"]');
        var $closestGroup;
        $nonGroup.css('background-color', '');
        function findClosestGroup($wrapper) {
            return $wrapper.find(' > [data-class="lineAreaClasses"] > div.bg-color-panel.for-group');
        }

        while ($panelWrapper.length) {
            $closestGroup = findClosestGroup($panelWrapper);

            if ($closestGroup.length) {
                var bgColor = $closestGroup.css('background-color');
                $nonGroup.css('background-color', bgColor);
                break;
            }

            // Move to the next parent panelWrapper
            $panelWrapper = $panelWrapper.parent().closest('[data-class="panelWrapperClasses"][dnd-subtype="group"]');
        }
    });
    $('[data-class="panelWrapperClasses"][dnd-subtype="variable"], [data-class="panelWrapperClasses"][dnd-subtype="message"]').each(function () {
        var $nonGroup = $(this);
        var $panelWrapper = $nonGroup.closest('[data-class="panelWrapperClasses"][dnd-subtype="group"]');
        var $closestGroup;
        $nonGroup.css('background-color', '');
    
        function findClosestGroup($wrapper) {
            return $wrapper.find(' > [data-class="lineAreaClasses"] > div.bg-color-panel.for-group');
        }
    
        function rgbToRgba(rgb, opacity) {
            var rgbValues = rgb.match(/\d+/g);  // Extract the numeric values from the rgb string
            return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${opacity})`;
        }
    
        while ($panelWrapper.length) {
            $closestGroup = findClosestGroup($panelWrapper);
    
            if ($closestGroup.length) {
                var bgColor = $closestGroup.css('background-color');
                var rgbaColor = rgbToRgba(bgColor, 0.07); // Convert to rgba with 0.15 opacity
                $nonGroup.css('background-color', rgbaColor);
                break;
            }
    
            // Move to the next parent panelWrapper
            $panelWrapper = $panelWrapper.parent().closest('[data-class="panelWrapperClasses"][dnd-subtype="group"]');
        }
    });
}

export function toggleExpandButtonVisibility() {
    $('[data-class="panelWrapperClasses"]').each(function() {
      var $panelWrapper = $(this);
      var $expandButton = $panelWrapper.find('[data-class="expandButtonClasses"]');
      
      // Check if this panelWrapper has a child panelWrapper
      var hasChildPanelWrapper = $panelWrapper.children('[data-class="panelWrapperClasses"]').length > 0;
      
      if (hasChildPanelWrapper) {
        // If it has a child panelWrapper, remove the 'hidden' class from the expand button
        $expandButton.removeClass('hidden');
      } else {
        // If it doesn't have a child panelWrapper, add the 'hidden' class to the expand button
        $expandButton.addClass('hidden');
      }
    });
  }

export function appendEventButton() {
    /*$('[data-class="addEventBuntton"]').remove();
    $('[data-class="panelWrapperClasses"]').each(function() {
        var $current = $(this);
        var $next = $current.next('[data-class="panelWrapperClasses"]');
        var $childPanelWrappers = $current.find('[data-class="panelWrapperClasses"]');
        
        if ($next.length === 0 && $childPanelWrappers.length > 0) {
            // Find the ml-[px] class from the panelWrapperMargin element
            var $marginElement = $current.find('[data-class="panelWrapperMargin"]');
            var mlClass = $marginElement.attr('class').match(/ml-\[\d+px\]/);
            var marginClass = mlClass ? mlClass[0] : '';
    
            // Create the new button element
            var $newButton = $(`
                <div data-class="addEventBuntton" class="min-w-[32rem] hidden col-[span_30/span_30] bg-[#2B3544] rounded-[0.2rem] text-xs p-1.5 m-[1px] dark:text-zinc-500 text-zinc-800 ${marginClass}">
                    <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                            <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                        </svg>
                        <p>move here!</p>
                    </div>
                </div>
            `);
            // Insert the button after the current element
            $current.after($newButton);
        }
    });*/
}