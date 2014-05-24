
Olapic = {
    init: function() {
        Olapic.listener();
    },
    set: function(url, data) {
        console.log('guada')
        localStorage[url] = data;
    },
    get: function(url) {
        return localStorage[url];
    },
    listener: function() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log(request)
                if(request.op  === 2) {
                    switch (request.data.action)
                    {
                        case "get":
                            sendResponse(Olapic.get(request.data.href));
                        break;
                        case "set":
                            Olapic.set(request.data.href,request.data.info);
                        break;
                    }
                }   
            }
        );
    }

}

Olapic.init()