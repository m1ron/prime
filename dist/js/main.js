/*global window, document, $, google, mapCenter, FastClick */

/** Detect IE & Edge */
(function() {
    var ua = window.navigator.userAgent,
        pl = window.navigator.platform,
        body = document.getElementsByTagName('body')[0],
        result;
    window.isIE = (ua.indexOf('MSIE') > -1) || (ua.indexOf('Trident') > -1);
    window.isEdge = (ua.indexOf('Edge') > -1);
    window.isWin = (pl.indexOf('Win') > -1);
    window.isMobile = (function() {
        if (ua.match(/Android/i) || ua.match(/webOS/i) || ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i)) {
            return true;
        } else {
            return false;
        }
    })();
    if (isWin) {
        body.classList.add('mswin');
    }
    if (isIE) {
        body.classList.add('msie');
    }
    if (isEdge) {
        body.classList.add('msedge');
    }
})();


/** Remove tap delay on touch devices */
FastClick.attach(document.body);

/** On document ready */
$(document).ready(function() {

    /* Wide */
    $('.wide').each(function() {
        if ($('.space', this).length < 1) {
            $(this).wrapInner('<div class="space"></div>');
        }
    });

    /* Select */
    $('select.select').selectric({
        disableOnMobile: false
    });

    /* Checkbox & Radio */
    $('label.checkbox, label.radiobox').append('<span class="square"></span>');

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
                $('.submenu', nav).removeClass('submenu-open');
                nav.removeClass('nav-submenu-open');
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
            nav = $(this),
            toggle = $('.toggle', nav),
            flag = false;
        var overlay = $('<div class="overlay"/>');
        overlay.appendTo(this);
        $('.area', this).wrapInner('<div class="scroll"/>');
        if (!isMobile) {
            $('.scroll', this).perfectScrollbar();
        }
        toggle.add(overlay).on('click', toggleNav);

        $('.menu', this).each(function() {
            $('li', this).each(function() {
                var li = $(this),
                    sub = li.children('.submenu'),
                    hasSub = (sub.length > 0);
                li.toggleClass('sub', hasSub);
                if (hasSub) {
                    $('a', li).on('click', function() {
                        $(this).blur().siblings('.submenu').addClass('submenu-open');
                        nav.addClass('nav-submenu-open');
                        return false;
                    });
                    sub.wrapInner('<div class="sub-area"/>');
                    sub.each(function() {
                        $('<a href="#" class="sub-toggle"/>').prependTo(this);
                        $('<div class="sub-overlay"/>').appendTo(this);
                        $('.sub-overlay', this).on('click', function() {
                            $(this).closest('.submenu').removeClass('submenu-open');
                            if ($('.submenu-open', nav).length === 0) {
                                setTimeout(function() {
                                    nav.removeClass('nav-submenu-open');
                                }, 300);
                            }
                            return false;
                        });
                    });
                }
            });
        });
    });

    /* Header */
    $('.header').each(function() {
        var $bar = $('<div/>').addClass('bar');
        $bar.appendTo(this);
        /* Menu */
        $('.menu', this).each(function() {
            function init() {
                function active() {
                    var $li = $(this);
                    pos = $li.offset().left;
                    w = $li.outerWidth();
                    $bar.css({
                        width: w + 'px',
                        transform: 'translate3d(' + pos + 'px, 0, 0)'
                    });
                }

                function enter() {
                    var $li = $(this);
                    pos = $li.offset().left;
                    w = $li.outerWidth();
                    if ($li.hasClass('sub')) {
                        pos = (+pos + Math.floor(w / 2) - 170);
                        w = 340;
                    }
                    $bar.css({
                        width: w + 'px',
                        transform: 'translate3d(' + pos + 'px, 0, 0)'
                    });
                }

                function leave() {
                    var $li = $(this);
                    pos = 0;
                    w = 0;
                    if (isActive) {
                        pos = $lis.filter('.active').offset().left;
                        w = $lis.filter('.active').outerWidth();
                    }
                    $bar.css({
                        width: w + 'px',
                        transform: 'translate3d(' + pos + 'px, 0, 0)'
                    });
                }

                var $li = $(this),
                    isActive = ($lis.filter('.active').length > 0),
                    pos = 0,
                    w = 0;
                $li.toggleClass('sub', ($li.children('ul').length > 0));
                $li.on('mouseenter', enter).on('mouseleave', leave);
                if (isActive) {
                    active.call($lis.filter('.active'));
                }
            }
            var $lis = $(this).children('li');
            $lis.each(init);
        });
    });

    /* Fullpage */
    $('.fullpage').each(function() {
        $(this).fullpage({
            menu: '#dots',
            css3: true,
            touchSensitivity: 10,
            keyboardScrolling: false,
            animateAnchor: false,
            recordHistory: false,
            verticalCentered: true,
            resize: false,
            scrollingSpeed: 1000
        });
    });

    /** Gallery */
    $('.gallery').each(function() {
        $('.carousel', this).slick({
            infinite: true,
            adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            touchThreshold: 10,
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
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
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

    /* Popup window */
    $('.modal').magnificPopup({
        type: 'ajax'
    });

    /* Page header carousel */
    $('.page-header').each(function() {
        $('.carousel', this).slick({
            //autoplay: true,
            autoplaySpeed: 5000,
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
            touchThreshold: 10,
            prevArrow: '<span class="prev"></span>',
            nextArrow: '<span class="next"></span>',
            responsive: [{
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
                    slidesToShow: 3,
                    variableWidth: false,
                    centerMode: false,
                    //infinite: true
                }
            }]
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
    fixedContentPos: true,
    fixedBgPos: true
});
