import { getContrastColor, rgb2hex } from '/static/js/global-script.js';

// โค้ดหลักของ Minimap
$(document).ready(function () {
    let $highlights;
    let currentIndex = -1;
    var isDragging = false;
    var clickOffsetY;
    var sliderHeight = '0.8rem';
    var contentScrollRatio;
    var resizeTimer;
    let isMinimapVisible = true;
 
    function updateToggleButtons() {
        if (isMinimapVisible) {
            $('#show-minimap').addClass('hidden right-8').removeClass('right-2');
            $('#hide-minimap').removeClass('hidden');
            $('#minimap, #button-container').removeClass('hidden');
        } else {
            $('#show-minimap').removeClass('hidden');
            $('#hide-minimap').addClass('hidden');
            $('#minimap, #button-container').addClass('hidden');
            // เคลื่อนที่ปุ่ม show-minimap เข้ามาจากด้านขวาโดยใช้ Tailwind classes
            setTimeout(() => {
                $('#show-minimap').addClass('right-2').removeClass('right-8');
            }, 0);
        }
    }
 
    function updateHighlights() { 
        $highlights = $('.isHighlight').filter(function () {
            return $(this).is(':visible');
        });
        createButtons();
    }
 
    function calculateMinimapHeight() {
        var contentHeight = $('#content')[0].scrollHeight;
        var minHeight = 3 * 16;
        var maxHeight = 42 * 16;
        var contentMaxHeight = 20000;
        var height = (contentHeight / contentMaxHeight) * (maxHeight - minHeight) + minHeight;
        return Math.max(minHeight, Math.min(height, maxHeight));
    }
 
    function updateMinimap() {
        if (!isMinimapVisible) return;
 
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
    }
 
    function createButtons() {
        $('#button-container').empty();
        var contentHeight = $('#content')[0].scrollHeight;
        var minimapHeight = calculateMinimapHeight();
        var contentTop = $('#content').offset().top;
        var slidMinimap = $('#minimap-slider').css('top');
        var minimapScale = minimapHeight / contentHeight;
 
        let lastButtonBottom = 0;
        const minButtonSpacing = 2;
 
        $highlights.each(function (index) {
            const bgColor = $(this).css('background-color');
            const text = $(this).text();
            const hexColor = rgb2hex(bgColor);
            const textColor = getContrastColor(hexColor);
            let elementTop = $(this).offset().top - contentTop;
            let buttonTop = parseInt(elementTop * minimapScale) + (parseInt(slidMinimap) * 0.845);
 
            if (index > 0 && buttonTop - lastButtonBottom < minButtonSpacing) {
                buttonTop = lastButtonBottom + minButtonSpacing;
            }
 
            const highlightHeight = $(this).outerHeight();
            const buttonHeight = Math.max(16, highlightHeight * minimapScale);
 
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
        $('.highlight-button').css('opacity', '0.8');
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
        if (e.which !== 1) return; // Only proceed if left mouse button is pressed
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
        updateToggleButtons();
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
 
    $(document).on('mouseup', function () {
        isDragging = false;
        $('body').css('user-select', 'auto');
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
 
    $('#hide-minimap').on('click', function() {
        isMinimapVisible = false;
        updateToggleButtons();
    });
 
    $('#show-minimap').on('click', function() {
        isMinimapVisible = true;
        updateToggleButtons();
        updateMinimap();
    });
 
    resizeAll();
 });