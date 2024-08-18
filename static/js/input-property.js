$(document).ready(function () {
    $('.openProperty').on('click', function () {
        console.log('open property')
        var $parentDiv = $(this).closest('div[dnd-template]');
        var dndTemplate = $parentDiv.attr('dnd-template');

        if (dndTemplate === 'priceCondition') {
            var dndId = $parentDiv.attr('dnd-id');
            var dndParam = $parentDiv.attr('dnd-param');

            if (dndParam) {
                dndParam = decodeURIComponent(dndParam);
            }
            var dndParamObj = JSON.parse(dndParam);

            console.log(dndId);
            console.log(dndParamObj);
            // เรียกฟังก์ชั่น renderContent จากไฟล์ PriceConditionPropertyComponent.js
            // ให้แน่ใจว่าไฟล์ js_components/PriceConditionPropertyComponent.js ถูกโหลดในหน้าแล้ว
            /*if (typeof renderContent === 'function') {
                // เรียกใช้ฟังก์ชัน renderContent พร้อมพารามิเตอร์ที่ต้องการ
                var htmlContent = renderContent(dndId, dndParam);
                
            } else {
                console.error('renderContent function not found.');
            }*/
        }
    });
});