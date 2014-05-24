var olapicExtension = olapicExtension || {
    enabled : false,
    handler : null,
};

chrome.browserAction.onClicked.addListener(
    function(tab) {
        olapicExtension.enabled = !olapicExtension.enabled;
            chrome.browserAction.setTitle({
            title: olapicExtension.enabled ? 'olapicExtension: ON' : 'olapicExtension: OFF'
        });
        chrome.browserAction.setIcon({
            path: olapicExtension.enabled ? 'icon-128.png' : 'icon-128-off.png'
        });
        chrome.browserAction.setBadgeText({
            text: olapicExtension.enabled ? 'ON' : ''
        });
        chrome.tabs.update(tab.id, {url: tab.url, selected: tab.selected}, null);
        if(olapicExtension.enabled == true){
            chrome.tabs.executeScript(null, {file:'https://photorankstatics-a.akamaihd.net/static/frontend/latest/build.min.js'}, function(){
                //olapic is loaded
                //
                console.log(olapic);
                olapicExtension.handler = new olapicInsert();
                olapicExtension.handler.init('body'); 
            });
        }
    }

);

