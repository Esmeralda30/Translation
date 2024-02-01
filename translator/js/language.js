/* 
 * Translator
 * Copyright (c) 2023 Bickert Web & Design
 * Licensed under the MIT license
 * https://bickert-web-design.de 
 */

/* ------------------------------------------------------------------------------- */

var jsonTranslationFile = "translator/lang/translation.json";

/* ------------------------------------------------------------------------------- */

function getAllTranslations(lang) {
  
  $.getJSON(jsonTranslationFile, function (data) {
    $.each(data, function (key, val) {
      $.each(val.translation, function (k, v) {
        if(v.lang == lang)
          $(val.tag).html(v.text);
      })
    });
  });
}

/* ------------------------------------------------------------------------------- */

var isChrome = !!window.chrome;
var response = jQuery.ajax({
  url: jsonTranslationFile,
  type: 'HEAD',
  async: false
}).status;

if(isChrome && window.location.href.indexOf("translator") == -1 && response == "200"){
  $.get("translator/php/lang_panel.php", function(data) {
    $("#languageScript").before(data);
  });
}

/* ------------------------------------------------------------------------------- */

$(document).ready(function () {

  $("#langToTranslateIndex").change(function() {
    getAllTranslations("default");
    getAllTranslations(this.value);
  });
});