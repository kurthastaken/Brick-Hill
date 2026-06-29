$(() => {
    $('[data-modal-open]').click(function() {
        $(`[data-modal="${$(this).attr('data-modal-open')}"]`).show();
    });

    $('[data-modal-close]').click(function() {
        $(`[data-modal="${$(this).attr('data-modal-close')}"]`).hide();
    });
});
