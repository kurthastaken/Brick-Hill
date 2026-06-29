var gameInfo = {};

$(() => {
    const gameInfoMeta = $('meta[name="game-info"]');
    gameInfo.id = gameInfoMeta.attr('data-id');
    gameInfo.launch = gameInfoMeta.attr('data-launch');

    $('#play').click(function() {
        console.log('Launching game...');

        $.get('/api/v1/auth/generateToken', { set: gameInfo.id }).done(() => window.location = gameInfo.launch);
    });

    $('[data-modal-open]').click(function() {
        $(`[data-modal="${$(this).attr('data-modal-open')}"]`).show();
    });

    $('[data-modal-close]').click(function() {
        $(`[data-modal="${$(this).attr('data-modal-close')}"]`).hide();
    });
});
