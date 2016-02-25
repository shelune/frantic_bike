(function () {
    var colorChoice = {
        'pink': '#ff358b',
        'blue': '#2980b9',
        'white': '#fff',
        'gold': '#d0a825',
        'silver': '#a69e9d',
        'beige': '#d1dbbd'
    };

    $('.block--selected').click(function () {
        $('.choice--color').addClass('active');
        $(this).addClass('is-hidden-desktop');
    });

    $('.choice--color .color-block').click(function () {
        var targetColor = $(this).attr('class').substring(12);
        $('.block--selected').attr('class', 'figure customize__figure color-block block--selected').addClass(targetColor);
        console.log(targetColor);
        $('.choice--color').removeClass('active');
        $('.bike-display use').css('fill', colorChoice[targetColor]);
        console.log(colorChoice[targetColor]);
    });

    $('.gender-block span').click(function () {
        if ($(this).hasClass('icon-boy')) {
            $('.bike-display use').attr('xlink:href', '#bike-m');
        } else {
            $('.bike-display use').attr('xlink:href', '#bike-f');
        }
    });

    $('.addon-block span').click(function () {
        $(this).closest('.addon-block').toggleClass('block--selected');
        if ($('.addon-block').hasClass('block--selected')) {
            if ($(this).hasClass('icon-cart')) {
                $('#trunk').attr('class', 'colorize');
            } else {
                $('#basket').attr('class', 'colorize');
            }
        } else {
            if ($(this).hasClass('icon-cart')) {
                $('#trunk').attr('class', 'colorize removable');
            } else {
                $('#basket').attr('class', 'colorize removable');
            }
        }

        console.log($('#trunk').attr('class'));
        console.log($('.addon-block').attr('class'));
    });
})();
