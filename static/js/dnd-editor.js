
        /*function updateParamValueById(targetId, paramIndex, paramKey, newValue) {
            for (let condition of test_data.conditions) {
                if (condition.id === targetId) {
                    if (condition.params[paramIndex]) {
                        if (paramKey in condition.params[paramIndex]) {
                            condition.params[paramIndex][paramKey] = newValue;
                            console.log('Updated test_data:', test_data);
                        } else {
                            console.error('Invalid paramKey:', paramKey);
                        }
                    } else {
                        console.error('Param index out of range:', paramIndex);
                    }
                    break;
                }
            }
            loadComponentScripts();
        }

        $('#update-button').on('click', function () {
            updateParamValueById('WwBwoxYfR0OEbmAPtWkE2g', 0, 'value', 'SKOPUSDT');
        });

        function updateAttributeValueById(targetId, attributeName, newValue) {
            for (let condition of test_data.conditions) {
                if (condition.id === targetId) {
                    if (attributeName in condition) {
                        condition[attributeName] = newValue;
                        console.log('Updated test_data:', test_data);
                    } else {
                        console.error('Invalid attribute name:', attributeName);
                    }
                    break;
                }
            }
            loadComponentScripts();
        }

        $('#update-button2').on('click', function () {
            updateAttributeValueById('eRwWPP-o80yVeskQDGjdHg', 'title', 'or');
        });*/

        //พิจารณาเปลี่ยนเป็นการ แก้ไข หรือ render เฉพาะที่เกี่ยวข้อง
        import { defaultItems } from '/static/js/data.js';

        const addMoreContainerTemplate = `
        <div class="addMoreClasses">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            <p>Add Event</p>
        </div>
    `;

        export async function renderDndEditorScripts(items) {
            try {
                const selector = '[data-js-component="DndComponent"]';
                const component = $(selector).first();
                    try {
                        const componentFile = `/static/js/js_components/DndComponent.js`;
                        const module = await import(componentFile);
                        
                        if (typeof module.renderContent === 'function') {
                            const content = await module.renderContent(items, 0);
                            ;
                            $(component).html(content);
                            $(component).append(addMoreContainerTemplate);

                            
                        } else {
                            console.error('renderContent function not found in module:', componentFile);
                        }
                    } catch (error) {
                        console.error('Error loading or rendering component:', error);
                    }
        

            } catch (error) {
                console.error('Error loading components:', error);
            }
        }


        async function renderComponentScripts() {
            async function renderComponent($el) {
                const componentName = $el.data('js-component');
        
                if (componentName === 'DndComponent') {
                    return; // Skip rendering for DndComponent
                }
        
                try {
                    const { default: renderContent } = await import(`/static/js/js_components/${componentName}.js`);
                    const content = renderContent();
                    $el.html(content);
        
                    // Find and render nested components
                    const nestedComponents = $el.find('[data-js-component]');
                    await Promise.all(nestedComponents.map(function () {
                        return renderComponent($(this)); // Await each nested component rendering
                    }));
                
                } catch (error) {
                    console.error(`Error loading component "${componentName}":`, error);
                }
            }
        
            // Get all elements with data-js-component attribute and render them
            const components = $('[data-js-component]');
            await Promise.all(components.map(function () {
                return renderComponent($(this)); // Await rendering of each component
            }));
        }
        
        
        $(document).ready(async () => {
            try {
                await renderDndEditorScripts(defaultItems);

                await renderComponentScripts();
        
                //const { default: applyClasses } = await import('/static/js/render/class-render.js');
                //const { default: applyComponents } = await import('/static/js/render/component-render.js');
        
                //await applyComponents();
                //applyClasses();

                const script = document.createElement('script');
                script.type = 'module';
                script.src = '/static/js/input-property.js';
                document.body.appendChild(script);
        
            } catch (error) {
                console.error('Error during initialization:', error);
            }
        });