/* 
 * Translator
 * Copyright (c) Esmeralda30
 * Licensed under the MIT license
 */

$(document).ready(function () {

    $('#name').focus();

    // If the user presses the "Enter" key on the keyboard
    $('body').keypress(function (event) {
        if (event.which == 13) { checkLogindata(); } 
    });

    $('.translator_button_login').click(function () {
        checkLogindata();
    });

    var isChrome = !!window.chrome;
    if (!isChrome) {
        $('#form_bottom').append('<div class="chromenotice">Für die &Uuml;bersetzung der Website mit <b>Bickert Web & Design Translator</b> sollten Sie Google Chrome verwenden!<br>Google Chrome kann <a href="https://www.google.de/chrome" target="_blank">hier</a> kostenlos heruntergeladen und installiert werden.</div>');
    }
});

// -------------------------------------------------------------------------------------------- //

function checkLogindata() {

    name = $('#name').val();
    password = $('#password').val();

    $.ajax({
        type: "POST",
        url: "translator/php/login.php",
        data: "name=" + name + "&password=" + password,
        success: function (response) {
            $('.translator_button_login').spin(false);

            if (response == 'OK') {
                $('.input_container, .input_container:focus, .input_container:hover, .input_container:active').css('border', '2px solid green').css('color', 'green');
                $('input').css('opacity', '1').delay(1000).queue(function () {
                    document.login.submit();
                });
            }

            if (response == 'NO') {
                $('.input_container, .input_container:focus, .input_container:hover, .input_container:active').css('border', '2px solid #f00').css('color', '#f00');
                $('#password, .translator_button_login').delay(500).queue(function () {
                    location.reload(true);
                });
            }
        }
    });
}

// -------------------------------------------------------------------------------------------- //

$(document).ready(function () {

    var currentfile = document.URL.split('currentfile=')[1];
    if (currentfile) { currentfile = currentfile.split('#')[0]; }

    $('#gotosite, #gotowebsite').attr('onclick', "location.href='" + window.location.origin + "'");
    $('#gotologin').attr('onclick', "location.href='translator.php?currentfile=" + currentfile + "'");
});