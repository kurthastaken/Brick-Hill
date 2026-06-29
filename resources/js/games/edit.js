$(() => {
    $('#showHostKey').click(function() {
        var shown = $('#hostKey').attr('type') == 'text';

        if (shown) {
            $('#hostKey').attr('type', 'password');
            $(this).removeClass('red').addClass('blue').text('Show Key');
        } else {
            $('#hostKey').attr('type', 'text');
            $(this).removeClass('blue').addClass('red').text('Hide Key');
        }
    });
});
