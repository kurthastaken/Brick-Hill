var clanInfo = {};
var currentTab = 'members';

$(() => {
    const clanInfoMeta = $('meta[name="clan-info"]');
    clanInfo.id = clanInfoMeta.attr('data-id');

    members(1, 1);

    $('[data-tab]').click(function() {
        $(`[data-tab="${currentTab}"]`).removeClass('blue').addClass('transparent');
        $(`[data-tab-section="${currentTab}"]`).hide();

        $(this).removeClass('transparent').addClass('blue');
        currentTab = $(this).attr('data-tab');

        $(`[data-tab-section="${currentTab}"]`).show();
    });

    $('#rank').change(function() {
        members(this.value, 1);
    });
});

function members(rank, page)
{
    $.get(`/api/v1/clans/members/${clanInfo.id}/${rank}`, { page }).done(function(data) {
        $('#members').html('');

        if (!data.data.length)
            return;

        $.each(data.data, function() {
            $('#members').append(`
            <a href="${this.user.url}">
                <div class="col-1-5 mobile-col-1-2">
                    <img style="width:145px;height:145px;" src="${this.user.thumbnail}">
                    <div class="ellipsis">${this.user.username}</div>
                </div>
            </a>`);
        });

        if (data.total_pages > 1) {
            const previousDisabled = (data.current_page == 1) ? 'disabled' : '';
            const nextDisabled = (data.current_page == data.total_pages) ? 'disabled' : '';
            const previousPage = data.current_page - 1;
            const nextPage = data.current_page + 1;

            $('#members').append(`
            <li class="col-1-1 center-text">
                <button class="small red" onclick="members('${rank}', ${previousPage})" ${previousDisabled}>&laquo;</button>
                <span style="margin-left:5px;margin-right:5px;">${data.current_page} of ${data.total_pages}</span>
                <button class="small green" onclick="members('${rank}', ${nextPage})" ${nextDisabled}>&raquo;</button>
            </li>`);
        }
    }).fail(() => $('#members').html(''));
}
