
var options = {
    init : function(){
        this.searchRows();
    },
    deleteActions: function(){
        var _self = this
            ele = null;
        $('.btn-remove').click(function(e){
            ele = this;
            _self.deleteItem($(this).attr('rel'), function(){
                $(ele).parents('tr:first').remove();
            });
        });
    },
    searchRows : function(){
        var theTr = obj = null,
            x = i = 0;

        for (x in localStorage){
            i ++;
            obj = JSON.parse(localStorage[x]);
            theTr = '<tr><td>'+i+'</td><td>'+x+'</td><td>'+obj.instanceData.instance_hash+'</td><td>'+obj.instanceData.apikey+'</td><td><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default btn-remove" rel="'+x+'">Remove</button></div></td></tr>';
            $('#instancesList tbody').append(theTr);
        }

        this.deleteActions();
    },
    deleteItem : function(url, callback){
        localStorage.removeItem(url);
        callback();
    }
};
options.init();