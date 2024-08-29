import { getContrastColor, rgb2hex } from '/static/js/global-script.js';

$(document).ready(function () {
   let $highlights;
   let currentIndex = -1;
   var isDragging = false;
   var clickOffsetY;
   var sliderHeight = '1rem';
   var contentScrollRatio;
   var resizeTimer;

   function updateHighlights() { 
       $highlights = $('.isHighlight').filter(function () {
           return $(this).is(':visible');
       });
       console.log('Visible highlights selected:', $highlights.length);
       setTimeout(function () {
           createButtons();
       }, 300);
   }

   function calculateMinimapHeight() {
       var contentHeight = $('#content')[0].scrollHeight;
       var minHeight = 3 * 16;
       var maxHeight = 24 * 16;
       var contentMaxHeight = 10000;
       var height = (contentHeight / contentMaxHeight) * (maxHeight - minHeight) + minHeight;
       return Math.max(minHeight, Math.min(height, maxHeight));
   }

   function updateMinimap() {
       var contentHeight = $('#content')[0].scrollHeight;
       var viewportHeight = $('#content').height();
       var scrollTop = $('#content').scrollTop();
       var minimapHeight = calculateMinimapHeight();

       contentScrollRatio = contentHeight / minimapHeight;

       var sliderHeightPx = parseFloat(sliderHeight) * 16;
       var sliderTop = (scrollTop / (contentHeight - viewportHeight)) * (minimapHeight - sliderHeightPx);
       sliderTop = Math.max(0, Math.min(sliderTop, minimapHeight - sliderHeightPx));

       $('#minimap').css('height', minimapHeight + 'px');
       $('#minimap-slider').css({
           height: sliderHeight,
           top: sliderTop + 'px',
           display: 'block'
       });

       if (contentHeight <= viewportHeight) {
           $('#minimap').hide();
       } else {
           $('#minimap').show();
       }
   }

   function createButtons() {
       $('#button-container').empty();
       var contentHeight = $('#content')[0].scrollHeight;
       var minimapHeight = calculateMinimapHeight();
       var contentTop = $('#content').offset().top;
       var slidMinimap = $('#minimap-slider').css('top');
       //console.log("slidMinimap: " + slidMinimap)
       var minimapScale = minimapHeight / contentHeight;

       let lastButtonBottom = 0;
       const minButtonSpacing = 2; // ระยะห่างขั้นต่ำระหว่างปุ่ม

       $highlights.each(function (index) {
           const bgColor = $(this).css('background-color');
           const text = $(this).text();
           const hexColor = rgb2hex(bgColor);
           const textColor = getContrastColor(hexColor);
           let elementTop = $(this).offset().top - contentTop;
           let buttonTop = parseInt(elementTop * minimapScale) + (parseInt(slidMinimap) * 0.845);

           // ตรวจสอบและปรับตำแหน่งของปุ่มเพื่อให้มีระยะห่างขั้นต่ำ
           if (index > 0 && buttonTop - lastButtonBottom < minButtonSpacing) {
               buttonTop = lastButtonBottom + minButtonSpacing;
           }

           // คำนวณความสูงของปุ่มตามความสูงของไฮไลท์
           const highlightHeight = $(this).outerHeight();
           const buttonHeight = Math.max(16, highlightHeight * minimapScale); // ความสูงขั้นต่ำ 16px

           $('#button-container').append(`
               <button class="highlight-button absolute font-bold rounded text-xs"
                       data-index="${index}"
                       style="background-color: ${bgColor}; color: ${textColor};
                           top: ${buttonTop}px; left: -30px;
                           height: ${buttonHeight}px; min-width: 20px;
                           display: flex; align-items: center; justify-content: center;">
                   ${text}
               </button>
           `);             

           // อัปเดตตำแหน่งด้านล่างของปุ่มล่าสุด
           lastButtonBottom = buttonTop + buttonHeight;
       });
       updateButtonStyles();
   }

   function scrollToHighlight(index) {
       if ($highlights && $highlights.length > 0) {
           $highlights.eq(index)[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
           currentIndex = index;
           updateButtonStyles();
       }
   }

   function updateButtonStyles() {
       $('.highlight-button').css('opacity', '0.7');
       $(`.highlight-button[data-index="${currentIndex}"]`).css('opacity', '1');
   }

   function updateContentScroll(sliderTop) {
       var contentHeight = $('#content')[0].scrollHeight;
       var viewportHeight = $('#content').height();
       var minimapHeight = calculateMinimapHeight();
       var sliderHeightPx = parseFloat(sliderHeight) * 16;
       var scrollRatio = sliderTop / (minimapHeight - sliderHeightPx);
       var scrollTop = scrollRatio * (contentHeight - viewportHeight);
       $('#content').scrollTop(scrollTop);
   }

   function startDragging(e) {
       isDragging = true;
       var sliderOffset = $('#minimap-slider').offset().top;
       var clickY = e.pageY;

       if (clickY < sliderOffset) {
           $('#minimap-slider').css('top', (clickY - $('#minimap').offset().top) + 'px');
       } else if (clickY > sliderOffset + parseFloat(sliderHeight) * 16) {
           $('#minimap-slider').css('top', (clickY - $('#minimap').offset().top - parseFloat(sliderHeight) * 16) + 'px');
       }

       clickOffsetY = clickY - $('#minimap-slider').offset().top;
       $('body').css('user-select', 'none');
       updateContentScroll($('#minimap-slider').position().top);
   }

   function resizeAll() {
       updateHighlights();
       updateMinimap();
   }

   $('#content').on('scroll', updateMinimap);

   $('#minimap').on('mousedown', startDragging);

   $('#minimap-slider').on('mousedown', function (e) {
       e.stopPropagation();
       startDragging(e);
   });

   $(document).on('mousemove', function (e) {
       if (isDragging) {
           var minimapOffset = $('#minimap').offset().top;
           var newTop = e.pageY - minimapOffset - clickOffsetY;
           var sliderHeightPx = parseFloat(sliderHeight) * 16;
           var maxTop = $('#minimap').height() - sliderHeightPx;
           newTop = Math.max(0, Math.min(newTop, maxTop));
           $('#minimap-slider').css('top', newTop + 'px');
           updateContentScroll(newTop);
       }
   });

   $(document).on('click', '.highlight-button', function () {
       const index = $(this).data('index');
       scrollToHighlight(index);
   });

   $('#minimap, #button-container').hover(
       function () {
           $('#minimap, #button-container').removeClass('opacity-0').addClass('opacity-100');
       },
       function () {
           if (!isDragging) {
               $('#minimap, #button-container').removeClass('opacity-100').addClass('opacity-0');
           }
       }
   );

   $(document).on('mouseup', function () {
       isDragging = false;
       $('body').css('user-select', 'auto');
       if (!$('#minimap').is(":hover") && !$('#button-container').is(":hover")) {
           $('#minimap, #button-container').removeClass('opacity-100').addClass('opacity-0');
       }
   });

   $('#minimap').on('wheel', function (e) {
       e.preventDefault();
       var delta = e.originalEvent.deltaY;
       var currentScrollTop = $('#content').scrollTop();
       $('#content').scrollTop(currentScrollTop + delta);
   });

   $(document).on('click', '[data-class="expandButtonClasses"]', function () {
       setTimeout(resizeAll, 100);
   });

   $(window).on('resize', function () {
       clearTimeout(resizeTimer);
       resizeTimer = setTimeout(resizeAll, 250);
   });

   setTimeout(resizeAll, 300);

   var observer = new MutationObserver(function (mutations) {
       resizeAll();
   });

   observer.observe($('#content')[0], {
       childList: true,
       subtree: true,
       characterData: true
   });
});