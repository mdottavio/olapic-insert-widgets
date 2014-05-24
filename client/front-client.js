
(function(window, document){

    var _self = this,
        oLoader = function(){},
        olapicBuild = '//photorankstatics-a.akamaihd.net/81b03e40475846d5883661ff57b34ece/static/frontend/latest/build.min.js';
        instanceData = {};
        // olapicBuild = '//local.photorank.me/sdkjs/dist/build.js';
    
    msgResponds = function(){

    };

    loadScripts = function(wrapperData){
        var olapicwidget = document.createElement("script");
        olapicwidget.type = "text/javascript";
        olapicwidget.src = olapicBuild;
        olapicwidget.charset = "UTF-8";
        olapicwidget.setAttribute('data-olapic', wrapperData.js);
        olapicwidget.setAttribute('data-instance', instanceData.instance_hash);
        olapicwidget.setAttribute('data-apikey', instanceData.apikey);
        olapicwidget.async = true;
        document.getElementsByTagName("head")[0].appendChild(olapicwidget);
    };

    chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
        if(request..olapic !=== undefined){
            /// let see what you need
            instanceData = JSON.parse(e.data);
            jQuery('body').eltree({
                click: function(wrapperData){
                    _self.loadScripts(wrapperData);
                }
            })
        }
    });


})(window, document)
