import { RemoveBorderLastcommonFlexClasses } from '/static/js/global-script.js';

$(document).ready(function () {

    /*
    * START:  moveItem on localstorage for DnD application
    */
    const storedItems = localStorage.getItem('items');
    let items = JSON.parse(storedItems);

    function moveItem(sourceId, targetId, side, data = items) {
        console.log('sourceId ' + sourceId + " | targetId " + targetId)
        if (sourceId === targetId) return false;

        const findInAll = (id, items) => {
            for (const item of items) {
                if (item.id === id) return item;
                if (item.children && item.children.length) {
                    const found = findInAll(id, item.children);
                    if (found) return found;
                }
                if (item.conditions && item.conditions.length) {
                    const found = findInAll(id, item.conditions);
                    if (found) return found;
                }
                if (item.actions && item.actions.length) {
                    const found = findInAll(id, item.actions);
                    if (found) return found;
                }
            }
            return null;
        };

        const findParentArray = (id, items, parent = null) => {
            for (const item of items) {
                if (item.id === id) return parent || items;
                if (item.children && item.children.length) {
                    const found = findParentArray(id, item.children, item.children);
                    if (found) return found;
                }
                if (item.conditions && item.conditions.length) {
                    const found = findParentArray(id, item.conditions, item.conditions);
                    if (found) return found;
                }
                if (item.actions && item.actions.length) {
                    const found = findParentArray(id, item.actions, item.actions);
                    if (found) return found;
                }
            }
            return null;
        };

        const source = findInAll(sourceId, data);
        const target = findInAll(targetId, data);

        if (!source || !target) return false;

        const sourceArray = findParentArray(sourceId, data);
        let targetArray;
        console.log("pass1" + side)
        if (side === 'condition') {
            if (!target.conditions) target.conditions = [];
            targetArray = target.conditions;
        } else if (side === 'action') {
            if (!target.actions) target.actions = [];
            targetArray = target.actions;
        } else {
            targetArray = findParentArray(targetId, data);
        }

        if (!sourceArray || !targetArray) return false;

        const sourceIndex = sourceArray.findIndex(item => item.id === sourceId);
        sourceArray.splice(sourceIndex, 1);
        console.log(side);
        if (side === 'condition' || side === 'action') {
            targetArray.push(source);
        } else {
            const targetIndex = targetArray.findIndex(item => item.id === targetId);
            targetArray.splice(targetIndex + (side === "bottom" ? 1 : 0), 0, source);
        }

        try {
            localStorage.setItem('items', JSON.stringify(data));
            console.log("บันทึกการเปลี่ยนแปลงลงใน localStorage สำเร็จ");

        } catch (error) {
            console.error("ไม่สามารถบันทึกลงใน localStorage ได้:", error);
            return false;
        }

        return true;
    }

    async function moveMultipleItems(sourceIds, targetId, side, data = items) {
        console.log('sourceIds ', sourceIds, " | targetId ", targetId);

        const findInAll = (id, items) => {
            for (const item of items) {
                if (item.id === id) return item;
                if (item.children && item.children.length) {
                    const found = findInAll(id, item.children);
                    if (found) return found;
                }
                if (item.conditions && item.conditions.length) {
                    const found = findInAll(id, item.conditions);
                    if (found) return found;
                }
                if (item.actions && item.actions.length) {
                    const found = findInAll(id, item.actions);
                    if (found) return found;
                }
            }
            return null;
        };

        const findParentArray = (id, items, parent = null) => {
            for (const item of items) {
                if (item.id === id) return parent || items;
                if (item.children && item.children.length) {
                    const found = findParentArray(id, item.children, item.children);
                    if (found) return found;
                }
                if (item.conditions && item.conditions.length) {
                    const found = findParentArray(id, item.conditions, item.conditions);
                    if (found) return found;
                }
                if (item.actions && item.actions.length) {
                    const found = findParentArray(id, item.actions, item.actions);
                    if (found) return found;
                }
            }
            return null;
        };

        const sourcesAndParents = sourceIds.map(id => ({
            source: findInAll(id, data),
            sourceArray: findParentArray(id, data)
        })).filter(item => item.source && item.sourceArray);

        const target = findInAll(targetId, data);
        if (!target) return false;

        let targetArray;
        if (side === 'condition') {
            if (!target.conditions) target.conditions = [];
            targetArray = target.conditions;
        } else if (side === 'action') {
            if (!target.actions) target.actions = [];
            targetArray = target.actions;
        } else {
            targetArray = findParentArray(targetId, data);
        }

        if (!targetArray) return false;

        // Remove all sources from their original positions
        sourcesAndParents.forEach(({ source, sourceArray }) => {
            const sourceIndex = sourceArray.findIndex(item => item.id === source.id);
            sourceArray.splice(sourceIndex, 1);
        });

        // Add all sources to the target position
        if (side === 'condition' || side === 'action') {
            targetArray.push(...sourcesAndParents.map(item => item.source));
        } else {
            const targetIndex = targetArray.findIndex(item => item.id === targetId);
            targetArray.splice(targetIndex + (side === "bottom" ? 1 : 0), 0, ...sourcesAndParents.map(item => item.source));
        }

        try {
            localStorage.setItem('items', JSON.stringify(data));
            console.log("บันทึกการเปลี่ยนแปลงลงใน localStorage สำเร็จ");
        } catch (error) {
            console.error("ไม่สามารถบันทึกลงใน localStorage ได้:", error);
            return false;
        }

        return true;
    }

    // Async Queue
    class AsyncOperationQueue {
        constructor() {
            this.queue = [];
            this.isProcessing = false;
        }

        enqueue(operation, ...args) {
            return new Promise((resolve, reject) => {
                this.queue.push({ operation, args, resolve, reject });
                this.processQueue();
            });
        }

        async processQueue() {
            if (this.isProcessing || this.queue.length === 0) return;

            this.isProcessing = true;
            const { operation, args, resolve, reject } = this.queue.shift();

            try {
                const result = await new Promise(r => setTimeout(() => r(operation(...args)), 0));
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                this.isProcessing = false;
                this.processQueue();
            }
        }
    }

    // Usage
    const operationQueue = new AsyncOperationQueue();

    /*async function runOperations() {
        try {
            console.log("Starting operations...");
            console.log("Move result:", await operationQueue.enqueue(moveItem, 'BTCEntryCondition', 'ETHTradingGroup', 'top'));
            console.log("Add result:", await operationQueue.enqueue(addItem, {id: 'newItem', title: 'New Item'}, 'ETHTradingGroup'));
            console.log("Remove result:", await operationQueue.enqueue(removeItem, 'someItemId'));
            console.log("Update result:", await operationQueue.enqueue(updateItem, 'anotherItemId', {title: 'Updated Title'}));
            console.log("All operations completed.");
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    console.log("Before running operations");
    runOperations();
    console.log("Hello world!");
    
    setTimeout(() => {
        console.log("After all async operations");
    }, 0);*/

    /*
    * END:  moveItem on localstorage for DnD application
    */

    let isDragging = false;
    let clone = null;
    let startX, startY, startTime;
    let dndLine = null;
    const speedThreshold = 0.2; // pixels per millisecond
    let lastHoveredElement = null;
    let currentDndType = null;
    let mouseX, mouseY;
    let isScrolling = false;
    let $currentTarget = null;
    let classSelection = 'select-active invert brightness-[0.7] contrast-150';

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
                $('[data-class="commonFlexClasses"], [data-class="addMoreClasses"]').each(function () {
                    if (this === clone[0] || $.contains(clone[0], this)) return true; // Skip clone and its children

                    const $this = $(this);
                    const thisDndType = $this.attr('dnd-type');
                    const isAddMore = $this.attr('data-class') === 'addMoreClasses';

                    if ($this.hasClass('select-active')) {
                        return true; // ข้ามไปยัง element ถัดไป
                    }

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

        const activeClass = classSelection;
        // ตรวจสอบการกด Shift หรือ Ctrl
        if (!e.shiftKey && !e.ctrlKey) {
            if (!$currentTarget.hasClass("select-active")) {
                var $commonFlexElements = $('[data-class="commonFlexClasses"]');
                $commonFlexElements.removeClass(activeClass);
            }
            $currentTarget.addClass(activeClass);
        }

        // Count .select-active elementsป
        const activeCount = $('[data-class="commonFlexClasses"].' + activeClass.split(' ')[0]).length;


        clone = $('<div>')
            .attr({
                'id': 'draganddropSection',
                'dnd-type': currentDndType,
                'dnd-id': $currentTarget.attr('dnd-id')
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

        const clonedElement = $currentTarget.clone()
            .addClass('opacity-70')
            .css({
                width: originalWidth,
                height: originalHeight,
                transform: `scale(${newWidth / originalWidth}, ${newHeight / originalHeight})`,
                'transform-origin': 'top left'
            })
            .removeAttr('data-class')
            .removeClass(activeClass)
            .find('[data-class="commonFlexClasses"]').removeAttr('data-class').end();

        // Add badge if there's more than one .select-active
        if (activeCount > 1) {
            $('<div>')
                .addClass('absolute inline-flex items-center justify-center w-8 h-8 text-md font-bold text-white bg-red-500 rounded-full top-2 start-2')
                .text(activeCount)
                .appendTo(clonedElement);
        }

        clonedElement.appendTo(clone);

        handleDragMove(e);
    }

    async function stopDragging(e) {
        isDragging = false;
        if (clone) {
            const dndId = clone.attr('dnd-id');
            const $selectedElements = $('[data-class="commonFlexClasses"].' + classSelection.split(' ')[0]);

            if (dndLine) {
                const $targetParent = dndLine.parent();
                const isTopHalf = dndLine.css('top') === '0px';

                if ($selectedElements.length && $targetParent.length) {
                    if ($targetParent.attr('data-class') === 'addMoreClasses') {
                        let parentTarget = $targetParent.closest("[data-class='panelWrapperClasses']");
                        const targetId = parentTarget.attr('dnd-id');
                        const sourceIds = $selectedElements.map(function () {
                            return $(this).attr('dnd-id');
                        }).get();

                        await operationQueue.enqueue(moveMultipleItems, sourceIds, targetId, $selectedElements.first().attr('dnd-type'));
                        $targetParent.before($selectedElements);
                    } else {
                        // Existing logic for commonFlexClasses
                        const targetId = $targetParent.attr('dnd-id');
                        const sourceIds = $selectedElements.map(function () {
                            return $(this).attr('dnd-id');
                        }).get();

                        const position = isTopHalf ? 'top' : 'bottom';
                        let result = await operationQueue.enqueue(moveMultipleItems, sourceIds, targetId, position);

                        if (result) {
                            if (isTopHalf) {
                                $targetParent.before($selectedElements);
                            } else {
                                $targetParent.after($selectedElements.get().reverse());
                            }
                        }
                    }
                }
                removeLine();
                RemoveBorderLastcommonFlexClasses();
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

    $(document).on('mousedown', '[data-class="commonFlexClasses"]', function (e) {
        if (e.which !== 1) return; // Only proceed if left mouse button is pressed
        if ($(e.target).closest('#minimap, #minimap-slider').length) return; // Don't start drag if clicked on minimap

        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();

        $currentTarget = $(this);
        currentDndType = $currentTarget.attr('dnd-type');

        $(document).on('mousemove', checkDragThreshold);
    });

    $(document).on('mouseup', function (e) {
        $(document).off('mousemove', checkDragThreshold);
        if (isDragging) {
            stopDragging(e);
        }
    });

    // Handle scroll event
    let scrollTimeout;
    $(window).on('scroll', function () {
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
        scrollTimeout = setTimeout(function () {
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
    $('#minimap, #minimap-slider').on('mousedown mousemove mouseup', function (e) {
        e.stopPropagation();
    });

    /*
    * START: Multi Selection
    */
    $(document).on('click', function (event) {
        var $target = $(event.target);
        var $commonFlexElements = $('[data-class="commonFlexClasses"]');
        var activeClass = classSelection;
        var $closestCommonFlex = $target.closest('[data-class="commonFlexClasses"]');

        if ($closestCommonFlex.length) {
            var targetDndType = $closestCommonFlex.attr('dnd-type');
            var firstSelectedDndType = $commonFlexElements.filter('.' + activeClass.split(' ')[0]).first().attr('dnd-type');

            if (!event.ctrlKey && !event.shiftKey) {
                $commonFlexElements.removeClass(activeClass);
                $closestCommonFlex.toggleClass(activeClass);
            }
            else if (event.ctrlKey) {
                if (targetDndType === firstSelectedDndType) {
                    $closestCommonFlex.addClass(activeClass);
                }
                else {
                    $commonFlexElements.removeClass(activeClass);
                    $closestCommonFlex.toggleClass(activeClass);
                }
            }
            else if (event.shiftKey) {
                if (targetDndType === firstSelectedDndType) {
                    var $lastActive = $commonFlexElements.filter('.' + activeClass.split(' ')[0]).last();
                    var startIndex = $commonFlexElements.index($lastActive);
                    var endIndex = $commonFlexElements.index($closestCommonFlex);

                    if (startIndex > endIndex) {
                        [startIndex, endIndex] = [endIndex, startIndex];
                    }

                    $commonFlexElements.slice(startIndex, endIndex + 1).each(function () {
                        if ($(this).attr('dnd-type') === targetDndType) {
                            $(this).addClass(activeClass);
                        }
                    });
                }
                else {
                    $commonFlexElements.removeClass(activeClass);
                    $closestCommonFlex.toggleClass(activeClass);
                }
            }
        } else {
            $commonFlexElements.removeClass(activeClass);
        }
    });
    /*
    * END: Multi Selection
    */
});