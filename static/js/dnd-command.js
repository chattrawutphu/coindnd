import { RemoveBorderLastcommonFlexClasses } from '/static/js/global-script.js';

$(document).ready(function () {
    const UndoManager = window.UndoManager;
    const MAX_HISTORY = 50;
    const undoManager = new UndoManager();
    undoManager.setLimit(MAX_HISTORY);

    let items = [];

    function updateUIFromCache(html) {
        $('[data-js-component="DndComponent"]').html(html);
        cleanupUI();
    }

    function updateButtonStates() {
        $('#undoBtn').prop('disabled', !undoManager.hasUndo());
        $('#redoBtn').prop('disabled', !undoManager.hasRedo());
    }

    $(document).on('keydown', function (e) {
        if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) {
            e.preventDefault();
            if (e.shiftKey) {
                if (undoManager.hasRedo()) {
                    undoManager.redo();
                    cleanupUI();
                    updateButtonStates();
                }
            } else {
                if (undoManager.hasUndo()) {
                    undoManager.undo();
                    cleanupUI();
                    updateButtonStates();
                }
            }
        }
        else if (e.ctrlKey && (e.key === 'y' || e.key === 'Y')) {
            e.preventDefault();
            if (undoManager.hasRedo()) {
                undoManager.redo();
                cleanupUI();
                updateButtonStates();
            }
        }
    });

    $('#undoBtn').on('click', function () {
        if (undoManager.hasUndo()) {
            undoManager.undo();
            cleanupUI();
            updateButtonStates();
        }
    });

    $('#redoBtn').on('click', function () {
        if (undoManager.hasRedo()) {
            undoManager.redo();
            cleanupUI();
            updateButtonStates();
        }
    });

    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
    }

    function moveMultipleItems(sourceIds, targetId, side, data = items) {

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

    // Initial button state update
    updateButtonStates();

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

    function createDndLine(isTop, dndType, isLeftSide = true) {
        const color = dndType === 'action' ? '#4ade80' : (dndType === 'container' ? '#38bdf8' : '#4ade80');
        const width = (dndType === 'container' && !isLeftSide && !isTop) ? '90%' : '100%';
        const right = (dndType === 'container' && !isLeftSide && !isTop) ? '0' : 'auto';
        
        const $line = $('<div>').css({
            position: 'absolute',
            width: width,
            height: '4px',
            backgroundColor: color,
            left: isLeftSide ? '0' : 'auto',
            right: right,
            [isTop ? 'top' : 'bottom']: '0',
            zIndex: 1
        }).addClass("drop-target-line");
    
        if (dndType === 'container' && !isLeftSide) {
            $line.addClass('isDropAsChild');
        }
    
        return $line;
    }
    
    function updateLinePosition($element, isTopHalf, dndType) {
        let $targetElement = $element;
        let isLeftSide = true;
    
        if (dndType === 'container') {
            const $panelContainer = $element.find('[data-class="panelContainerClasses"]').first();
            if ($panelContainer.length) {
                $targetElement = $panelContainer;
            }
            
            // ตรวจสอบตำแหน่งเมาส์
            const rect = $element[0].getBoundingClientRect();
            const mouseX = window.event.clientX; // หมายเหตุ: ควรส่ง mouseX เป็นพารามิเตอร์แทนการใช้ window.event
            isLeftSide = (mouseX - rect.left) < (rect.width * 0.5);
        }
    
        if (!dndLine || dndLine.data('dndType') !== dndType || dndLine.data('isLeftSide') !== isLeftSide || dndLine.data('isTopHalf') !== isTopHalf) {
            if (dndLine) dndLine.remove();
            dndLine = createDndLine(isTopHalf, dndType, isLeftSide);
            dndLine.data('dndType', dndType);
            dndLine.data('isLeftSide', isLeftSide);
            dndLine.data('isTopHalf', isTopHalf);
            $targetElement.append(dndLine);
        } else if (dndLine.parent()[0] !== $targetElement[0]) {
            dndLine.remove();
            dndLine = createDndLine(isTopHalf, dndType, isLeftSide);
            dndLine.data('isLeftSide', isLeftSide);
            dndLine.data('isTopHalf', isTopHalf);
            $targetElement.append(dndLine);
        } else {
            const cssProps = {
                top: isTopHalf ? 0 : 'auto',
                bottom: isTopHalf ? 'auto' : 0,
                left: isLeftSide ? '0' : 'auto'
            };
    
            if (dndType === 'container' && !isLeftSide && !isTopHalf) {
                cssProps.width = '90%';
                cssProps.right = '0';
            } else {
                cssProps.width = '100%';
                cssProps.right = 'auto';
            }
    
            dndLine.css(cssProps);
    
            if (dndType === 'container' && !isLeftSide) {
                dndLine.addClass('isDropAsChild');
            } else {
                dndLine.removeClass('isDropAsChild');
            }
        }
    }

    function cleanupUI() {
        removeLine();
        clearCommandSelection();
        RemoveBorderLastcommonFlexClasses();
    }

    function removeLine() {
        if (dndLine) {
            dndLine.remove();
            dndLine = null;
        }
        // ลบทุก element ที่มี class .drop-target-line
        $('.drop-target-line').remove();
        lastHoveredElement = null;
    }

    function clearCommandSelection() {
        var $commonFlexElements = $('[data-class="commonFlexClasses"]');
        $commonFlexElements.removeClass(classSelection);
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
                $('[data-class="commonFlexClasses"], [data-class="addMoreClasses"], [data-class="panelWrapperClasses"]').each(function () {
                    if (this === clone[0] || $.contains(clone[0], this)) return true; // ข้าม clone และ children ของมัน

                    const $this = $(this);
                    const thisDndType = $this.attr('dnd-type');
                    const isAddMore = $this.attr('data-class') === 'addMoreClasses';
                    const isPanelWrapper = $this.attr('data-class') === 'panelWrapperClasses';

                    if ($this.hasClass('select-active')) {
                        return true; // ข้ามไปยัง element ถัดไป
                    }

                    // ฟังก์ชันตรวจสอบว่า element ที่มี data-class="addMoreClasses" ไม่มี div อื่นรอบๆ
                    function isIsolatedAddMore($element) {
                        const $parent = $element.parent();
                        const $siblings = $parent.children();
                        return $siblings.length === 1 && $siblings[0] === $element[0];
                    }

                    // ตรวจสอบเงื่อนไขสำหรับ addMoreClasses
                    if (isAddMore && isIsolatedAddMore($this)) {
                        // ตรวจสอบว่า dnd types ตรงกันสำหรับ addMoreClasses
                        if ((currentDndType === 'condition' && thisDndType === 'condition')
                            || (currentDndType === 'action' && thisDndType === 'action')) {

                            const rect = this.getBoundingClientRect();

                            if (mouseX >= rect.left && mouseX <= rect.right &&
                                mouseY >= rect.top && mouseY <= rect.bottom) {

                                updateLinePosition($this, true, currentDndType); // แสดงเส้นที่ด้านบนเสมอสำหรับ addMoreClasses
                                lastHoveredElement = $this;
                                found = true;
                                return false; // ออกจาก loop
                            }
                        }
                    } else if (isPanelWrapper && currentDndType === 'container' && thisDndType === 'container') {
                        // จัดการกับ panelWrapperClasses
                        const rect = this.getBoundingClientRect();
                    
                        // เพิ่มเงื่อนไขตรวจสอบระยะห่างจาก top และ bottom
                        const topDistance = mouseY - rect.top;
                        const bottomDistance = rect.bottom - mouseY;
                    
                        if (mouseX >= rect.left && mouseX <= rect.right &&
                            mouseY >= rect.top && mouseY <= rect.bottom &&
                            (topDistance <= 64 || bottomDistance <= 64)) {
                    
                            const $hoveredPanels = $('[data-class="panelWrapperClasses"]').filter(function () {
                                const panelRect = this.getBoundingClientRect();
                                const panelTopDistance = mouseY - panelRect.top;
                                const panelBottomDistance = panelRect.bottom - mouseY;
                    
                                return mouseX >= panelRect.left && mouseX <= panelRect.right &&
                                    mouseY >= panelRect.top && mouseY <= panelRect.bottom &&
                                    (panelTopDistance <= 64 || panelBottomDistance <= 64);
                            });
                    
                            if ($hoveredPanels.length > 0 && $hoveredPanels.last()[0] === this) {
                                const isTopHalf = mouseY < (rect.top + rect.height / 2);
                                updateLinePosition($this, isTopHalf, currentDndType);
                                lastHoveredElement = $this;
                                found = true;
                                return false; // ออกจาก loop
                            }
                        } else {
                            // ถ้าไม่เข้าเงื่อนไข ให้ลบ line ออก
                            removeLine();
                        }
                    } else if (!isAddMore && thisDndType === currentDndType) {
                        // จัดการกับ commonFlexClasses
                        const rect = this.getBoundingClientRect();

                        if (mouseX >= rect.left && mouseX <= rect.right &&
                            mouseY >= rect.top && mouseY <= rect.bottom) {

                            const isTopHalf = mouseY < (rect.top + rect.height / 2);
                            updateLinePosition($this, isTopHalf, currentDndType);
                            lastHoveredElement = $this;
                            found = true;
                            return false; // ออกจาก loop
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
            const $selectedElements = $('[data-class="commonFlexClasses"].' + classSelection.split(' ')[0]);

            if (dndLine) {
                const $targetParent = dndLine.parent();
                const isTopHalf = dndLine.css('top') === '0px';

                if ($selectedElements.length && $targetParent.length) {
                    // บันทึกสถานะก่อนการเปลี่ยนแปลง
                    const oldState = JSON.parse(JSON.stringify(items));
                    const oldHtml = $('[data-js-component="DndComponent"]').html();

                    let result;
                    if ($targetParent.attr('data-class') === 'addMoreClasses') {
                        let parentTarget = $targetParent.closest("[data-class='panelWrapperClasses']");
                        const targetId = parentTarget.attr('dnd-id');
                        const sourceIds = $selectedElements.map(function () {
                            return $(this).attr('dnd-id');
                        }).get();

                        result = await operationQueue.enqueue(moveMultipleItems, sourceIds, targetId, $selectedElements.first().attr('dnd-type'));
                    } else {
                        const targetId = $targetParent.attr('dnd-id');
                        const sourceIds = $selectedElements.map(function () {
                            return $(this).attr('dnd-id');
                        }).get();

                        const position = isTopHalf ? 'top' : 'bottom';
                        result = await operationQueue.enqueue(moveMultipleItems, sourceIds, targetId, position);
                    }

                    if (result) {
                        // อัปเดต DOM
                        if ($targetParent.attr('data-class') === 'addMoreClasses') {
                            $targetParent.before($selectedElements);
                        } else if (isTopHalf) {
                            $targetParent.before($selectedElements);
                        } else {
                            $targetParent.after($selectedElements.get().reverse());
                        }

                        // บันทึกสถานะใหม่
                        const newState = JSON.parse(JSON.stringify(items));
                        const newHtml = $('[data-js-component="DndComponent"]').html();

                        // เพิ่มการกระทำลงใน undoManager
                        undoManager.add({
                            undo: function () {
                                items = oldState;
                                updateUIFromCache(oldHtml);
                                updateButtonStates();
                                cleanupUI(); // เพิ่มการเรียกใช้ cleanupUI ที่นี่
                            },
                            redo: function () {
                                items = newState;
                                updateUIFromCache(newHtml);
                                updateButtonStates();
                                cleanupUI(); // เพิ่มการเรียกใช้ cleanupUI ที่นี่
                            }
                        });

                    } else {
                        // ถ้าการดำเนินการไม่สำเร็จ ให้กลับไปใช้สถานะเดิม
                        items = oldState;
                        updateUIFromCache(oldHtml);
                    }

                    // อัปเดตสถานะปุ่ม undo/redo
                    updateButtonStates();
                }
                cleanupUI(); // เรียกใช้ cleanupUI หลังจากจัดการกับ dndLine
            }

            clone.remove();
            clone = null;
            $('#updateUI').trigger('click');
        }
        currentDndType = null;
        $currentTarget = null;
        $(document).off('mousemove', handleDragMove);
        cleanupUI(); // เรียกใช้ cleanupUI อีกครั้งเพื่อความแน่ใจ
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

    $(document).on('mousedown', function (e) {
        // หา element ที่มี [data-class="panelWrapperClasses"] ที่อยู่ใกล้จุดที่คลิกที่สุด
        var $target = $(e.target).closest('[data-class="panelWrapperClasses"]');

        // ถ้าไม่พบ element ที่ตรงเงื่อนไข หรือ คลิกโดนส่วนที่เป็น [data-class="commonFlexClasses"] ให้ return
        if (!$target.length || $(e.target).closest('[data-class="commonFlexClasses"]').length) return;

        if (e.which !== 1) return; // ทำงานเฉพาะเมื่อกดปุ่มซ้ายของเมาส์
        if ($(e.target).closest('#minimap, #minimap-slider').length) return; // ไม่เริ่ม drag ถ้าคลิกบน minimap

        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();

        $currentTarget = $target;
        currentDndType = $target.attr('dnd-type');

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
        var $selectableElements = $('[data-class="commonFlexClasses"], [data-class="panelWrapperClasses"]');
        var activeClass = classSelection;
        var $closestSelectableElement = $target.closest('[data-class="commonFlexClasses"], [data-class="panelWrapperClasses"]');
      
        if ($closestSelectableElement.length) {
            var targetDndType = $closestSelectableElement.attr('dnd-type');
            var $firstSelected = $selectableElements.filter('.' + activeClass.split(' ')[0]).first();
            var firstSelectedDndType = $firstSelected.length ? $firstSelected.attr('dnd-type') : null;
    
            if (!event.ctrlKey && !event.shiftKey) {
                $selectableElements.removeClass(activeClass);
                $closestSelectableElement.toggleClass(activeClass);
            }
            else if (event.ctrlKey) {
                if (targetDndType === firstSelectedDndType) {
                    $closestSelectableElement.toggleClass(activeClass);
                }
                else {
                    $selectableElements.removeClass(activeClass);
                    $closestSelectableElement.toggleClass(activeClass);
                }
            }
            else if (event.shiftKey) {
                if (targetDndType === firstSelectedDndType) {
                    var $lastActive = $selectableElements.filter('.' + activeClass.split(' ')[0]).last();
                    var startIndex = $selectableElements.index($lastActive);
                    var endIndex = $selectableElements.index($closestSelectableElement);
    
                    if (startIndex > endIndex) {
                        [startIndex, endIndex] = [endIndex, startIndex];
                    }
    
                    $selectableElements.slice(startIndex, endIndex + 1).each(function () {
                        if ($(this).attr('dnd-type') === targetDndType) {
                            $(this).addClass(activeClass);
                        }
                    });
                }
                else {
                    $selectableElements.removeClass(activeClass);
                    $closestSelectableElement.toggleClass(activeClass);
                }
            }
        } else {
            $selectableElements.removeClass(activeClass);
        }
    });
    /*
    * END: Multi Selection
    */
});