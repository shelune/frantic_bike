(function () {
    $('.block--selected').click(function () {
        $('.choice--color').addClass('active');
        $(this).addClass('is-hidden-desktop');
    });

    $('.choice--color .color-block').click(function () {
        var targetColor = $(this).attr('class').substring(12);
        $('.block--selected').attr('class', 'figure customize__figure color-block block--selected').addClass(targetColor);
        console.log(targetColor);
        $('.choice--color').removeClass('active');
    });

    $('.gender-block span').click(function () {
        if ($(this).hasClass('icon-boy')) {
            $('.bike-display use').attr('xlink:href', 'img/bike-m.svg#bike');
        } else {
            $('.bike-display use').attr('xlink:href', 'img/bike-f.svg#bike');
        }
        console.log($('.bike-display use').attr('xlink:href'));
    });
})();
