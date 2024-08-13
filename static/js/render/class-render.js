var classesModel = {
    containerClasses: "container mx-auto content-start",

    commonFlexClasses() {
        const commonClasses = "relative justify-between content-center flex border border-t-0 border-x-0 p-1 cursor-default";
        return `${commonClasses} dark:text-gray-300 text-gray-800 dark:border-gray-500`;
    },
    commonTextClasses() {
        const commonClasses = "mr-4";
        return `${commonClasses} dark:text-emerald-500 text-emerald-500`;
    },
    commonTitleClasses() {
        const commonClasses = "font-semibold text-xs mr-2";
        return `${commonClasses} dark:text-indigo-400 text-indigo-500`;
    },

    leftPanelClasses() {
        const commonClasses = "col-span-3 sm:col-span-1 relative text-md content-start items-start border-l-4";
        return `${commonClasses} dark:bg-gray-600 bg-emerald-50 dark:border-l-indigo-400 border-l-indigo-500`;
    },
    rightPanelClasses() {
        const commonClasses = "col-span-3 sm:col-span-2 relative text-md content-start items-start ";
        return `${commonClasses} dark:border-l-0 border-l-2 border-l-gray-150`;
    },

    panelWrapperClasses() {
        const commonClasses = "my-4 text-sm grid grid-cols-3 w-full shadow-md rounded-r-lg overflow-hidden";
        return `${commonClasses} dark:bg-[#3a414b] dark:border-y-0 dark:text-gray-100 dark:shadow-indigo-500/20  bg-gray-50 text-gray-900 shadow-indigo-500/20 `;
    },
    itemWrapperClasses: "TreeItem_Wrapper",
    whenPanelBgClasses() {
        const commonClasses = "relative flex items-center gap-x-1 mx-2 cursor-pointer";
        return `${commonClasses} dark:opacity-50 opacity-30`;
    },
    whilePanelBgClasses() {
        const commonClasses = "relative flex items-center gap-x-1 mx-2 cursor-pointer";
        return `${commonClasses} dark:opacity-50 opacity-30`;
    },
    actionPanelBgClasses() {
        const commonClasses = "relative flex items-center gap-x-1 mx-2 cursor-pointer";
        return `${commonClasses} dark:opacity-50 opacity-30`;
    },
    iconClasses: "size-4",
    whenIconClasses: "size-4",
    whileIconClasses: "size-4",
    actionIconClasses: "size-4",

    addMoreConditionClasses() {
        const commonClasses = "flex text-sm items-center gap-x-1 m-1 cursor-pointer opacity-50";
        return `${commonClasses} dark:text-gray-300 text-gray-800`;
    },

    addMoreActionClasses() {
        const commonClasses = "flex text-sm items-center gap-x-1 m-2 cursor-pointer  opacity-50";
        return `${commonClasses} dark:text-gray-300 text-gray-800`;
    },
};

$(document).ready(function () {

    //เพิ่ม class โดยอิงจาก data-class 
    $('[data-class]').each(function () {
        var className = $(this).data('class');
        if (classesModel[className]) {
            $(this).addClass(classesModel[className]);
        }
    });

});