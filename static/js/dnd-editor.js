
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
    import { getContrastColor, rgb2hex } from '/static/js/global-script.js';    
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
            // 1. เรียกใช้ renderDndEditorScripts
            await renderDndEditorScripts(defaultItems);
            
            // 2. เรนเดอร์คอมโพเนนต์ที่มี data-js-component (ยกเว้น DndComponent)
            const $components = $('[data-js-component]').not('[data-js-component="DndComponent"]');
            await Promise.all($components.map(function() {
                return renderComponent($(this));
            }));
            
            // 3. โหลด applyClasses จากไฟล์ class-render.js
            const { default: applyClasses } = await import('/static/js/render/class-render.js');
            await applyClasses();
            
            // 4. อัพเดตการแสดงผลสำหรับ numberPanelClasses
            $('[data-class="numberPanelClasses"]').each(function(index) {
                $(this).html(`<span>${index + 1}</span>`);
    
                const bgColor = $(this).css('background-color');
                const hexColor = rgb2hex(bgColor);
                const textColor = getContrastColor(hexColor);
                $(this).css('color', textColor);
            });

            $('[data-class="groupSectionClasses"]').each(function(index) {
                const bgColor = $(this).css('background-color');
                const hexColor = rgb2hex(bgColor);
                const textColor = getContrastColor(hexColor);
                $(this).css('color', textColor);
            });
            
            // 5. ตั้งค่าอีเวนต์คลิก
            $(document).on('click', '[data-class="expandButtonClasses"]', function() {
                let $parentPanelWrapper = $(this).closest('[data-class="panelWrapperClasses"]');
                let $siblingsPanelWrappers = $parentPanelWrapper.find('> [data-class="panelWrapperClasses"]');
        
                $siblingsPanelWrappers.toggleClass('hidden');
                
                $(this).find('.expand-icon').toggleClass('hidden');
                $(this).find('.collapse-icon').toggleClass('hidden');
                updateUIheight(); //รอ 100 สำหรับการเลื่อนแบบสมูท
            });
        
            // 6. อัพเดต UI height
            $(window).on('resize', function() {
                setTimeout(function() {
                    updateUIheight();
                }, 50);
            });
            
        
            // 7. เพิ่มสคริปต์จากไฟล์ input-property.js และ dnd-minimap.js และตรวจสอบการโหลดสคริปต์
            const script1 = document.createElement('script');
            script1.type = 'module';
            script1.src = '/static/js/input-property.js';
            script1.onload = checkAndRemoveHiddenClass;
            document.body.appendChild(script1);
    
            const script2 = document.createElement('script');
            script2.type = 'module';
            script2.src = '/static/js/dnd-minimap.js';
            script2.onload = checkAndRemoveHiddenClass;
            document.body.appendChild(script2);
    
            let scriptsLoaded = 0;
    
            function checkAndRemoveHiddenClass() {
                scriptsLoaded += 1;
                if (scriptsLoaded === 2) {
                    // ลบ class "hidden" และค่อยๆ แสดง div ด้วยการ fadeIn
                    $('[data-class="containerClasses"]').removeClass('hidden').hide().fadeIn(500);
                    $('#loadingSection').remove()
                    updateUIheight();

                    /*$(document).ready(function() {
                        $('[data-class="commonFlexClasses"]').click(function() {
                            $(this).addClass('');
                        });
                    });*/
                    $(document).on('click', '[data-class="commonFlexClasses"]', function() {
                        const $element = $(this);
                        $element.addClass('ring-1 ring-white ring-inset');
                    
                        // เมื่อคลิกนอก element ครั้งแรกหลังจากเพิ่ม class ให้ลบ class ออก
                        $(document).one('mousedown', function(event) {
                            // เช็คว่าไม่ได้กดปุ่ม Shift ค้างไว้ และคลิกไม่ได้อยู่บน element เดิม
                            if (!event.shiftKey && !$element.is(event.target) && $element.has(event.target).length === 0) {
                                $element.removeClass('ring-1 ring-white ring-inset');
                            }
                        });
                    });
                }
            }
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    
        /*$(document).on('contextmenu', function(e) {
            e.preventDefault();
        });*/
    });
    