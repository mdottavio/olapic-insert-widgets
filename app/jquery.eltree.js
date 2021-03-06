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
            var data = logThis(event.target);

            obj.removeClass("olapicDebugging");
            obj.off('click');

			$this.options.click( data ); //and let's add this to our logger spans
		});
    };

    function logThis(elem ) {
        return selectors(elem);
    }

    function selectors(elem) {
        var css = "",
            continueCss = 1,
            js = "",
            parent = "",
            ret = new Array();
            
        while (elem !== window.document) {
            parent = elem.parentNode;

            //js selector
            x=0;
            while(  ( $(parent.childNodes[x])[0] !== elem ) && (x < parent.childNodes.length) ) {
                x++;
            }
            //now we have our childNode!
            js = x + "," + js;
            
            //CSS selector
            if (continueCss) {
                if(elem.id) {
                    css = elem.nodeName + '#' + elem.id + " " + css;
                    continueCss = 0;
                } else if(elem.className) {
                    css = elem.nodeName + '.' + elem.className + " " + css;
                } else {
                    css = elem.nodeName + " " + css;
                }
            }
            //let's go up one level
            elem = elem.parentNode;
        }
        //let's make our js selector useful
        js = (js.slice(0, -1)).split(",");
        for(x=0; x< js.length; x++) {
            js[x] = "childNodes[" + js[x] + "]";
        }
        js = "window. document. " + js.join(". ");
        
        ret[0] = css.toLowerCase(); //css
        ret[1] = js; //js
        return ret;
    }
	
    // A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }
})(jQuery, window, document);