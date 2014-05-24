
(function(window, document){

    var _self = this,
        oLoader = function(){},
        olapicBuild = '//photorankstatics-a.akamaihd.net/81b03e40475846d5883661ff57b34ece/static/frontend/latest/build.min.js';
        instanceData = {};
        // olapicBuild = '//local.photorank.me/sdkjs/dist/build.js';
    
    msgResponds = function(){
        jQuery('body').eltree({
            click: function(wrapperData){
                var theID = 'olapicTemp';

                if( $(wrapperData).attr('id') == ''){
                    $(wrapperData).attr('id', theID);
                } else {
                    theID = $(wrapperData).attr('id');
                }
                _self.loadScripts(theID);
            }
        })
    };

    loadScripts = function(wrapperID){
        var olapicwidget = document.createElement("script");
        olapicwidget.type = "text/javascript";
        olapicwidget.src = olapicBuild;
        olapicwidget.charset = "UTF-8";
        olapicwidget.setAttribute('data-olapic', wrapperID);
        olapicwidget.setAttribute('data-instance', instanceData.instance_hash);
        olapicwidget.setAttribute('data-apikey', instanceData.apikey);
        olapicwidget.async = true;
        document.getElementsByTagName("head")[0].appendChild(olapicwidget);
    };

    chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
        if(request.olapic !== undefined){
            /// let see what you need
            instanceData = request.olapic;
            msgResponds();
        }
    });


})(window, document)
