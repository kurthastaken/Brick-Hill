$(() => {
    $('#replyButton').on('click touchstart', () => {
        $('#replyCard').show();
        $('#replyButton').remove();
    });
});
