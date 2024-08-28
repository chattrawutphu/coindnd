
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
        <div data-class="addMoreClasses">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            <p>Add Event</p>
        </div>
        <div class="h-44"></div>
    `;
    
    async function renderDndEditorScripts(items) {
        try {
            const $component = $('[data-js-component="DndComponent"]').first();
            if ($component.length === 0) return;
    
            const { renderContent } = await import('/static/js/js_components/DndComponent.js');
            if (typeof renderContent !== 'function') {
                throw new Error('renderContent function not found in DndComponent.js');
            }
    
            const content = await renderContent(items);
            $component.html(content).append(addMoreContainerTemplate);
        } catch (error) {
            console.error('Error rendering DndComponent:', error);
        }
    }
    
    async function renderComponent($el) {
        const componentName = $el.data('js-component');
        if (componentName === 'DndComponent') return;
    
        try {
            const { default: renderContent } = await import(`/static/js/js_components/${componentName}.js`);
            const content = renderContent();
            $el.html(content);
    
            const $nestedComponents = $el.find('[data-js-component]');
            await Promise.all($nestedComponents.map(function() {
                return renderComponent($(this));
            }));
        } catch (error) {
            console.error(`Error loading component "${componentName}":`, error);
        }
    }
    
    function updateUIheight() {
        const $panelWrappers = $('[data-class="panelWrapperClasses"]');
        
        $panelWrappers.each(function() {
          const $panelWrapper = $(this);
          const $lineArea = $panelWrapper.find('[data-class="lineAreaClasses"]').first();
          const $numberPanel = $panelWrapper.find('[data-class="numberPanelClasses"]').first();
          const $highlightArea = $panelWrapper.find('[data-class="highlightAreaClasses"]').first();

          //const panelContainer = $panelWrapper.find('[data-class="panelContainerClasses"]').first().height() || 0;
          const messagePanel = $panelWrapper.find('[data-class="messagePanelClasses"]').first().height() || 0;
          const groupSection = $panelWrapper.find('[data-class="groupSectionClasses"]').first().height() || 0;
          const variablePanel = $panelWrapper.find('[data-class="variablePanelClasses"]').first().height() || 0;
          
          const totalOffset = messagePanel + groupSection + variablePanel + 4;
          const newHeight = $panelWrapper.height() - totalOffset;
          
          $lineArea.css({
            'height': `${newHeight}px`,
            'margin-top': `${totalOffset}px`
          });
          
          $numberPanel.css('margin-top', `${totalOffset}px`);
          $highlightArea.css('margin-top', `${totalOffset}px`);
        });
      }
    
    $(document).ready(async () => {
        try {
            await renderDndEditorScripts(defaultItems);
    
            const $components = $('[data-js-component]').not('[data-js-component="DndComponent"]');
            await Promise.all($components.map(function() {
                return renderComponent($(this));
            }));
    
            const { default: applyClasses } = await import('/static/js/render/class-render.js');
            await applyClasses();
    
            $('[data-class="numberPanelClasses"]').each(function(index) {
                $(this).html(`<span>${index + 1}</span>`);
            });
    
            $(document).on('click', '[data-class="expandButtonClasses"]', function() {
                let $parentPanelWrapper = $(this).closest('[data-class="panelWrapperClasses"]');
                let $siblingsPanelWrappers = $parentPanelWrapper.find('> [data-class="panelWrapperClasses"]');

                $siblingsPanelWrappers.toggleClass('hidden');
                /*$siblingsPanelWrappers.each(function() {
                    
                    if ($(this).hasClass('max-h-0')) {
                        // Expanding
                        $(this).removeClass('max-h-0')
                               .addClass('max-h-[9999px]')
                    } else {
                        // Collapsing
                        $(this).removeClass('max-h-[9999px]')
                               .addClass('max-h-0')
                    }
                });*/
                
                $(this).find('.expand-icon').toggleClass('hidden');
                $(this).find('.collapse-icon').toggleClass('hidden');
                updateUIheight(); //รอ 100 สำหรับการเลื่อนแบบสมูท
            });

            $(window).on('resize', function() {
                setTimeout(function() {
                    updateUIheight();
                }, 50);
            });
            
            updateUIheight();
    
            const script = document.createElement('script');
            script.type = 'module';
            script.src = '/static/js/input-property.js';
            document.body.appendChild(script);
    
        } catch (error) {
            console.error('Error during initialization:', error);
        }

        /*$(document).on('contextmenu', function(e) {
            e.preventDefault();
        });*/
    });