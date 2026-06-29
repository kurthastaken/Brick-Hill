var routes = {};
var currentCategory = null;
var currentSearch = '';
var currentSort = 'updated';
var currentPage = 1;
var file = '';
var type = '';
var hitEnd = true;
var isPreviousEventComplete = true;
var hasSearched = false;

$(() => {
    const routesMeta = $('meta[name="routes"]');
    routes.index = routesMeta.attr('data-index');
    routes.indexTitle = routesMeta.attr('data-index-title');
    routes.upload = routesMeta.attr('data-upload');

    $('input[name="img"]').on('change', function() {
        if (this.files.length == 0)
            return;

        file = this.files[0];

        var reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = (event) => $('#texture').attr('src', event.target.result);
        $('#textureChosen').text(file.name);

        var fd = new FormData;
        fd.append('_token', _token);
        fd.append('type', type);
        fd.append('texture', file);

        $.ajax({
            url: '/api/shop/render/preview',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false
        }).done(function(data) {
            $('#globalError').html('');

            if (typeof data.errors !== 'undefined')
                for (const [_, messages] of Object.entries(data.errors)) {
                    var string = '';

                    messages.forEach((message) => string += `<div>${message}</div>`);

                    $(`#globalError`).html(string);
                }
            else
                $('#preview').attr('src', data);
        }).fail(() => $('#globalError').html('Unable to render preview.'));
    });

    $('#upload').submit(function(event) {
        event.preventDefault();

        var fd = new FormData;
        fd.append('_token', _token);
        fd.append('title', $(this).find('input[name="title"]').val());
        fd.append('type', type);
        fd.append('file', file);

        $.ajax({
            url: routes.upload,
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false
        }).done(function(data) {
            $('#globalError').html('');

            if (typeof data.errors !== 'undefined')
                for (const [_, messages] of Object.entries(data.errors)) {
                    var string = '';

                    messages.forEach((message) => string += `<div>${message}</div>`);

                    $(`#globalError`).html(string);
                }
            else
                window.location = data.url;
        }).fail(() => $('#globalError').html('Unable to create item.'));
    });

    $('#search').submit(function(event) {
        event.preventDefault();

        var oldSearch = currentSearch;
        currentSearch = $(this).find('input').val();

        if (currentSearch != oldSearch)
            search(currentCategory, 1, currentSearch, true);
    });

    $('#sort').change(function() {
        currentSort = this.value;
        search(currentCategory, 1, currentSearch, true);
    });

    $('[data-category]').click(function() {
        var oldCategory = currentCategory;

        $(`[data-category="${currentCategory}"]`).removeClass('active');
        $(this).addClass('active');

        currentCategory = $(this).attr('data-category');

        if (currentCategory != oldCategory)
            search(currentCategory, 1, currentSearch, true);
    });

    $('[data-type]').click(function() {
        type = $(this).attr('data-type');

        $('#types').remove();
        $('#upload').show();
    });

    $(window).scroll(function() {
        if (hasSearched && isPreviousEventComplete && $(window).scrollTop() + $(window).height() >= $(document).height() - 100 && !hitEnd)
            search(currentCategory, currentPage + 1, currentSearch, false);
    });
});

function search(category, page, search, clear)
{
    if (!hasSearched) {
        if (!currentCategory) {
            category = 'all';
            currentCategory = 'all';
        }

        document.title = routes.indexTitle;
        window.history.pushState(null, null, routes.index);
    }

    hasSearched = true;
    isPreviousEventComplete = false;

    $.get('/api/v1/shop/list', { sort: currentSort, type: category, search, limit: 20, page }).done((data) => {
        $(`[data-category='${currentCategory}']`).removeClass('active');

        currentCategory = category;
        currentSearch = search;

        $(`[data-category='${currentCategory}']`).addClass('active');

        if (clear)
            $('#items').html('');

        if (!data.data.length) {
            currentPage = 1;
            hitEnd = true;
            return $('#items').html('');
        }

        currentPage = data.current_page;
        hitEnd = data.current_page == data.total_pages;

        $.each(data.data, function() {
            var price = '';
            var thumbnail = `
            <div class="thumbnail dark" style="position:relative;padding:20px;">
                <img src="${this.thumbnail}" alt="${this.name}">
            </div>`;

            if (!this.offsale) {
                if (this.bits == 0 && this.bucks == 0) {
                    price += `<span class="offsale-text">Free</span>`;
                } else {
                    if (this.bucks > 0)
                        price += `<span class="bucks-text"><span class="bucks-icon"></span> ${this.bucks}</span>`;

                    if (this.bucks > 0 && this.bits > 0)
                        price += `<div style="width:5px;display:inline-block;"></div>`;

                    if (this.bits > 0)
                        price += `<span class="bits-text"><span class="bits-icon"></span> ${this.bits}</span>`;
                }
            } else if (this.offsale) {
                price = `<span class="offsale-text">Offsale</span>`;
            }

            if (this.special_edition)
                thumbnail = `
                <div class="thumbnail dark" style="position:relative;border:5px solid #ffd52d;border-bottom:0;padding:15px 15px 20px;">
                    <span class="special-e-icon"></span>
                    <img src="${this.thumbnail}" alt="${this.name}">
                </div>`;
            else if (this.special)
                thumbnail = `
                <div class="thumbnail dark" style="position:relative;border:5px solid #ffd52d;border-bottom:0;padding:15px 15px 20px;">
                    <span class="special-icon"></span>
                    <img src="${this.thumbnail}" alt="${this.name}">
                </div>`;

            $('#items').append(`
            <div class="col-1-4 mobile-col-1-2 mobile-half-fill" style="padding-right:20px;">
                <div class="card">
                    <a href="${this.url}">${thumbnail}</a>
                    <div class="item-content">
                        <a href="${this.url}" style="color:#000;">
                            <span class="name">${this.name}</span>
                        </a>
                        <div class="creator">By <a href="${this.creator.url}">${this.creator.username}</a></div>
                        <div class="price">${price}</div>
                    </div>
                </div>
            </div>`);

            isPreviousEventComplete = true;
        });
    }).fail(() => {
        currentPage = 1;
        hitEnd = true;
        isPreviousEventComplete = true;
        $('#items').html('<div class="col-1-1">Unable to load items.</div>')
    });
}
