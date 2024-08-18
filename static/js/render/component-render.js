const { default: applyClasses } = await import('/static/js/render/class-render.js');

export default async function applyComponents(context = document) {
    const components = $('[data-component]', context);

    for (const component of components) {
        const $el = $(component);
        const componentFile = '/static/components/' + $el.data('component') + '.html';

        await $.get(componentFile).done(async function (data) {
            $el.html(data);
            try {
                // Recursively apply components for any inner components within this element
                await applyComponents($el);

            } catch (error) {
                console.log('Error loading classesModel:', componentClassesFile);
                console.error('Error:', error);
            }
        });
    }
}