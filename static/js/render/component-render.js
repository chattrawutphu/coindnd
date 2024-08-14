
export default function applyComponents() {
    $('[data-component]').each(function () {
        var $el = $(this);
        var componentFile = '/static/components/' + $el.data('component') + '.html';
        /*var templateName = $el.data('template');
        var templateData = templates[templateName] || {};*/

        $.get(componentFile).done(function (data) {
            $el.html(data);

            /*$el.find('[data-classblind]').each(function () {
                var classblindName = $(this).data('classblind');
                if (templateData[classblindName]) {
                    $(this).attr('data-class', templateData[classblindName]);
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
            });*/
        });
    });
}