import { RemoveBorderLastcommonFlexClasses } from '/static/js/global-script.js';
$(document).ready(function() {
    let isDragging = false;
    let clone = null;
    let startX, startY, startTime;
    let dndLine = null;
    const speedThreshold = 0.1; // pixels per millisecond
    let lastHoveredElement = null;
    let currentDndType = null;
    let mouseX, mouseY;
    let isScrolling = false;
    let $currentTarget = null;

    function createDndLine(isTop, dndType) {
        const color = dndType === 'action' ? '#4ade80' : '#38bdf8';
        return $('<div>').css({
            position: 'absolute',
            width: '100%',
            height: '2px',
            backgroundColor: color,
            left: '0',
            [isTop ? 'top' : 'bottom']: '0',
            zIndex: 1
        });
    }

    function updateLinePosition($element, isTopHalf, dndType) {
        if (!dndLine || dndLine.data('dndType') !== dndType) {
            if (dndLine) dndLine.remove();
            dndLine = createDndLine(isTopHalf, dndType);
            dndLine.data('dndType', dndType);
            $element.append(dndLine);
        } else if (dndLine.parent()[0] !== $element[0]) {
            dndLine.remove().css(isTopHalf ? {top: 0, bottom: 'auto'} : {top: 'auto', bottom: 0});
            $element.append(dndLine);
        } else {
            dndLine.css(isTopHalf ? {top: 0, bottom: 'auto'} : {top: 'auto', bottom: 0});
        }
    }

    function removeLine() {
        if (dndLine) {
            dndLine.remove();
            dndLine = null;
        }
        lastHoveredElement = null;
    }

    function handleDragMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    
        if (clone) {
            clone.css({
                left: mouseX - clone.outerWidth() / 2,
                top: mouseY - clone.outerHeight() / 2
            });
    
            if (!isScrolling) {
                let found = false;
                $('[data-class="commonFlexClasses"], [data-class="addMoreClasses"]').each(function() {
                    if (this === clone[0] || $.contains(clone[0], this)) return true; // Skip clone and its children
    
                    const $this = $(this);
                    const thisDndType = $this.attr('dnd-type');
                    const isAddMore = $this.attr('data-class') === 'addMoreClasses';
    
                    // ตรวจสอบว่า element ที่มี data-class="addMoreClasses" ไม่มี div อื่นรอบๆ
                    function isIsolatedAddMore($element) {
                        const $parent = $element.parent();
                        const $siblings = $parent.children();
                        return $siblings.length === 1 && $siblings[0] === $element[0];
                    }

                    // ตรวจสอบเงื่อนไขสำหรับ addMoreClasses
                    if (isAddMore && isIsolatedAddMore($this)) {
                        // Check if dnd types match for addMoreClasses
                        if ((currentDndType === 'condition' && thisDndType === 'condition') || (currentDndType === 'action' && thisDndType === 'action')) {
                            
                            const rect = this.getBoundingClientRect();
                            
                            if (mouseX >= rect.left && mouseX <= rect.right &&
                                mouseY >= rect.top && mouseY <= rect.bottom) {
                                
                                updateLinePosition($this, true, currentDndType); // Always show line at the top for addMoreClasses
                                lastHoveredElement = $this;
                                found = true;
                                return false; // Break the loop
                            }
                        }
                    } else if (!isAddMore && thisDndType === currentDndType) {
                        // Existing logic for commonFlexClasses
                        const rect = this.getBoundingClientRect();
                        
                        if (mouseX >= rect.left && mouseX <= rect.right &&
                            mouseY >= rect.top && mouseY <= rect.bottom) {
                            
                            const isTopHalf = mouseY < (rect.top + rect.height / 2);
                            updateLinePosition($this, isTopHalf, currentDndType);
                            lastHoveredElement = $this;
                            found = true;
                            return false; // Break the loop
                        }
                    }
                });
    
                if (!found && lastHoveredElement) {
                    const lastRect = lastHoveredElement[0].getBoundingClientRect();
                    const horizontalDistance = Math.abs(mouseX - (lastRect.left + lastRect.width / 2));
                    const verticalDistance = Math.abs(mouseY - (lastRect.top + lastRect.height / 2));
    
                    if (horizontalDistance > 256 || verticalDistance > 128) {
                        removeLine();
                    } else {
                        updateLinePosition(lastHoveredElement, dndLine ? dndLine.css('top') === '0px' : true, currentDndType);
                    }
                }
            }
        }
    }

    function startDragging(e) {
        const targetOffset = $currentTarget.offset();
        const originalWidth = $currentTarget.outerWidth();
        const originalHeight = $currentTarget.outerHeight();
        
        // Calculate new dimensions
        const newWidth = Math.min(originalWidth * 0.8, 400);
        const newHeight = Math.min(originalHeight * 0.8, 200);

        clone = $('<div>')
            .attr({
                'id': 'draganddropSection',
                'dnd-type': currentDndType,
                'dnd-id': $currentTarget.attr('dnd-id') // Add this line to copy the dnd-id
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

        $currentTarget.clone()
            .addClass('opacity-70')
            .css({
                width: originalWidth,
                height: originalHeight,
                transform: `scale(${newWidth / originalWidth}, ${newHeight / originalHeight})`,
                'transform-origin': 'top left'
            })
            .removeAttr('data-class')
            .find('[data-class="commonFlexClasses"]').removeAttr('data-class').end()
            .appendTo(clone);

        handleDragMove(e);
    }

    function stopDragging(e) {
        isDragging = false;
        if (clone) {
            const dndId = clone.attr('dnd-id');
            const $draggedElement = $(`[data-class="commonFlexClasses"][dnd-id="${dndId}"]`).first();
            
            if (dndLine) {
                const $targetParent = dndLine.parent();
                const isTopHalf = dndLine.css('top') === '0px';
    
                if ($draggedElement.length && $targetParent.length) {
                    if ($targetParent.attr('data-class') === 'addMoreClasses') {
                        // If dropping on addMoreClasses, always insert at the top
                        $targetParent.before($draggedElement);
                    } else {
                        // Existing logic for commonFlexClasses
                        if (isTopHalf) {
                            $targetParent.before($draggedElement);
                        } else {
                            $targetParent.after($draggedElement);
                        }
                    }
                }
                removeLine();
                RemoveBorderLastcommonFlexClasses()
            }
    
            clone.remove();
            clone = null;
            $('#updateUI').trigger('click');
        }
        currentDndType = null;
        $currentTarget = null;
        $(document).off('mousemove', handleDragMove);
    }

    function checkDragThreshold(e) {
        const currentTime = new Date().getTime();
        const dx = e.pageX - startX;
        const dy = e.pageY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const timeElapsed = currentTime - startTime;
        const speed = distance / timeElapsed;

        if (speed > speedThreshold) {
            isDragging = true;
            $(document).off('mousemove', checkDragThreshold);
            $(document).on('mousemove', handleDragMove);
            startDragging(e);
        }
    }

    $(document).on('mousedown', '[data-class="commonFlexClasses"]', function(e) {
        if (e.which !== 1) return; // Only proceed if left mouse button is pressed
        if ($(e.target).closest('#minimap, #minimap-slider').length) return; // Don't start drag if clicked on minimap

        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
    
        $currentTarget = $(this);
        currentDndType = $currentTarget.attr('dnd-type');
        
        $(document).on('mousemove', checkDragThreshold);
    });
    
    $(document).on('mouseup', function(e) {
        $(document).off('mousemove', checkDragThreshold);
        if (isDragging) {
            stopDragging(e);
        }
    });

    // Handle scroll event
    let scrollTimeout;
    $(window).on('scroll', function() {
        isScrolling = true;
        if (isDragging) {
            if (dndLine) {
                dndLine.hide();
            }
            if (clone) {
                clone.css({
                    left: mouseX - clone.outerWidth() / 2,
                    top: mouseY - clone.outerHeight() / 2
                });
            }
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            if (dndLine) {
                dndLine.show();
            }
            if (isDragging) {
                handleDragMove({ clientX: mouseX, clientY: mouseY });
            }
        }, 150);
    });

    // Prevent drag and drop functionality from interfering with minimap
    $('#minimap, #minimap-slider').on('mousedown mousemove mouseup', function(e) {
        e.stopPropagation();
    });
});