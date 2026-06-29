window._token = '';

$(() => window._token = $('meta[name="csrf-token"]').attr('content'));

$.ajaxSetup({
    beforeSend: function(xhr, options) {
        if (options.url.indexOf('http') !== 0 )
            options.url = options.url;
    }
});

$('[data-dropdown-open]').click(function(event) {
    var dropdown = $(this).attr('data-dropdown-open');
    var object = `[data-dropdown="${dropdown}"]`;
    var opened = $(object).hasClass('active');

    if (!opened) {
        if (targetMatches(true, event.target, `[data-dropdown-open="${dropdown}"], [data-dropdown-open="${dropdown}"] *`)) {
            const self = this;

            $(object).addClass('active').css({
                top: ($(self).height() + 30) + 'px',
                left: $(self).offset().left + 'px'
            });

            window.onresize = function() {
                $(object).css({
                    top: ($(self).height() + 30) + 'px',
                    left: $(self).offset().left + 'px'
                });
            };
        }
    } else {
        if (targetMatches(false, event.target, `${dropdown}, ${dropdown} *`)) {
            $(object).removeClass('active');

            window.onresize = null;
        }
    }
});


function targetMatches(does, eventTarget, target)
{
    if (does)
        return (eventTarget.matches) ? eventTarget.matches(target) : eventTarget.msMatchesSelector(target);

    return (eventTarget.matches) ? !eventTarget.matches(target) : !eventTarget.msMatchesSelector(target);
}
