var classesModel = {
    containerClasses: "container mx-auto content-start",

    commonFlexClasses() {
        const commonClasses = "relative justify-between content-center flex border border-t-0 border-x-0 p-1 cursor-default";
        return `${commonClasses} dark:text-gray-300 text-gray-800 dark:border-gray-400`;
    },
    commonTextClasses() {
        const commonClasses = "mr-4";
        return `${commonClasses} dark:text-emerald-300 text-emerald-500`;
    },
    commonTitleClasses() {
        const commonClasses = "font-semibold text-xs mr-2";
        return `${commonClasses} dark:text-indigo-300 text-indigo-500`;
    },

    leftPanelClasses() {
        const commonClasses = "basis-1/3 relative text-md content-start items-start";
        return `${commonClasses} dark:bg-gray-500 bg-emerald-50`;
    },
    rightPanelClasses() {
        const commonClasses = "basis-2/3 relative text-md content-start items-start ";
        return `${commonClasses} dark:border-l-0 border-l-2 border-l-gray-150`;
    },

    panelWrapperClasses() {
        const commonClasses = "my-4 text-sm flex flex-row w-full shadow-md border border-l-4 rounded-r-lg";
        return `${commonClasses} dark:bg-gray-600 dark:border-y-0  dark:border-r-0 dark:text-gray-100 dark:shadow-indigo-50/20 dark:border-l-indigo-400 bg-gray-50 text-gray-900 shadow-indigo-500/20 border-l-indigo-500`;
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
};

var templates = {
    whenTemplate: {
        commonTextClasses: "text-gray-700",
        iconClasses: "whenIconClasses",
        iconPath: "M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z",
        title: "When:",
        condition: "BTCUSDT <= 40000$",
        panelBgClasses: "whenPanelBgClasses",
        panelIconPath: "M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    },

    whileTemplate: {
        commonTextClasses: "text-gray-700",
        iconClasses: "whileIconClasses",
        iconPath: "M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z",
        title: "While:",
        condition: "BTCUSDT <= 40000$",
        panelBgClasses: "whilePanelBgClasses",
        panelIconPath: "M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    },
    actionTemplate: {
        commonTextClasses: "text-gray-700",
        iconClasses: "actionIconClasses",
        iconPath: "M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z",
        title: "Action:",
        condition: "BTCUSDT <= 40000$",
        panelBgClasses: "actionPanelBgClasses",
        panelIconPath: "M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    }
}

$(document).ready(function () {

    //เพิ่ม class โดยอิงจาก data-class 
    $('[data-class]').each(function () {
        var className = $(this).data('class');
        if (classesModel[className]) {
            $(this).addClass(classesModel[className]);
        }
    });

    //เพิ่ม component โดยอิงจาก data-component
    $('[data-component]').each(function () {
        var $el = $(this);
        var componentFile = '/static/components/' + $el.data('component') + '.html';
        var templateName = $el.data('template');
        var templateData = templates[templateName] || {};

        $.get(componentFile).done(function (data) {
            $el.html(data);

            $el.find('[data-classblind]').each(function () {
                var classblindName = $(this).data('classblind');
                if (templateData[classblindName]) {
                    $(this).attr('data-class', templateData[classblindName]);
                }
            });

            $el.find('[data-class]').each(function () {
                var className = $(this).data('class');
                if (classesModel[className]) {
                    $(this).addClass(classesModel[className]);
                }
            });

            $el.find('[data-text]').each(function () {
                var textName = $(this).data('text');
                if (templateData[textName]) {
                    $(this).text(templateData[textName]);
                }
            });

            $el.find('svg > path').each(function () {
                var $path = $(this);
                var dName = $path.data('d');
                if (dName && templateData[dName]) {
                    $path.attr('d', templateData[dName]);
                }
            });
        });
    });
});