/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */


/** Remove tap delay on touch devices */
FastClick.attach(document.body);

/** Magnific Popup Settings */
$.extend(true, $.magnificPopup.defaults, {
    closeMarkup: '<span title="%title%" class="mfp-close">x</span>',
    gallery: {
        arrowMarkup: '<div title="%title%" class="mfp-arrow mfp-arrow-%dir%"></div>'
    },
    settings: {
        cache: false
    },
    mainClass: 'mfp-slide-in',
    removalDelay: 600,
    midClick: true,
    autoFocusLast: false,
    preload: false,
    fixedContentPos: true,
    fixedBgPos: true
});

/** On document ready */
$(document).ready(function() {

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
                var marker = new google.maps.Marker({
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

});
