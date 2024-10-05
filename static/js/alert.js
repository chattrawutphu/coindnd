
import { renderAlertComponent } from '/static/js/js_components/AlertComponent.js';

/*
* START: Save to Local Storage
*/

let alertQueue = [];
let isProcessingQueue = false;
const delayRemoveTime = 5000;
const delayQueue = 350;
const maxAlert = 5;

export function showAlert(message, type) {
    const alertData = { message, type };
    alertQueue.push(alertData);
    if (!isProcessingQueue) {
        processAlertQueue();
    }
}

function processAlertQueue() {
    if (alertQueue.length === 0) {
        isProcessingQueue = false;
        return;
    }

    isProcessingQueue = true;
    const { message, type } = alertQueue.shift();
    displayAlert(message, type);

    setTimeout(processAlertQueue, delayQueue);
}

function displayAlert(message, type) {
    const $alerts = $('#alert-target .alert-item');
    if ($alerts.length >= maxAlert) {
        const oldestAlertId = $alerts.last().attr('id');
        removeAlert(oldestAlertId);
    }
    const { html, id } = renderAlertComponent(message, type);
    $('#alert-target').prepend(html);
    
    setTimeout(() => {
        const alertElement = document.getElementById(id);
        if (alertElement) {
            alertElement.style.opacity = '1';
            alertElement.style.transform = 'translateY(0)';
        }
    }, 10);
    
    setTimeout(() => removeAlert(id), delayRemoveTime);
    
    return id;
}

function removeAlert(id) {
    const alert = document.getElementById(id);
    if (alert) {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-10px)';
        alert.style.maxHeight = '0';
        alert.style.margin = '0';
        alert.style.padding = '0';
        alert.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'opacity') {
                alert.remove();
            }
        });
    }
}

// Set up the alert container
$('#alert-target').css({
    'display': 'grid',
    'grid-template-columns': '1fr',
    'overflow': 'hidden'
});

// Add styles for alert items
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .alert-item {
            transition: all 0.3s ease-out;
            max-height: 100px;
            overflow: hidden;
        }
    `)
    .appendTo('head');

$('#alert-target').on('click', '[data-dismiss-target]', function () {
    const alertId = $(this).attr('data-dismiss-target').substring(1);
    removeAlert(alertId);
});
/*
* END: Save to Local Storage
*/