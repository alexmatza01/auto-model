function createCrud(){
    var myObject = {
        method: $('#createForm').attr('method'),
        url: $('#createForm').attr('action'),
        data: $('#createForm').serialize()
    }
    $.ajax(myObject)
        .done(function( msg ) {
            if (msg === "succes") {
                window.location.replace("http://localhost:8000/test");
            } else {
                $('input').parent().find('.text-danger').text("");
                var json = $.parseJSON(msg);
                $.each(json, function(key, item) {
                    $('input[name="' + key + '"]').parent().find('.text-danger').text(item);
                });
            }
        });
};