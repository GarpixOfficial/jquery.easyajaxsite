/**
 * Garpix Ltd.
 * (Burenkov Anatoly, Kuznetsov Aleksey)
 * Site: http://garpix.com
 * Email: info@garpix.com
 * Version: 1.0.1
 * Date: 2016-02-16
 */

(function($) {
    $.easyAjaxSite = function(options) {
        var settings = $.extend( {
            'updateHtml': ['#content'],
            'reloadScripts' : [],
            'onBefore': function(href) { return true; },
            'onAfter': function(data) { return true; },
            'onError': function() { alert('Loading page fails.'); return true; },
            'animation': 'none', // fade, none
            'animationDuration': 500
        }, options);

        var fixedFind = function(data, selector) {
            var $elem_find = $(data).find(selector);
            if ($elem_find.length === 0) {
                return $(data).filter(selector);
            } else {
                return $elem_find;
            }
        };

        var animFadeOutIn = function(selector, data) {
            $(selector).fadeOut(settings.animationDuration, function() {
                $(selector).html(fixedFind(data, selector).html());
                $(selector).fadeIn(settings.animationDuration);
            });
        };

        var updateHtmlWithData = function(data, needPushState, url) {
            for (var i=0, len=settings.updateHtml.length; i < len; i++) {
                var htmlSelector = settings.updateHtml[i];
                switch (settings.animation) {
                    case 'fade':
                        animFadeOutIn(htmlSelector, data);
                        break;
                    default:
                        $(htmlSelector).html(fixedFind(data, htmlSelector).html());
                }
            }
            var title = $(data).filter('title').text();
            if (needPushState) {
                history.pushState(url, title, url);
            }
            for (i=0, len=settings.reloadScripts.length; i < len; i++) {
                var scriptUrl = settings.reloadScripts[i];
                $.getScript(scriptUrl);
            }
            document.title = title;
            settings.onAfter(data);
        };

        var route = function(url, needPushState) {
            if (settings.onBefore(url)) {
                $.ajax({
                    url: url,
                    dataType: 'html'
                }).done(function(data) {
                    updateHtmlWithData(data, needPushState, url);
                }).fail(function() {
                    settings.onError();
                });
            }
        };

        $(document).on('click', 'a:not([href^=blob])', function(e) {
            var url = $(e.target).closest('a').attr('href');
            route(url, true);
            return false;
        });

        window.onpopstate = function(event) {
            var url = event.state;
            route(url, false);
            return false;
        };
    };
})(jQuery);