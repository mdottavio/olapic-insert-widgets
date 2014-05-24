/*
 *  Project: Rocking Element Tree (a.k.a. eltree)
 *  Description: Adds a firebug-like functionality on page, that gives you element tree and properties by clicking on it
 *  Author: Rochester Oliveira
 *  License: GNU General Public License ( http://en.wikipedia.org/wiki/GNU_General_Public_License )
 */

// awesome structure from http://jqueryboilerplate.com/
;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = 'eltree',
        defaults = {
            click: function(data){
                console.log(data);
            }            
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;
		
		this.obj = $(this.element);
        
        this.init();
    }

    Plugin.prototype.init = function () {
		var obj = this.obj,
			$this = this;
			
		//now we'll add those logger functions
		obj.addClass("olapicDebugging").on('click', function(event){
			event.preventDefault(); // so links wont be opened while debugging
            obj.removeClass("olapicDebugging");
            obj.off('click');
			$this.options.click( event.target ); //and let's add this to our logger spans
		});
    };
	
    // A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }
})(jQuery, window, document);