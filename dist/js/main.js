/*global window, document, $, google, mapCenter, FastClick */

/** Remove tap delay on touch devices */
FastClick.attach(document.body);

/** On document ready */
$(document).ready(function() {

    /* Select */
    $('select.select').selectric({
        disableOnMobile: false
    });

    /* Wide */
    $('.wide').each(function() {
        if ($('.space', this).length < 1) {
            $(this).wrapInner('<div class="space"></div>');
        }
    });

    /** Nav */
    $('.nav').each(function() {
        function toggleNav() {
            function keyhandler(e) {
                if (e.which == 27) {
                    close();
                }
            }

            function clickhandler(e) {
                if (!flag) {
                    flag = true;
                    setTimeout(function() {
                        flag = false;
                    }, 200);
                    if (($(e.target).closest('.nav').length <= 0) && ($(e.target).closest('.toggle').length <= 0)) {
                        close();
                    }
                }
            }

            function open() {
                html.on('keydown', keyhandler).addClass('nav-visible');
                body.on('click touchstart', clickhandler);
                setTimeout(function() {
                    html.addClass('nav-open');
                }, 10);
            }

            function close() {
                html.off('keydown', keyhandler).removeClass('nav-open');
                body.off('click touchstart', clickhandler);
                setTimeout(function() {
                    html.removeClass('nav-visible');
                }, 420);
            }

            if (html.hasClass('nav-open')) {
                close();
            } else {
                open();
            }
            $(this).blur();
            return false;
        }

        var body = $('body'),
            html = $('html'),
            toggle = $('.toggle', this),
            flag = false;
        var overlay = $('<div class="overlay"/>');
        overlay.appendTo(this);
        $('.area', this).wrapInner('<div class="scroll"/>');
        toggle.add(overlay).on('click', toggleNav);
    });

    /** Gallery */
    $('.gallery').each(function() {
        $('.carousel', this).slick({
            infinite: true,
            adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<span class="prev"></span>',
            nextArrow: '<span class="next"></span>',
            dots: true,
            customPaging: function(slider, i) {
                return '<span class="dot"></span>';
            }
        });
    });

    /** Portfolio */
    $('.portfolio').each(function() {
        $('.item', this).each(function() {
            $('.top', this).clone().removeClass('top').addClass('small').insertAfter($('.title', this));
        });
    });

    /** Google Map */
    $('.map').each(function() {
        var that = $(this),
            m = $('.gmap', this)[0],
            t = $('.title', this);
        $('<span class="arrow"><span></span></span>').appendTo(t);
        t.on('click', function() {
            that.toggleClass('open');
            return false;
        });

        /** Map initialization */
        window.mapInit = function() {
            if (typeof google != 'undefined') {
                var pos = new google.maps.LatLng(59.9638353, 30.3381309);
                var map = new google.maps.Map(m, {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: pos,
                    zoom: 15,
                    scrollwheel: false,
                    disableDefaultUI: true,
                    backgroundColor: "#f3f2ef"
                });
                new google.maps.Marker({
                    position: pos,
                    map: map
                });
                google.maps.event.addDomListener(window, 'resize', function() {
                    mapCenter.call(map);
                });
                mapCenter.call(map);
            }
        };

        /** Map centering */
        window.mapCenter = function() {
            var center = this.getCenter();
            google.maps.event.trigger(this, 'resize');
            this.setCenter(center);
        };

        /** Map script */
        setTimeout(function() {
            $.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=ru-RU&callback=mapInit');
        }, 100);
    });

    /* Pager */
    $('.pager').each(function() {
        var t = $('ul li', this).filter('.prev, .next').find('a');
        $('<span class="arrow"><span></span></span>').appendTo(t);
    });

    /* Gallery popup */
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* Image popup */
    $('.popup-image').magnificPopup({
        type: 'image'
    });

    /* Page header carousel */
    $('.page-header').each(function() {
        $('.carousel', this).slick({
            infinite: true,
            adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<span class="prev"></span>',
            nextArrow: '<span class="next"></span>',
            dots: true,
            customPaging: function(slider, i) {
                return '<span class="dot"></span>';
            }
        });
    });

    /* Solutions tabs */
    $('.solutions').each(function() {
        var _address = $(this),
            _call = $('.action-call', _address);
        $('.tab-list', this).each(function() {
            $(this).on('click', 'a', function(event) {
                var where = $(this).attr("href").replace(/^.*#(.*)/, "$1");
                $(this).closest('li').addClass('active').siblings('li.active').removeClass('active');
                $('#' + where).removeClass('tab-hidden').siblings('.tab-content').addClass('tab-hidden');
                _call.attr('href', $('.tel', '#' + where).attr('data-href'));
                event.preventDefault();
            });

        });

        $('.carousel', this).slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            prevArrow: '<span class="prev"></span>',
            nextArrow: '<span class="next"></span>',
            responsive: [
                {
                    breakpoint: 567,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 749,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 1170,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true,
                        centerMode: true,
                        infinite: true
                    }
                }
            ]
        });
    });

});

/** Magnific Popup defaults */
$.extend(true, $.magnificPopup.defaults, {
    tLoading: 'Загрузка&hellip;',
    closeMarkup: '<span title="%title%" class="mfp-close"></span>',
    tClose: 'Закрыть (Esc)',
    gallery: {
        tPrev: 'Назад',
        tNext: 'Вперед',
        tCounter: '%curr% из %total%',
        arrowMarkup: '<span title="%title%" class="mfp-arrow mfp-arrow-%dir%"></div>',
        navigateByImgClick: true,
        preload: [0, 1],
        cursor: null
    },
    image: {
        tError: '<a href="%url%">Изображение</a> не может быть загружено.',
        verticalFit: true,
        cursor: null
    },
    settings: {
        cache: false
    },
    mainClass: 'mfp-slide-in',
    removalDelay: 800,
    midClick: true,
    autoFocusLast: false,
    preload: false,
    closeOnContentClick: true,
    fixedContentPos: true,
    fixedBgPos: true
});
