$(document).ready(function () {
    let isDragging = false;
    let clone = null;
    let startX, startY, startTime;
    let dndLine = null;
    const speedThreshold = 0.1; // pixels per millisecond
    let lastHoveredElement = null;
    let currentDndType = null;
    let lineRemovalTimeout = null;

    function createDndLine(isTop, dndType) {
        const color = dndType === 'action' ? '#4ade80' : '#38bdf8';
        return $('<div>')
            .css({
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: color,
                left: '0',
                [isTop ? 'top' : 'bottom']: '0',
                zIndex: 1001
            });
    }

    function updateLinePosition($element, isTopHalf, dndType) {
        if (!dndLine || dndLine.data('dndType') !== dndType) {
            if (dndLine) dndLine.remove();
            dndLine = createDndLine(isTopHalf, dndType);
            dndLine.data('dndType', dndType);
            $element.append(dndLine);
        } else if (dndLine.parent()[0] !== $element[0]) {
            dndLine.remove().css(isTopHalf ? { top: 0, bottom: 'auto' } : { top: 'auto', bottom: 0 });
            $element.append(dndLine);
        } else {
            dndLine.css(isTopHalf ? { top: 0, bottom: 'auto' } : { top: 'auto', bottom: 0 });
        }
    }

    function removeLine() {
        if (dndLine) {
            dndLine.remove();
            dndLine = null;
        }
        lastHoveredElement = null;
    }

    function resetLineRemovalTimeout() {
        if (lineRemovalTimeout) {
            clearTimeout(lineRemovalTimeout);
            lineRemovalTimeout = null;
        }
    }

    function startLineRemovalTimeout() {
        resetLineRemovalTimeout();
        lineRemovalTimeout = setTimeout(removeLine, 500);
    }

    function handleMouseMove(e) {
        if (!isDragging) {
            const currentTime = new Date().getTime();
            const dx = e.pageX - startX;
            const dy = e.pageY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const timeElapsed = currentTime - startTime;
            const speed = distance / timeElapsed;

            if (speed > speedThreshold && !clone) {
                isDragging = true;
                const $target = $(e.target).closest('[data-class="commonFlexClasses"]');

                if ($target.length) {
                    currentDndType = $target.attr('dnd-type');
                    const targetOffset = $target.offset();
                    const originalWidth = $target.outerWidth();
                    const originalHeight = $target.outerHeight();

                    // Calculate new dimensions
                    let newWidth = Math.min(originalWidth * 0.8, 400);
                    let newHeight = Math.min(originalHeight * 0.8, 200);

                    clone = $('<div>')
                        .attr({
                            'id': 'draganddropSection',
                            'dnd-type': currentDndType
                        })
                        .addClass('clone-container')
                        .css({
                            position: 'fixed',
                            'pointer-events': 'none',
                            'z-index': 1000,
                            width: newWidth,
                            height: newHeight,
                            left: e.clientX - newWidth / 2,
                            top: e.clientY - newHeight / 2,
                            overflow: 'hidden'
                        })
                        .appendTo('body');

                    $target.clone()
                        .addClass('opacity-50')
                        .css({
                            width: originalWidth,
                            height: originalHeight,
                            transform: `scale(${newWidth / originalWidth}, ${newHeight / originalHeight})`,
                            'transform-origin': 'top left'
                        })
                        .removeAttr('data-class')
                        .find('[data-class="commonFlexClasses"]').removeAttr('data-class').end()
                        .appendTo(clone);
                }
            }
        }

        if (isDragging && clone) {
            clone.css({
                left: e.clientX - clone.outerWidth() / 2,
                top: e.clientY - clone.outerHeight() / 2
            });

            let found = false;
            $('[data-class="commonFlexClasses"]').each(function () {
                if (this === clone[0] || $.contains(clone[0], this)) return true; // Skip clone and its children

                const $this = $(this);
                const thisDndType = $this.attr('dnd-type');
                if (thisDndType !== currentDndType) return true; // Skip if dnd-type doesn't match

                const rect = this.getBoundingClientRect();

                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {

                    const isTopHalf = e.clientY < (rect.top + rect.height / 2);
                    updateLinePosition($this, isTopHalf, currentDndType);
                    lastHoveredElement = $this;
                    found = true;
                    resetLineRemovalTimeout();
                    return false; // Break the loop
                }
            });

            if (!found) {
                if (lastHoveredElement) {
                    // Keep the line at the last position
                    updateLinePosition(lastHoveredElement, dndLine ? dndLine.css('top') === '0px' : true, currentDndType);
                    startLineRemovalTimeout();
                }
            } else {
                resetLineRemovalTimeout();
            }
        }
    }

    $(document).on('mousedown', '[data-class="commonFlexClasses"]', function (e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        $(document).on('mousemove', handleMouseMove);
    });

    $(document).on('mouseup', function () {
        isDragging = false;
        if (clone) {
            clone.remove();
            clone = null;
        }
        removeLine();
        currentDndType = null;
        resetLineRemovalTimeout();
        $(document).off('mousemove', handleMouseMove);
    });
});