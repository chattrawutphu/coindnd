
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

        export async function loadComponentScripts(parentId, items) {
            try {
                const selector = '[data-js-component]';
                const component = $(selector).first();
                    try {
                        const componentFile = `/static/js/js_components/DndComponent.js`;
                        const module = await import(componentFile);
                        
                        // ตรวจสอบว่าโมดูลมีฟังก์ชัน renderContent และเรียกใช้งาน
                        if (typeof module.renderContent === 'function') {
                            const content = await module.renderContent(items);
                            $(component).html(content);
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
        

        $(document).ready(async () => {
            loadComponentScripts(null,defaultItems).catch(error => {
                console.error('Error loading component scripts:', error);
            });
            const { default: applyClasses } = await import('/static/js/render/class-render.js');
            const { default: applyComponents } = await import('/static/js/render/component-render.js');
            applyClasses();
            applyComponents();
        });