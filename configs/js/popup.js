var Popup = {
    init: function() {
        $("#btn-insert").on('click', function() {
            Popup.send();
            window.close();
        });
        $('#btn-conf').on('click', function() {
            chrome.tabs.create({'url':chrome.extension.getURL('configs/options/index.html')});
        });
    },
    send: function() {
        var apikey = $("#apikey").val(),
            instance_hash = $("#instance_hash").val();

        $('#error').text('');
        if(apikey != "" && instance_hash != "") {
            var olapic_send = {
                olapic: {
                    apikey: apikey,
                    instance_hash: instance_hash
                }
            };

            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, olapic_send, function(response) {
                    window.close();
                });
            });
        } else {
            $('#error').text("Complete the data");
        }
    }
}
Popup.init()