
(function(window, document){

    var _self = this,
        oLoader = function(){},
        olapicBuild = '//photorankstatics-a.akamaihd.net/81b03e40475846d5883661ff57b34ece/static/frontend/latest/build.min.js';
        instanceData = {};
        // olapicBuild = '//local.photorank.me/sdkjs/dist/build.js';
    
    msgResponds = function(){
        jQuery('body').eltree({
            click: function(wrapperData){
                var theID = 'olapicTemp',
                    theWrapper = eval(wrapperData[1]),
                    saveMessage = {};

                if( $(theWrapper).attr('id') == '' || $(theWrapper).attr('id') == undefined){
                    $(theWrapper).attr('id', theID);
                } else {
                    theID = $(theWrapper).attr('id');
                }
                _self.loadScripts(theID);
                saveMessage = {
                    op : 2,
                    data : {
                        action : 'set', //get
                        href : 'window.location.href',
                        info : {
                            'wrapperData' : wrapperData
                        }
                    }
                };
                chrome.runtime.sendMessage(saveMessage, function(response) {
                    console.log('Guardado');
                });
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

    var getMessage = {
        op : 2,
        data : {
            action : 'get', //get
            href : window.location.href
        }
    };
    chrome.runtime.sendMessage(getMessage, function(response) {
        console.log(response);
    });

})(window, document)
