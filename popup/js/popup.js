var Popup = {
    init: function() {
        $(".btn-create").on('click', function() {
            Popup.send();
        })
    },
    send: function() {
        var apikey = $("#apikey").val();
        var instance_hash = $("#instance_hash").val();
        if(apikey != "" && instance_hash != "") {
            var olapic_send = {
                olapic: {
                    apikey: apikey,
                    instance_hash: instance_hash
                }
            };

            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, olapic_send,
                    function(response) {
                        console.log(response.msg);
                    }
                );
            });
        } else {
            alert("Complete todos los datos!")
        }
    }
}
Popup.init()