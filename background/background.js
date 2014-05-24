Olapic = {
    init: function() {
        Olapic.listener();
    },
    set: function(url, data) {
        localStorage[url] = data;
    },
    get: function(url) {
        return localStorage[url];
    },
    listener: function() {
        chrome.extension.onRequest.addListener(
            function(request, sender, sendResponse)
            {   
                if(request.olapic.op  === 2) {
                    switch (request.olapic.data.action)
                    {
                        case "get":
                            sendResponse(Olapic.get(request.olapic.data.href));
                        break;
                        case "set":
                            Olapic.set(request.olapic.data.info);
                        break;
                    }
                }   
            }
        );
    }

}