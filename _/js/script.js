// smartresize by Paul Irish: http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function($,sr){
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

/* usage:
$(window).smartresize(function(){  
  // code that takes it easy...
}); */
