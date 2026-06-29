var routes = {};

$(() => {
    const meta = 'meta[name="routes"]';
    routes.redeem = $(meta).attr('data-redeem');

    $('#codeForm').submit(function(event) {
        event.preventDefault();

        const code = $(this).find('[name="code"]').val();

        $.post(routes.redeem, { _token, code }).done(function(data) {
            $('#message').removeClass('red-text').removeClass('green-text').html('');

            if (typeof data.error !== 'undefined')
                return $('#message').addClass('red-text').html(data.error);

            $('#message').addClass('green-text').html(data.message);
        });
    });
});
