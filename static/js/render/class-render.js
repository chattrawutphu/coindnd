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
        const commonClasses = "col-span-3 sm:col-span-1 mb-0 sm:mb-[2px] relative text-md content-start items-start border-l-4";
        return `${commonClasses} dark:bg-gray-600 bg-emerald-50 dark:border-l-indigo-400 border-l-indigo-500`;
    },
    rightPanelClasses() {
        const commonClasses = "col-span-3 sm:col-span-2 mb-[2px] relative text-md content-start items-start ";
        return `${commonClasses} bg-gray-50 dark:bg-[#3a414b] dark:border-l-0 border-l-2 border-l-gray-150`;
    },

    panelWrapperClasses() {
        const commonClasses = "text-sm grid grid-cols-3 w-full shadow-md rounded-r-lg overflow-hidden";
        return `${commonClasses} dark:border-y-0 dark:text-gray-100 text-gray-900 `; //dark:shadow-indigo-500/20 shadow-indigo-500/20 
    },
    childrenPanelClasses() {
        const commonClasses = "ml-8 col-span-3 ";
        return `${commonClasses} `;
    },
    itemWrapperClasses: "TreeItem_Wrapper",
    panelBgClasses() {
        const commonClasses = "relative flex items-center gap-x-1 mx-2 cursor-pointer";
        return `${commonClasses} dark:opacity-50 opacity-30`;
    },
    iconClasses: "size-4",
    whenIconClasses: "size-4",
    whileIconClasses: "size-4",
    actionIconClasses: "size-4",

    addMoreClasses() {
        const commonClasses = "flex text-xs items-center gap-x-1 m-1 cursor-pointer opacity-50";
        return `${commonClasses} dark:text-gray-300 text-gray-800`;
    }
};



    //เพิ่ม class โดยอิงจาก data-class 
export default function applyClasses() {
    $('[data-class]').each(function () {
        var className = $(this).data('class');
        if (classesModel[className]) {
            $(this).addClass(classesModel[className]);
        }
    });
}