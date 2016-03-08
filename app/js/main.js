(function () {
    var colorChoice = {
        'pink': '#ff358b',
        'blue': '#2980b9',
        'white': '#fff',
        'gold': '#d0a825',
        'silver': '#a69e9d',
        'beige': '#d1dbbd'
    };

    $('.color-block.block--selected').click(function () {
        $('.choice--color').addClass('active');
        $(this).addClass('is-hidden-desktop');
    });

    $('.choice--color .color-block').click(function () {
        var targetColor = $(this).attr('class').substring(12);
        $('.color-block.block--selected').attr('class', 'figure customize__figure color-block block--selected').addClass(targetColor);
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

    $('.customize__choice > div').click(function () {
        $(this).toggleClass('block--selected');
        if (!$(this).hasClass('addon-block')) {
            $(this).siblings().removeClass('block--selected');
        } else {
            if ($(this).hasClass('block--selected')) {
                if ($(this).find('span').hasClass('icon-cart')) {
                    $('.trunk').attr('class', 'trunk colorize');
                } else {
                    $('.basket').attr('class', 'basket colorize');
                }
            } else {
                if ($(this).find('span').hasClass('icon-cart')) {
                    $('.trunk').attr('class', 'trunk colorize removable');
                } else {
                    $('.basket').attr('class', 'basket colorize removable');
                }
            }
        }

        if ($(this).hasClass('number-block')) {
            var currentGear = $(this).find('span').text();
            $('.technical__figure .highlight').removeClass('highlight');
            $('.technical__figure').eq(1).find('span:contains(' + currentGear + ')').addClass('highlight');

        }
    });

    $('.nav-icon').click(function () {
        var headerPhone = $('.header__nav--touch');
        $(headerPhone).toggleClass('nav--open');
        $('body').toggleClass('lock-overflow');

        $(headerPhone).on('touchmove', function (event) {
            event.preventDefault();
        });
    });

    [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
			new SelectFx(el);
	});
})();
