var classesModel = {
    containerClasses: "min-h-full h-full max-h-full p-1  overscroll-contain", //container mx-auto content-start

    commonFlexClasses() {
        const commonClasses = "relative justify-between content-center flex border border-t-0 border-x-0 p-1 cursor-default";
        return `${commonClasses} dark:text-gray-300 text-gray-800 dark:border-gray-500`;
    },
    commonTextClasses() {
        const commonClasses = "me-2";
        return `${commonClasses} dark:text-emerald-500 text-emerald-500`;
    },
    commonTitleClasses() {
        const commonClasses = "font-semibold text-xs me-2";
        return `${commonClasses} dark:text-indigo-400 text-indigo-500`;
    },

    leftPanelClasses() {
        const commonClasses = "col-span-1 mb-0 sm:mb-[2px] relative text-md content-start items-start border-l-4";
        return `${commonClasses} dark:bg-gray-600 bg-emerald-50 dark:border-l-indigo-400 border-l-indigo-500`;
    },
    rightPanelClasses() {
        const commonClasses = "col-span-2 mb-[2px] relative text-md content-start items-start ";
        return `${commonClasses} bg-gray-50 dark:bg-[#2B3544] dark:border-l-0 border-l-2 border-l-gray-150`;
    },

    panelWrapperClasses() {
        const commonClasses = "text-sm grid grid-cols-3 shadow-md min-w-[32rem]"; //rounded-r-lg
        return `${commonClasses} dark:border-y-0 dark:border-r-0  dark:border dark:border-l dark:border-gray-700 dark:text-gray-100 text-gray-900 `; //dark:shadow-indigo-500/20 shadow-indigo-500/20 
    },
    childrenPanelClasses() {
        const commonClasses = "ms-4 md:ms-8 col-span-3 ";
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
        const commonClasses = "flex text-xs items-center gap-x-1 m-1 cursor-pointer opacity-30";
        return `${commonClasses} dark:text-gray-300 text-gray-800`;
    },

    //Darkmode
    darkmodeContainerClasses: "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-1.5",
    
    //Property Input
    inputContainerClasses: "w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap bg-gray-50 border border-gray-300 dark:text-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",
  
    inputLabelClasses: "float-none lg:float-right text-sm font-medium dark:text-gray-300 text-gray-800",
  
    inputGridClasses: "grid grid-cols-3 gap-2",
  
    inputFormWrapperClasses: "flex flex-col gap-y-2",
  
    inputContainerWrapperClasses: "col-span-3 lg:col-span-1 self-center",
  
    inputContainerContentClasses: "col-span-3 lg:col-span-2"
};

//เพิ่ม class โดยอิงจาก data-class 
export default function applyClasses(data = classesModel, context = $('body')) {
    $('[data-class]', context).each(function () {
        const className = $(this).data('class');
        if (data[className]) $(this).addClass(data[className]);
    });
}