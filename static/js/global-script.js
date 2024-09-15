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

export function adjustLineAreaWidth() {
    /*$('[data-class="panelWrapperClasses"][dnd-subtype="group"]').each(function() {
        var $lineArea = $(this).find('[data-class="lineAreaClasses"] div:first');
        var $groupSection = $(this).find('[data-class="groupSectionClasses"]');
        
        // ตรวจสอบว่าเป็น panelWrapperClasses ที่อยู่ในสุดหรือไม่
        if ($(this).find('[data-class="panelWrapperClasses"][dnd-subtype="group"]').length === 0) {
            // ตั้งค่าความกว้างของ $lineArea ให้เท่ากับ $groupSection ลบ 3px โดยไม่รวม margin
            if ($lineArea.length && $groupSection.length) {
                var newWidth = $groupSection.width() + 22;
                $lineArea.width(newWidth > 0 ? newWidth : 0);
            }
        } else {
            // กรณีไม่เข้าเงื่อนไข ให้กลับไปใช้ความกว้างเดิม
            if ($lineArea.length) {
                $lineArea.width('');  // ลบ inline width style
            }
        }
    });*/
}