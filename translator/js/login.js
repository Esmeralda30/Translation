/* 
 * Translator
 * Copyright (c) 2023 Bickert Web & Design
 * Licensed under the MIT license
 * https://bickert-web-design.de 
 */

$(document).ready(function () {

    $('#name').focus();

    $('input').keypress(function (event) {
        $('input').css('border', '1px solid #ddd').css('color', '#666').removeClass('wrong_name').removeClass('wrong_password');
        $('.translator_button_login').removeClass('wrong_password');
    });

    $('body').keypress(function (event) {
        if (event.which == 13) { checkLogindata(); }
    });


    $('.translator_button_login').click(function () {
        checkLogindata();
    });

    var isChrome = !!window.chrome;
    if (!isChrome) {
        $('.translator_login').append('<div class="chromenotice">Für die &Uuml;bersetzung der Website mit <b>Bickert Web & Design Translator</b> sollten Sie Google Chrome verwenden!<br>Google Chrome kann <a href="https://www.google.de/chrome" target="_blank">hier</a> kostenlos heruntergeladen und installiert werden.</div>');
    }
});

// -------------------------------------------------------------------------------------------- //

function checkLogindata() {

    $('.translator_button_login i').hide();

    name = $('#name').val();
    password = $('#password').val();

    $.ajax({
        type: "POST",
        url: "translator/php/login.php",
        data: "name=" + name + "&password=" + password,
        success: function (response) {
            $('.translator_button_login').spin(false);

            /*if (response == 'NO') { 
              $('input').css('border', '1px solid #f00').css('color', '#f00'); 
              $('#name').addClass('wrong_name');
              $('#password, .translator_button_login').addClass('wrong_password');
              $('.translator_button_login i').show();
            }	*/

            if (response == 'OK') {
                $('input').css('border', '1px solid green').css('color', 'green');
                $('input').css('opacity', '1').delay(1000).queue(function () {
                    document.login.submit();
                });
            }

            if (response == 'NO') {
                $('input').css('border', '1px solid #f00').css('color', '#f00');
                $('#name').addClass('wrong_name');
                $('#password, .translator_button_login').addClass('wrong_password').delay(500).queue(function () {
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

    console.log("currentfile: " + currentfile);

    $('#gotosite').attr('onclick', "location.href='" + currentfile + "'");
    $('#gotologin').attr('onclick', "location.href='translator.php?currentfile=" + currentfile + "'");

});