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
    $('div[data-class="leftPanelClasses"]').each(function() {
        $(this).find('div[data-class="commonFlexClasses"]').removeClass('border-0').last().addClass('border-0');
    });

    $('div[data-class="rightPanelClasses"]').each(function() {
        $(this).find('div[data-class="commonFlexClasses"]').removeClass('border-0').last().addClass('border-0');
    });
};


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