const commonStyles = 'flex items-center gap-x-2 p-1 rounded-md hover:dark:bg-zinc-800 hover:bg-zinc-200';
const menuHtml = `
<div class="option-for-property select-none cursor-pointer absolute min-w-32 p-2 gap-y-2 font-medium dark:text-zinc-300 text-zinc-700 dark:bg-zinc-900 bg-zinc-100 border dark:border-zinc-800 border-zinc-300 rounded-md dropdown-menu-for-item z-20 text-xs">
    <div class="${commonStyles}"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> Edit</div>
    <div class="${commonStyles}"><svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em"><path d="M10 6.5C10 4.57 8.43 3 6.5 3S3 4.57 3 6.5 4.57 10 6.5 10a3.45 3.45 0 001.613-.413l2.357 2.528-2.318 2.318A3.46 3.46 0 006.5 14C4.57 14 3 15.57 3 17.5S4.57 21 6.5 21s3.5-1.57 3.5-3.5c0-.601-.166-1.158-.434-1.652l2.269-2.268L17 19.121a3 3 0 002.121.879H22L9.35 8.518c.406-.572.65-1.265.65-2.018zM6.5 8C5.673 8 5 7.327 5 6.5S5.673 5 6.5 5 8 5.673 8 6.5 7.327 8 6.5 8zm0 11c-.827 0-1.5-.673-1.5-1.5S5.673 16 6.5 16s1.5.673 1.5 1.5S7.327 19 6.5 19z"></path><path d="M17 4.879l-3.707 4.414 1.414 1.414L22 4h-2.879A3 3 0 0017 4.879z"></path></svg> Cut</div>
    <div class="${commonStyles}"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M10 8 H20 A2 2 0 0 1 22 10 V20 A2 2 0 0 1 20 22 H10 A2 2 0 0 1 8 20 V10 A2 2 0 0 1 10 8 z"></path><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg> Copy</div>
    <div class="${commonStyles}"><svg viewBox="2 2 21 21" fill="currentColor" height="1em" width="1em"><path d="M20 11V5c0-1.103-.897-2-2-2h-3a1 1 0 00-1-1H8a1 1 0 00-1 1H4c-1.103 0-2 .897-2 2v13c0 1.103.897 2 2 2h7c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2v-7c0-1.103-.897-2-2-2zm-9 2v5H4V5h3v2h8V5h3v6h-5c-1.103 0-2 .897-2 2zm2 7v-7h7l.001 7H13z"></path></svg> Paste</div>
    <div class="${commonStyles}"><svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em"><path d="M17 7h2.25c.97 0 1.75.78 1.75 1.75v10.5c0 .97-.78 1.75-1.75 1.75H8.75C7.78 21 7 20.22 7 19.25V17H4.75C3.78 17 3 16.22 3 15.25V4.75C3 3.78 3.78 3 4.75 3h10.5c.97 0 1.75.78 1.75 1.75V7zm-2 0V5H5v10h2V8.75C7 7.78 7.78 7 8.75 7H15zM9 9v10h10V9H9z"></path></svg> Duplicate</div>
    <div class="${commonStyles}"><svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z"></path></svg> Disabled</div>
    <div class="${commonStyles}"><svg baseProfile="tiny" viewBox="4 4 16 16" fill="currentColor" height="1em" width="1em"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293a.999.999 0 11-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 01-1.414 0 .999.999 0 010-1.414L10.586 12 8.293 9.707a.999.999 0 111.414-1.414L12 10.586l2.293-2.293a.999.999 0 111.414 1.414L13.414 12l2.293 2.293z"></path></svg> Remove</div>
</div>
`;

function positionDropdown($trigger, $dropdown) {
    const { top: triggerTop, left: triggerLeft } = $trigger.offset();
    const triggerHeight = $trigger.outerHeight();
    const dropdownWidth = $dropdown.outerWidth();
    const dropdownHeight = $dropdown.outerHeight();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    let top = triggerTop + triggerHeight;
    let left = triggerLeft;

    if (left + dropdownWidth > windowWidth) {
        left = windowWidth - dropdownWidth;
    }

    if (top + dropdownHeight > windowHeight) {
        top = triggerTop - dropdownHeight;
    }

    $dropdown.css({ top, left });
}

$(document).on('click', '.openProperty', function (event) {
    event.stopPropagation();
    $('.option-for-property').remove();

    const $dropdown = $(menuHtml).css('position', 'fixed');
    $('body').append($dropdown);
    positionDropdown($(this), $dropdown);

    // เพิ่ม event listener สำหรับการคลิกที่ document
    $(document).on('click', function (e) {
        // ตรวจสอบว่าคลิกนอก $dropdown หรือไม่
        if (!$(e.target).closest($dropdown).length) {
            $dropdown.remove();
        }
    });
});
function removeDropdown() {
    $('.option-for-property').remove();
}

$(window).on('resize scroll mousewheel DOMMouseScroll touchmove', removeDropdown);

