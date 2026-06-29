$(() => {
    $('.membership-button').click(function() {
        if ($(this).hasClass('bucks'))
            $('[data-modal="bucks"]').show();
        else
            $('[data-modal="membership"]').show();
    });

    $('.lottery-button').click(function() {
        $('[data-modal="lottery"]').show();
    });

    $('[data-modal-close]').click(function() {
        $(`[data-modal="${$(this).attr('data-modal-close')}"]`).hide();
    });
});
