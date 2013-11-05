// smartresize by Paul Irish: http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
;(function($,sr){
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

(function($) {
    $('.grid > li')
        .hover(function(){
            $(this).find('img').toggleClass('is-hidden');
        })
        .on('click', function(){
            var largeImg = $(this).find('.img').attr('data-img-lg');
            var $modalBkgd = $('.modal-bkgd');
            var $modal = $('.modal-container');

            $modal
                .find('img').attr('src', largeImg).end()
                .removeClass('is-hidden');
        });

    $('.modal-close').on('click', function(){
        $(this)
            .closest('.modal-container').addClass('is-hidden');
    });
})(jQuery);

/* usage:
$(window).smartresize(function(){
  // code that takes it easy...
}); */
