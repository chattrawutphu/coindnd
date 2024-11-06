// items-manager.js
import { showAlert } from '/static/js/alert.js';

export class ItemsManager {
    constructor() {
        this.UndoManager = window.UndoManager;
        this.MAX_HISTORY = 50;
        this.undoManager = new UndoManager();
        this.undoManager.setLimit(this.MAX_HISTORY);
        this.items = [];
        
        // โหลดข้อมูลจาก localStorage ถ้ามี
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            this.items = JSON.parse(storedItems);
        }
    }

    // Core items management
    findItemById(id, itemList = this.items) {
        for (let item of itemList) {
            if (item.id === id) return item;
            if (item.children) {
                const found = this.findItemById(id, item.children);
                if (found) return found;
            }
        }
        return null;
    }

    findInAll(id, items = this.items) {
        for (const item of items) {
            if (item.id === id) return item;
            if (item.children && item.children.length) {
                const found = this.findInAll(id, item.children);
                if (found) return found;
            }
            if (item.conditions && item.conditions.length) {
                const found = this.findInAll(id, item.conditions);
                if (found) return found;
            }
            if (item.actions && item.actions.length) {
                const found = this.findInAll(id, item.actions);
                if (found) return found;
            }
        }
        return null;
    }

    findParentArray(id, items = this.items, parent = null) {
        for (const item of items) {
            if (item.id === id) return parent || items;
            if (item.children && item.children.length) {
                const found = this.findParentArray(id, item.children, item.children);
                if (found) return found;
            }
            if (item.conditions && item.conditions.length) {
                const found = this.findParentArray(id, item.conditions, item.conditions);
                if (found) return found;
            }
            if (item.actions && item.actions.length) {
                const found = this.findParentArray(id, item.actions, item.actions);
                if (found) return found;
            }
        }
        return null;
    }

    // Storage management
    saveToLocalStorage() {
        try {
            localStorage.setItem('items', JSON.stringify(this.items));
            showAlert("Data saved successfully!", "normal");
        } catch (error) {
            showAlert("Failed to save data. Please try again.", "normal");
        }
    }

    // History management
    updateButtonStates() {
        $('#undoBtn').prop('disabled', !this.undoManager.hasUndo());
        $('#redoBtn').prop('disabled', !this.undoManager.hasRedo());
    }

    getState() {
        return {
            state: JSON.parse(JSON.stringify(this.items)),
            html: $('[data-js-component="DndComponent"]').html(),
            scrollPosition: $('[data-js-component="DndComponent"]').scrollTop()
        };
    }

    applyState(state, html, scrollPosition) {
        this.items = JSON.parse(JSON.stringify(state));
        const $content = $('[data-js-component="DndComponent"]');
        $content.html(html);
        $content.scrollTop(scrollPosition);
    }

    addToHistory(oldState, newState) {
        this.undoManager.add({
            undo: () => {
                this.applyState(oldState.state, oldState.html, oldState.scrollPosition);
                this.updateButtonStates();
            },
            redo: () => {
                this.applyState(newState.state, newState.html, newState.scrollPosition);
                this.updateButtonStates();
            }
        });
        this.updateButtonStates();
    }

    // Business logic
    toggleDisabled(id) {
        const item = this.findItemById(id);
        if (item) {
            const oldState = this.getState();
            item.active = !item.active;
            const newState = this.getState();
            this.addToHistory(oldState, newState);
            return item.active;
        }
        return null;
    }

    toggleExpandCollapse(id) {
        const item = this.findItemById(id);
        if (item && (item.subtype === 'group' || (item.type === 'container' && item.subtype === 'if'))) {
            const oldState = this.getState();
            item.showChildren = !item.showChildren;
            const newState = this.getState();
            this.addToHistory(oldState, newState);
            return item.showChildren;
        }
        return null;
    }

    async moveMultipleItems(sourceIds, targetId, side) {
        const sourcesAndParents = sourceIds.map(id => ({
            source: this.findInAll(id),
            sourceArray: this.findParentArray(id)
        })).filter(item => item.source && item.sourceArray);

        const target = this.findInAll(targetId);
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
            targetArray = this.findParentArray(targetId);
        }

        if (!targetArray) return false;

        sourcesAndParents.forEach(({ source, sourceArray }) => {
            const sourceIndex = sourceArray.findIndex(item => item.id === source.id);
            sourceArray.splice(sourceIndex, 1);
        });

        if (side === 'condition' || side === 'action' || side === 'child') {
            targetArray.push(...sourcesAndParents.map(item => item.source));
        } else {
            const targetIndex = targetArray.findIndex(item => item.id === targetId);
            targetArray.splice(targetIndex + (side === "bottom" ? 1 : 0), 0, ...sourcesAndParents.map(item => item.source));
        }
        return true;
    }
}

export const itemsManager = new ItemsManager();