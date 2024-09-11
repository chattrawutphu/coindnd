var test = " "

var classesModel = {
    containerClasses: " p-1 flex relative select-none overscroll-contain", //container mx-auto content-start

    commonFlexClasses() {
        const commonClasses = "relative justify-between flex p-1 cursor-default";
        return `${commonClasses} dark:text-gray-300 text-gray-800`;
    },
    commonTextClasses() {
        const commonClasses = "me-2 pt-1";
        return `${commonClasses} dark:text-emerald-500 text-emerald-500`;
    },
    commonTitleClasses() {
        const commonClasses = "font-semibold text-sm me-2";
        return `${commonClasses} dark:text-indigo-400 text-indigo-500`;
    },
    
    leftPanelClasses() {
        const commonClasses = "col-[span_12/span_12] rounded-l-[3px] my-[2px] relative text-md content-start items-start border-l-4 ";
        return `${commonClasses} dark:bg-[#414b5a] bg-emerald-50 dark:border-l-indigo-400 border-l-indigo-500`;
    },
    rightPanelClasses() {
        const commonClasses = "col-[span_18/span_18] my-[2px] rounded-r-[3px] relative text-md content-start items-start ";
        return `${commonClasses} bg-gray-50 dark:bg-[#2B3544] dark:border-l-0 border-l-2 border-l-gray-150`;
    },

    childrenPanelClasses() {
        const commonClasses = "ms-[20px] md:ms-8 col-[span_30/span_30]";
        return `${commonClasses} `;
    },
    panelBgClasses() {
        const commonClasses = "relative flex pt-1 content-start gap-x-1 px-0.5";
        return `${commonClasses} dark:opacity-50 opacity-30`;
    },

    expandButtonClasses() {
        const commonClasses = "absolute top-1 p-1 -left-[24px] text-gray-300 cursor-pointer";
        return `${commonClasses}`;
    },
    
    iconClasses: "size-4",
    whenIconClasses: "size-4",
    whileIconClasses: "size-4",
    actionIconClasses: "size-4",

    addMoreClasses() {
        const commonClasses = "flex flex-col items-start justify-start text-xs m-1 cursor-pointer h-full max-h-16";
        return `${commonClasses} dark:text-gray-500 text-gray-800`;
    },

    //Darkmode
    darkmodeContainerClasses: "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-1.5",
    
    //Property Input
    inputContainerClasses: "w-full max-w-full  text-ellipsis whitespace-nowrap bg-gray-50 dark:text-gray-300 text-gray-800 text-sm rounded-lg block p-1.5 dark:bg-[#111827]",
  
    inputLabelClasses: "float-none lg:float-right pt-1.5 text-sm font-medium dark:text-gray-300 text-gray-800",
  
    inputGridClasses: "flex gap-2",
  
    inputFormWrapperClasses: "flex flex-col gap-y-1.5",
  
    inputContainerWrapperClasses: "w-16 text-balance",
  
    inputContainerContentClasses: "w-full lg:col-span-2",

    inputSmallTextXSClasses: "text-sm col-span-5 dark:text-gray-500 text-gray-800 left-0 -top-2",
};

//เพิ่ม class โดยอิงจาก class 
export default function applyClasses(data = classesModel, context = $('body')) {
    $('[data-class]', context).each(function () {
        const className = $(this).data('class');
        if (data[className]) $(this).addClass(data[className]);
    });
}