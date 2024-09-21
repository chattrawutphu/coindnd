import {
    RemoveBorderLastcommonFlexClasses, applyGroupBackgroundColorToNonGroup, toggleExpandButtonVisibility
    , updateUIheight, appendEventButton
} from '/static/js/global-script.js';

$(document).ready(function () {
    const UndoManager = window.UndoManager;
    const MAX_HISTORY = 50;
    const undoManager = new UndoManager();
    undoManager.setLimit(MAX_HISTORY);

    let items = [];

    function updateUIFromCache(html, scrollPosition) {
        const $content = $('[data-js-component="DndComponent"]');
        $content.html(html);
        $content.scrollTop(scrollPosition);
        cleanupUI(); // เรียกใช้ cleanupUI หลังจากอัปเดต HTML
    }
    function updateButtonStates() {
        $('#undoBtn').prop('disabled', !undoManager.hasUndo());
        $('#redoBtn').prop('disabled', !undoManager.hasRedo());
    }

    // Modify the undo and redo button click handlers
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

    // Modify the keyboard shortcut handlers
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

    function saveToLocalStorage() {
        try {
            localStorage.setItem('items', JSON.stringify(items));
            console.log("Successfully saved items to localStorage");
            // Optionally, you can show a success message to the user
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Failed to save items to localStorage:", error);
            // Optionally, you can show an error message to the user
            alert("Failed to save data. Please try again.");
        }
    }

    // Add event listener for the save button
    $('#saveBtn').on('click', saveToLocalStorage);

    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
    }

    function findItemById(id, itemList = items) {
        for (let item of itemList) {
            if (item.id === id) return item;
            if (item.children) {
                const found = findItemById(id, item.children);
                if (found) return found;
            }
        }
        return null;
    }

    function toggleExpandCollapse(id) {
        const item = findItemById(id);
        if (item && item.subtype === 'group') {
            const oldState = JSON.parse(JSON.stringify(items));
            const oldHtml = $('[data-js-component="DndComponent"]').html();
            const oldScrollPosition = $('[data-js-component="DndComponent"]').scrollTop();

            item.showChildren = !item.showChildren;

            // อัปเดต UI
            const $parentPanelWrapper = $(`[data-class="panelWrapperClasses"][dnd-id="${id}"]`);
            const $siblingsPanelWrappers = $parentPanelWrapper.find('> [data-class="panelWrapperClasses"]');
            const $expandButton = $parentPanelWrapper.find('[data-class="expandButtonClasses"]');

            $siblingsPanelWrappers.toggleClass('hidden');
            $expandButton.find('.expand-icon').toggleClass('hidden');
            $expandButton.find('.collapse-icon').toggleClass('hidden');

            // ใช้ setTimeout เพื่อให้การอัปเดต UI เสร็จสิ้นก่อนที่จะวัดความสูงใหม่
            updateUIheight();

            const newState = JSON.parse(JSON.stringify(items));
            const newHtml = $('[data-js-component="DndComponent"]').html();
            const newScrollPosition = $('[data-js-component="DndComponent"]').scrollTop();

            undoManager.add({
                undo: function () {
                    items = JSON.parse(JSON.stringify(oldState));
                    updateUIFromCache(oldHtml, oldScrollPosition);
                    updateButtonStates();
                    cleanupUI();
                },
                redo: function () {
                    items = JSON.parse(JSON.stringify(newState));
                    updateUIFromCache(newHtml, newScrollPosition);
                    updateButtonStates();
                    cleanupUI();
                }
            });

            updateButtonStates();
            cleanupUI();
            // รอ 100ms สำหรับการเลื่อนแบบสมูท
        }
    }

    $(document).on('click', '[data-class="expandButtonClasses"]', function (e) {
        e.preventDefault();
        const id = $(this).closest('[data-class="panelWrapperClasses"]').attr('dnd-id');
        toggleExpandCollapse(id);
    });


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
        } else if (side === 'child') {
            if (!target.children) target.children = [];
            targetArray = target.children;
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
        if (side === 'condition' || side === 'action' || side === 'child') {
            targetArray.push(...sourcesAndParents.map(item => item.source));
        } else {
            const targetIndex = targetArray.findIndex(item => item.id === targetId);
            targetArray.splice(targetIndex + (side === "bottom" ? 1 : 0), 0, ...sourcesAndParents.map(item => item.source));
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
    const classSelection = 'select-active ring-1 ring-indigo-600 bg-indigo-600/40';
    const effectClasses = 'ring-1 ring-indigo-600 bg-indigo-600/40';
    const indent = 48;
    let isHandlingDragMove = false;

    const createDndLine = _.memoize((isTop, dndType, isLeftSide = true) => {
        const color = dndType === 'action' ? '#4ade80' : (dndType === 'container' ? '#38bdf8' : '#4ade80');
        const width = (dndType === 'container' && !isLeftSide && !isTop) ? `calc(100% - ${indent}px)` : '100%';
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

        /*if (dndType === 'container' && !isLeftSide) {
            $line.addClass('isDropAsChild');
        }*/

        return $line;
    }, (...args) => args.join('|'));

    function updateLinePosition($element, isTopHalf, dndType, mouseX) {
        let $targetElement = $element;
        let isLeftSide = true;

        if (dndType === 'container') {
            const $panelContainer = $element.find('[data-class="panelContainerClasses"]').first();
            if ($panelContainer.length) {
                $targetElement = $panelContainer;
            }

            const rect = $element[0].getBoundingClientRect();
            isLeftSide = (mouseX - rect.left) < (rect.width * 0.5);
        }

        if (!dndLine || dndLine.data('dndType') !== dndType || dndLine.data('isLeftSide') !== isLeftSide || dndLine.data('isTopHalf') !== isTopHalf) {
            if (dndLine) dndLine.remove();
            dndLine = createDndLine(isTopHalf, dndType, isLeftSide);
            dndLine.data('dndType', dndType);
            $targetElement.append(dndLine);
        } else if (dndLine.parent()[0] !== $targetElement[0]) {
            dndLine.detach().appendTo($targetElement);
        }

        const isVariableContainer = $element.attr('dnd-subtype') === 'variable';
        const isMessageContainer = $element.attr('dnd-subtype') === 'message';
        /*const isVariableDndLine = clone.attr('dnd-subtype') === 'variable';
        const isMessageDndLine = clone.attr('dnd-subtype') === 'message';*/

        const cssProps = {
            top: isTopHalf ? 0 : 'auto',
            bottom: isTopHalf ? 'auto' : 0,
            left: isLeftSide ? 0 : 'auto',
            right: 'auto',
            width: '100%'
        };

        if (dndType === 'container' && !isLeftSide && !isTopHalf) {
            dndLine.addClass('isDropAsChild');
            cssProps.width = `calc(100% - ${indent}px)`;
            cssProps.right = 0;
        }

        if (isVariableContainer || isMessageContainer) {
            dndLine.removeClass('isDropAsChild');
            cssProps.width = '100%';
        }
        dndLine.css(cssProps);
    }

    function cleanupUI() {
        removeLine();
        appendEventButton();
        clearCommandSelection();
        RemoveBorderLastcommonFlexClasses();
        updateUIheight();

        //เพิ่มระยะให้ message-panel variable-panel
        $('.single-panel').each(function () {
            var $container = $(this).find('[data-class="panelContainerClasses"]');
            $container.css({ 'padding-top': '', 'padding-bottom': '' });

            if ($(this).prevAll('.single-panel').length === 0) {
                $container.css('padding-top', '8px');
            }
            if ($(this).nextAll('.single-panel').length === 0) {
                $container.css('padding-bottom', '8px');
            }
        });

        countNumberPanels();
        applyGroupBackgroundColorToNonGroup();
        toggleExpandButtonVisibility();
    }

    function removeLine() {
        if (dndLine) {
            dndLine.remove();
            dndLine = null;
        }
        $('.drop-target-line').remove();
        lastHoveredElement = null;
    }

    function clearCommandSelection() {
        $('[data-class="commonFlexClasses"]').removeClass(classSelection);
        $('[data-class="panelWrapperClasses"]')
            .removeClass("select-active")
            .find('[data-class="panelContainerClasses"]').removeClass(effectClasses);
    }

    function handleDragMove(e) {
        if (isHandlingDragMove) return;
        isHandlingDragMove = true;

        requestAnimationFrame(() => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            if (!clone) {
                isHandlingDragMove = false;
                return;
            }

            clone.css({
                left: mouseX - clone.outerWidth() / 2,
                top: mouseY - clone.outerHeight() / 2
            });

            if (isScrolling) {
                isHandlingDragMove = false;
                return;
            }

            let found = false;
            $('[data-class="commonFlexClasses"], [data-class="addMoreClasses"], [data-class="panelWrapperClasses"]')
                .not(clone)
                .not(clone.find('*'))
                .each(function () {
                    if (found) return false;

                    const $this = $(this);
                    if ($this.parents('[data-class="commonFlexClasses"], [data-class="addMoreClasses"], [data-class="panelWrapperClasses"]')
                        .filter('.select-active').length > 0 || $this.hasClass('select-active')) {
                        return true;
                    }

                    const thisDndType = $this.attr('dnd-type');
                    const elementClass = $this.attr('data-class');
                    const rect = this.getBoundingClientRect();

                    if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) return true;

                    switch (elementClass) {
                        case 'addMoreClasses':
                            if ($this.parent().children().length !== 1 || $this.parent().children()[0] !== $this[0]) return true;
                            if ((currentDndType === 'condition' && thisDndType === 'condition') ||
                                (currentDndType === 'action' && thisDndType === 'action')) {
                                updateLinePosition($this, true, currentDndType, mouseX);
                                lastHoveredElement = $this;
                                found = true;
                            }
                            break;

                        case 'panelWrapperClasses':
                            if (currentDndType === 'container' && thisDndType === 'container') {
                                const topDistance = mouseY - rect.top;
                                const bottomDistance = rect.bottom - mouseY;
                                if (topDistance <= 64 || bottomDistance <= 64) {
                                    const $hoveredPanels = $('[data-class="panelWrapperClasses"]').filter(function () {
                                        const panelRect = this.getBoundingClientRect();
                                        return mouseX >= panelRect.left && mouseX <= panelRect.right &&
                                            mouseY >= panelRect.top && mouseY <= panelRect.bottom &&
                                            (mouseY - panelRect.top <= 64 || panelRect.bottom - mouseY <= 64);
                                    });
                                    if ($hoveredPanels.length > 0 && $hoveredPanels.last()[0] === this) {
                                        const isTopHalf = mouseY < (rect.top + rect.height / 2);
                                        updateLinePosition($this, isTopHalf, currentDndType, mouseX);
                                        lastHoveredElement = $this;
                                        found = true;
                                    }
                                } else {
                                    removeLine();
                                }
                            }
                            break;

                        default: // commonFlexClasses
                            if (thisDndType === currentDndType) {
                                const isTopHalf = mouseY < (rect.top + rect.height / 2);
                                updateLinePosition($this, isTopHalf, currentDndType, mouseX);
                                lastHoveredElement = $this;
                                found = true;
                            }
                            break;
                    }
                });

            if (!found && lastHoveredElement) {
                const lastRect = lastHoveredElement[0].getBoundingClientRect();
                const horizontalDistance = Math.abs(mouseX - (lastRect.left + lastRect.width / 2));
                const verticalDistance = Math.abs(mouseY - (lastRect.top + lastRect.height / 2));

                if (horizontalDistance > 192 || verticalDistance > 96) {
                    removeLine();
                } else {
                    updateLinePosition(lastHoveredElement, dndLine ? dndLine.css('top') === '0px' : true, currentDndType, mouseX);
                }
            }

            isHandlingDragMove = false;
        });
    }
    
    function startDragging(e) {
        const targetOffset = $currentTarget.offset();
        const originalWidth = $currentTarget.outerWidth();
        const originalHeight = $currentTarget.outerHeight();

        const newWidth = 400;//Math.min(originalWidth * 0.7, 400);
        const newHeight = 75;//Math.min(originalHeight * 0.7, 150);

        const activeClass = classSelection;
        if (!e.shiftKey && !e.ctrlKey) {
            if (!$currentTarget.hasClass("select-active")) {
                $('[data-class="commonFlexClasses"]').removeClass(activeClass);
                $('[data-class="panelWrapperClasses"]')
                    .removeClass("select-active")
                    .find('[data-class="panelContainerClasses"]').removeClass(effectClasses);
            }

            if ($currentTarget.attr('data-class') === "panelWrapperClasses") {
                $currentTarget.addClass("select-active")
                    .find('[data-class="panelContainerClasses"]').addClass(effectClasses);
            } else {
                $currentTarget.addClass(activeClass);
            }
        }

        const activeCount = $currentTarget.attr('data-class') === "panelWrapperClasses"
            ? $('[data-class="panelWrapperClasses"].' + activeClass.split(' ')[0]).length
            : $('[data-class="commonFlexClasses"].' + activeClass.split(' ')[0]).length;

        clone = $('<div>')
            .attr({
                'id': 'draganddropSection',
                'dnd-type': currentDndType,
                'dnd-id': $currentTarget.attr('dnd-id'),
                'dnd-subtype': $currentTarget.attr('dnd-subtype')
            })
            .addClass('clone-container relative')
            .css({
                position: 'fixed',
                'pointer-events': 'none',
                'z-index': 1000,
                width: newWidth,
                height: newHeight,
                left: e.clientX - newWidth / 2,
                top: e.clientY - newHeight / 2,
            })
            .append($('<div>')
                .attr('role', 'status')
                .addClass('max-w-sm animate-pulse p-2')
                .append(
                    $('<div>').addClass('h-2 bg-zinc-100 rounded-full dark:bg-zinc-700 w-48 mb-2'),
                    $('<div>').addClass('h-2 bg-zinc-100 rounded-full dark:bg-zinc-700 max-w-[360px] mb-2'),
                    $('<div>').addClass('h-2 bg-zinc-100 rounded-full dark:bg-zinc-700 mb-2.5'),
                    $('<div>').addClass('h-2 bg-zinc-100 rounded-full dark:bg-zinc-700 max-w-[330px] mb-2')
                )
            )
            .appendTo('body');

        if (activeCount > 1) {
            $('<div>')
                .addClass('absolute inline-flex items-center justify-center w-6 h-6 text-sm text-white bg-red-500 rounded-full -top-1 -right-1')
                .text(activeCount)
                .appendTo(clone);
        }

        const clonedElement = $currentTarget.clone()
            .addClass('opacity-0')
            .css({
                width: originalWidth,
                height: originalHeight,
                transform: `scale(${newWidth / originalWidth}, ${newHeight / originalHeight})`,
                'transform-origin': 'top left'
            })
            .removeAttr('data-class')
            .removeClass(activeClass)
            .find('[data-class="commonFlexClasses"]').removeAttr('data-class').end();

        if ($currentTarget.attr('data-class') === "panelWrapperClasses") {
            clonedElement.find('[data-class="panelWrapperClasses"]').removeAttr('data-class');
        }

        clonedElement.appendTo(clone);

        $('[data-class="addEventBuntton"]').toggleClass('hidden');
        updateUIheight();

        handleDragMove(e);
    }

    function countNumberPanels() {
        $('[data-class="numberPanelClasses"]').each(function (index) {
            $(this).text(index + 1);
        });
    }

    async function stopDragging(e) {
        isDragging = false;
        if (clone) {
            const $selectedElements = $('[data-class="commonFlexClasses"], [data-class="panelWrapperClasses"]')
                .filter('.' + classSelection.split(' ')[0])
                .filter(function () {
                    return $(this).parents('[data-class="commonFlexClasses"], [data-class="panelWrapperClasses"]')
                        .filter('.' + classSelection.split(' ')[0]).length === 0;
                });
            if (dndLine) {
                let $targetParent = dndLine.parent();
                if ($targetParent.attr('data-class') !== 'addMoreClasses') {
                    if ($targetParent.closest('[data-class="commonFlexClasses"]').length) {
                        $targetParent = $targetParent.closest('[data-class="commonFlexClasses"]');
                    }
                    else if ($targetParent.closest('[data-class="panelWrapperClasses"]').length) {
                        $targetParent = $targetParent.closest('[data-class="panelWrapperClasses"]');
                    }
                }
                const isTopHalf = dndLine.css('top') === '0px';
                if ($selectedElements.length && $targetParent.length) {
                    // บันทึกสถานะก่อนการเปลี่ยนแปลง
                    const oldState = JSON.parse(JSON.stringify(items));
                    const oldHtml = $('[data-js-component="DndComponent"]').html();
                    const oldScrollPosition = $('[data-js-component="DndComponent"]').scrollTop();
                    let result;
                    if ($targetParent.attr('data-class') === 'addMoreClasses') {
                        let parentTarget = $targetParent.closest("[data-class='panelWrapperClasses']");
                        const targetId = parentTarget.attr('dnd-id');
                        const sourceIds = $selectedElements.map(function () {
                            return $(this).attr('dnd-id');
                        }).get();
                        result = await operationQueue.enqueue(moveMultipleItems, sourceIds, targetId, $selectedElements.first().attr('dnd-type'));
                    }
                    else if ($targetParent.attr('dnd-type') === 'container') {
                        const targetId = $targetParent.attr('dnd-id');
                        const sourceIds = $selectedElements.map(function () {
                            return $(this).attr('dnd-id');
                        }).get();
                        const position = isTopHalf ? 'top' : 'bottom';

                        // หา marginClass จาก $targetParent (ส่วนนี้ยังคงเหมือนเดิม)
                        const marginClass = $targetParent.hasClass('ml-section')
                            ? $targetParent
                            : $targetParent.find('.ml-section').first();

                        // ดึง margin-left value จาก $targetParent
                        const mlClass = marginClass.attr('class').split(' ').find(cls => cls.match(/^ml-\[\d+px\]$/));
                        const mlValue = mlClass ? parseInt(mlClass.match(/\d+/)[0]) : 0;

                        // ปรับ ml-[ตัวเลขpx] class ของ selectedElements
                        $selectedElements.each(function () {
                            // ค้นหา $elementMargin (ไม่รวม data-class="lineAreaClasses")
                            const $elementMargin = $(this).find('.ml-section')
                                .add($(this).filter('.ml-section'))
                                .filter(function () {
                                    return $(this).attr('data-class') !== 'lineAreaClasses';
                                })
                                .first();

                            // ค้นหา $elementMarginChildren (รวม data-class="lineAreaClasses" แต่ไม่รวม $elementMargin)
                            const $elementMarginChildren = $(this).find('.ml-section').not($elementMargin);

                            if ($elementMargin.length) {
                                // หา ml-[ตัวเลขpx] class ปัจจุบันของ $elementMargin
                                const currentMlClass = $elementMargin.attr('class').split(' ').find(cls => cls.match(/^ml-\[\d+px\]$/));
                                const currentMlValue = currentMlClass ? parseInt(currentMlClass.match(/\d+/)[0]) : 0;

                                // ลบ ml-[ตัวเลขpx] class เดิมของ $elementMargin (ถ้ามี)
                                if (currentMlClass) {
                                    $elementMargin.removeClass(currentMlClass);
                                }

                                // คำนวณค่า margin ใหม่สำหรับ parent
                                var isTrue = dndLine.hasClass("isDropAsChild");
                                console.log(isTrue);
                                const newMlValue = mlValue + (dndLine.hasClass("isDropAsChild") ? indent : 0);

                                // เพิ่ม ml-[ตัวเลขpx] class ใหม่สำหรับ parent
                                $elementMargin.addClass(`ml-[${newMlValue}px]`);

                                // คำนวณการเปลี่ยนแปลงของ margin
                                const marginChange = newMlValue - currentMlValue;

                                console.log(`Parent margin changed by: ${marginChange}px`);

                                // ปรับปรุง margin ของ children elements
                                $elementMarginChildren.each(function () {
                                    const $item = $(this);
                                    const currentMlChildClass = $item.attr('class').split(' ').find(cls => cls.match(/^ml-\[\d+px\]$/));
                                    const currentMlChildValue = currentMlChildClass ? parseInt(currentMlChildClass.match(/\d+/)[0]) : 0;

                                    if (currentMlChildClass) {
                                        $item.removeClass(currentMlChildClass);
                                    }

                                    // ปรับ margin ของ child โดยเพิ่มค่า marginChange
                                    const newMlChildValue = currentMlChildValue + marginChange;

                                    $item.addClass(`ml-[${newMlChildValue}px]`);

                                    console.log(`Child margin adjusted from ${currentMlChildValue}px to ${newMlChildValue}px (change: ${marginChange}px)`);
                                });
                            }
                        });
                        if (dndLine.hasClass("isDropAsChild")) {
                            result = await operationQueue.enqueue(moveMultipleItems, sourceIds, targetId, "child");
                        }
                        else {
                            result = await operationQueue.enqueue(moveMultipleItems, sourceIds, targetId, position);
                        }

                    }

                    else {
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
                        }
                        else if (dndLine.hasClass("isDropAsChild")) {
                            $targetParent.append($selectedElements);
                        }
                        else if (isTopHalf) {
                            $targetParent.before($selectedElements);
                        } else {
                            $targetParent.after($selectedElements);//.get().reverse());
                        }
                        // บันทึกสถานะใหม่
                        const newState = JSON.parse(JSON.stringify(items));
                        const newHtml = $('[data-js-component="DndComponent"]').html();
                        const newScrollPosition = $('[data-js-component="DndComponent"]').scrollTop();
                        // เพิ่มการกระทำลงใน undoManager
                        undoManager.add({
                            undo: function () {
                                items = oldState;
                                updateUIFromCache(oldHtml, oldScrollPosition);
                                updateButtonStates();
                                cleanupUI();
                            },
                            redo: function () {
                                items = newState;
                                updateUIFromCache(newHtml, newScrollPosition);
                                updateButtonStates();
                                cleanupUI();
                            }
                        });
                    } else {
                        // ถ้าการดำเนินการไม่สำเร็จ ให้กลับไปใช้สถานะเดิม
                        items = oldState;
                        updateUIFromCache(oldHtml, oldScrollPosition);
                    }
                    // อัปเดตสถานะปุ่ม undo/redo
                    updateButtonStates();
                }
                cleanupUI();
            }
            $('[data-class="addEventBuntton"]').toggleClass('hidden');
            clone.remove();
            clone = null;
            $('#updateUI').trigger('click');
        }
        currentDndType = null;
        $currentTarget = null;
        $(document).off('mousemove', handleDragMove);
        cleanupUI();
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
    $(document).on('mousedown', function (event) {
        if (event.which === 1) {
            const $target = $(event.target);
            const $selectableElements = $('[data-class="commonFlexClasses"], [data-class="panelWrapperClasses"]');
            const activeClass = 'select-active';

            // ตรวจสอบ expandButtonClasses ก่อน
            if ($target.attr('data-class') === 'expandButtonClasses' || $target.closest('[data-class="expandButtonClasses"]').length) {
                return;
            }

            if ($target.attr('data-js-component') === 'DndMinimapComponent' || $target.closest('[data-js-component="DndMinimapComponent"]').length) {
                return;
            }

            if ($target.is('input, label, select') || $target.closest('label').length) {
                return;
            }

            if (true) { //$target.attr('data-js-component') === 'DndComponent' || $target.closest('[data-js-component="DndComponent"]').length
                const $closestSelectableElement = $target.closest('[data-class="commonFlexClasses"], [data-class="panelWrapperClasses"]');

                // ตรวจสอบเพิ่มเติมสำหรับ panelWrapperClasses
                if ($closestSelectableElement.attr('data-class') === 'panelWrapperClasses') {
                    const $panelContainer = $closestSelectableElement.find('[data-class="panelContainerClasses"]');
                    if (!$panelContainer.is($target) && !$.contains($panelContainer[0], $target[0])) {
                        clearCommandSelection();
                        return;
                    }
                }

                function updateEffects($element, add) {
                    if ($element.attr('data-class') === 'panelWrapperClasses') {
                        const $panelContainer = $element.find('[data-class="panelContainerClasses"]');
                        if (add) {
                            $panelContainer.addClass(effectClasses);
                        } else {
                            $panelContainer.removeClass(effectClasses);
                        }
                    } else {
                        if (add) {
                            $element.addClass(effectClasses);
                        } else {
                            $element.removeClass(effectClasses);
                        }
                    }
                }

                function toggleActiveAndEffects($element) {
                    const isActive = $element.hasClass(activeClass);
                    $element.toggleClass(activeClass);
                    updateEffects($element, !isActive);
                }

                if (!$closestSelectableElement.length) {
                    $selectableElements.removeClass(activeClass);
                    $selectableElements.each(function () {
                        updateEffects($(this), false);
                    });
                    return;
                }

                const targetDndType = $closestSelectableElement.attr('dnd-type');
                const elementClass = $closestSelectableElement.attr('data-class');
                const $firstSelected = $selectableElements.filter('.' + activeClass).first();
                const firstSelectedDndType = $firstSelected.length ? $firstSelected.attr('dnd-type') : null;

                if (!event.ctrlKey && !event.shiftKey) {
                    if (!$closestSelectableElement.hasClass(activeClass)) {
                        $selectableElements.removeClass(activeClass);
                        $selectableElements.each(function () {
                            updateEffects($(this), false);
                        });
                        toggleActiveAndEffects($closestSelectableElement);
                    }
                } else if (event.ctrlKey) {
                    if (targetDndType === firstSelectedDndType) {
                        toggleActiveAndEffects($closestSelectableElement);
                    } else {
                        $selectableElements.removeClass(activeClass);
                        $selectableElements.each(function () {
                            updateEffects($(this), false);
                        });
                        toggleActiveAndEffects($closestSelectableElement);
                    }
                } else if (event.shiftKey) {
                    if (elementClass === 'panelWrapperClasses') {
                        const $activeParent = $closestSelectableElement.parents('[data-class="panelWrapperClasses"].' + activeClass).first();

                        if ($activeParent.length) {
                            const $relevantElements = $activeParent.find('[data-class="panelWrapperClasses"]').add($activeParent);
                            const startIndex = $relevantElements.index($activeParent);
                            const endIndex = $relevantElements.index($closestSelectableElement);

                            $relevantElements.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).each(function () {
                                $(this).addClass(activeClass);
                                updateEffects($(this), true);
                            });
                        } else {
                            const $siblings = $closestSelectableElement.siblings('[data-class="panelWrapperClasses"]').add($closestSelectableElement);
                            const $activeElement = $siblings.filter('.' + activeClass).first();

                            if ($activeElement.length) {
                                const startIndex = $siblings.index($activeElement);
                                const endIndex = $siblings.index($closestSelectableElement);

                                $siblings.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).each(function () {
                                    $(this).addClass(activeClass);
                                    updateEffects($(this), true);
                                });
                            } else {
                                toggleActiveAndEffects($closestSelectableElement);
                            }
                        }
                    } else {
                        if (targetDndType === firstSelectedDndType) {
                            const $lastActive = $selectableElements.filter('.' + activeClass).last();
                            let startIndex = $selectableElements.index($lastActive);
                            let endIndex = $selectableElements.index($closestSelectableElement);

                            if (startIndex > endIndex) {
                                [startIndex, endIndex] = [endIndex, startIndex];
                            }

                            $selectableElements.slice(startIndex, endIndex + 1).each(function () {
                                if ($(this).attr('dnd-type') === targetDndType) {
                                    $(this).addClass(activeClass);
                                    updateEffects($(this), true);
                                }
                            });
                        } else {
                            $selectableElements.removeClass(activeClass);
                            $selectableElements.each(function () {
                                updateEffects($(this), false);
                            });
                            toggleActiveAndEffects($closestSelectableElement);
                        }
                    }
                }
            }
        }
    });

    $(document).on('keydown', function (event) {
        if (event.key === "Escape" || event.keyCode === 27) {
            if (dndLine || clone) {
                if (dndLine) {
                    dndLine.remove();
                    dndLine = null;
                }
                if (clone) {
                    clone.remove();
                    clone = null;
                }

                // รีเซ็ตตัวแปรที่เกี่ยวข้องกับการลาก
                isDragging = false;
                currentDndType = null;
                $currentTarget = null;

                // ลบ event listener ที่อาจถูกเพิ่มระหว่างการลาก
                $(document).off('mousemove', handleDragMove);

                // เรียกใช้ฟังก์ชัน cleanup
                cleanupUI();
            }
            else if ($('.select-active').length > 0) {
                clearCommandSelection();
            }

            // แยกเงื่อนไขสำหรับการจัดการกับ line และ clone

        }
    });
    /*
    * END: Multi Selection
    */
});