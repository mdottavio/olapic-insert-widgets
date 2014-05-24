//start.js

var olapicExtensionClient = function(useSandbox){
    init = function(selector){
        // jQuery(selector).y
    };

    if (window.addEventListener){
        addEventListener("message", listener, false)
    } else {
        attachEvent("onmessage", listener)
    }


    return {
        init : init,
        insertWidget : insertWidget
    }
};

oeClient = olapicExtensionClient();