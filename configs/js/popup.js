var Popup = {
    init: function() {
        $('#apikey, #instance_hash').blur(Popup.saveSettings);
        Popup.loadSettings();
        $("#btn-insert").on('click', function() {
            Popup.send();
        });
        $('#btn-conf').on('click', function() {
            chrome.tabs.create({'url':chrome.extension.getURL('configs/options/index.html')});
        });
    },
    saveSettings : function(){
        localStorage['popupApyKey'] = $('#apikey').val();
        localStorage['popupInstaceHash'] = $('#instance_hash').val();
    },
    loadSettings : function(){
        $('#apikey').val(localStorage['popupApyKey']?localStorage['popupApyKey']:'');
        $('#instance_hash').val(localStorage['popupInstaceHash']?localStorage['popupInstaceHash']:'');
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
                });
            });
            window.close();
        } else {
            $('#error').text("Complete the data");
        }
    }
}
Popup.init()