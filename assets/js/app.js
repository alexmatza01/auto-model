// function createCrud(){
//     var myObject = {
//         method: $('#createForm').attr('method'),
//         url: $('#createForm').attr('action'),
//         data: $('#createForm').serialize()
//     }
//     $.ajax(myObject)
//         .done(function( msg ) {
//             if (msg === "succes") {
//                 window.location.replace("http://localhost:8000/test");
//             } else {
//                 $('input').parent().find('.text-danger').text("");
//                 var json = $.parseJSON(msg);
//                 $.each(json, function(key, item) {
//                     $('input[name="' + key + '"]').parent().find('.text-danger').text(item);
//                 });
//             }
//         });
//     alert('proba');
// };

$(function () {

    var $form = $('#createForm');

    $form.submit(function (event) {
        $form.find('.error').remove();
        event.preventDefault(); //prevent default action
        $.ajax({
            type: "POST",
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function (response) {

            if (response.success) {
                /*  submit the form*/
                window.location.redirect("http://127.0.0.1:8000/test");

            } else {
                $.each(response.errors, function (key, message) {
                    $form.find('[id="form_' + key + '"]')
                        .parents('.form-group')
                        .append('<div class="error col-md-12">' + message + '</div>');
                });
            }
        });
        /* prevent default when submit button clicked*/

        return false;

    });
});

$(function () {
    // $form.submit(function (event) {
    //     event.preventDefault();
    // });
    $('body').on('submit', '#createDomo', function () {
        var $form = $(this);

        var myObject = {
            type: "POST",
            url: $form.attr('action'),
            data: $form.serialize()
        };
        $.ajax(myObject)
            .done(function (html) {
                if (html.success == true) {
                    window.location.href = "http://127.0.0.1:8000/index";
                }
                $('#createDomo').replaceWith(
                    // ... with the returned one from the AJAX response.
                    $(html).find('#createDomo')
                );
            });
        return false;
    });
});

$(function ($) {
    // When sport gets selected ...
    $('body').on('change', '#domo_counties', function () {
        var $county = $(this);
        // ... retrieve the corresponding form.
        var $form = $(this).closest('form');
        // Simulate form data, but only include the selected sport value.
        var data = {};
        data[$county.attr('name')] = $county.val();
        // Submit data via AJAX to the form's action path.
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: data,
            success: function (html) {
                // Replace current position field ...
                $('#domo_cities').replaceWith(
                    // ... with the returned one from the AJAX response.
                    $(html).find('#domo_cities')
                );
                // Position field now displays the appropriate positions.
            }
    });
    });
});