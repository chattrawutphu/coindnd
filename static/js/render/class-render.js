var test = " "

var classesModel = {
    containerClasses: "min-h-full h-full max-h-full p-1  overscroll-contain", //container mx-auto content-start

    commonFlexClasses() {
        const commonClasses = "relative justify-between flex border border-t-0 border-x-0 p-1 cursor-default";
        return `${commonClasses} dark:text-gray-300 text-gray-800 dark:border-gray-500`;
    },
    commonTextClasses() {
        const commonClasses = "me-2 pt-1";
        return `${commonClasses} dark:text-emerald-500 text-emerald-500`;
    },
    commonTitleClasses() {
        const commonClasses = "font-semibold font-medium text-sm me-2";
        return `${commonClasses} dark:text-indigo-400 text-indigo-500`;
    },

    leftPanelClasses() {
        const commonClasses = "col-span-1 mb-0 sm:mb-[2px] relative text-md content-start items-start border-l-4";
        return `${commonClasses} dark:bg-[#414b5a] bg-emerald-50 dark:border-l-indigo-400 border-l-indigo-500`;
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
    panelBgClasses() {
        const commonClasses = "relative flex pt-1 content-start gap-x-1 mx-2 cursor-pointer";
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
    inputContainerClasses: "w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap bg-gray-50 dark:text-gray-300 text-gray-800 text-sm rounded-lg block p-1.5 dark:bg-[#111827]",
  
    inputLabelClasses: "float-none lg:float-right pt-1.5 text-sm font-medium dark:text-gray-300 text-gray-800",
  
    inputGridClasses: "flex gap-2",
  
    inputFormWrapperClasses: "flex flex-col gap-y-1.5",
  
    inputContainerWrapperClasses: "w-16 text-balance",
  
    inputContainerContentClasses: "w-full lg:col-span-2",

    inputSmallTextXSClasses: "text-sm col-span-5 dark:text-gray-500 text-gray-800 left-0 -top-2",
};

//เพิ่ม class โดยอิงจาก class 
export default function applyClasses(data = classesModel, context = $('body')) {
    $('[class]', context).each(function () {
        const className = $(this).data('class');
        if (data[className]) $(this).addClass(data[className]);
    });
}