
Olapic = {
    init: function() {
        Olapic.listener();
    },
    set: function(url, data) {
        localStorage[url] = JSON.stringify( data );
    },
    get: function(url) {
        return JSON.parse(localStorage[url]);
    },
    listener: function() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if(request.op  === 2) {
                    switch (request.data.action)
                    {
                        case "get":
                            sendResponse( Olapic.get(request.data.href));
                        break;
                        case "set":
                            sendResponse( Olapic.set(request.data.href,request.data.info) );
                        break;
                    }
                } else if(request.op  === 3) {
                    chrome.browserAction.setBadgeText({
                      text: '...'
                    });
                    sendResponse( {} );
                } else if(request.op  === 4) {
                    chrome.browserAction.setBadgeText({
                      text: ''
                    });
                    sendResponse( {} );
                }
            }
        );
    }

}

Olapic.init()