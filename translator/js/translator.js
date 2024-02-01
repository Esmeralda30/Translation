/* 
 * Translator
 * Copyright (c) 2023 Bickert Web & Design
 * Licensed under the MIT license
 * https://bickert-web-design.de 
 */

/* ------------------------------------------------------------------------------- */

var jsonTranslationFile = "translator/lang/translation.json";
var currenturl = document.URL.split("translator.php")[0];

/* ------------------------------------------------------------------------------- */

function addLinkListener() {
  $('a').click(function (e) {
    var target = $(this).attr("href");
    target = target.replace(currenturl, '');

    if (this.host !== location.host) {
      e.preventDefault();
      //notify(external_link, 5000);
    } else if (/#/i.test(target)) {
      e.preventDefault();
      window.location.href = 'translator.php?currentfile=' + target;
    } else {
      e.preventDefault();

      if (!$('body').hasClass('editing'))
        window.location.href = 'translator.php?currentfile=' + target;
      else
        console.log('Um eine andere Seite aufrufen zu können, müssen Sie erst speichern oder abbrechen.');
      //notify('Um eine andere Seite aufrufen zu können, müssen Sie erst speichern oder abbrechen.', 5000);
    }
  });
}

/* ------------------------------------------------------------------------------- */

function getUniqueArray(unique) {
  if (jQuery.inArray("div.translator_logo", unique) != -1)
    unique.splice(jQuery.inArray("div.translator_logo", unique), 1);
  if (jQuery.inArray("div.translator_pagetitle", unique) != -1)
    unique.splice(jQuery.inArray("div.translator_pagetitle", unique), 1);
  if (jQuery.inArray("div.translator_buttons", unique) != -1)
    unique.splice(jQuery.inArray("div.translator_buttons", unique), 1);
  if (jQuery.inArray("div#translator_button_edit", unique) != -1)
    unique.splice(jQuery.inArray("div#translator_button_edit", unique), 1);
  if (jQuery.inArray("div#translator_button_check", unique) != -1)
    unique.splice(jQuery.inArray("div#translator_button_check", unique), 1);
  if (jQuery.inArray("div#translator_button_settings", unique) != -1)
    unique.splice(jQuery.inArray("div#translator_button_settings", unique), 1);
  if (jQuery.inArray("div#translator_button_cancel", unique) != -1)
    unique.splice(jQuery.inArray("div#translator_button_cancel", unique), 1);
  if (jQuery.inArray("div#translator_button_logout", unique) != -1)
    unique.splice(jQuery.inArray("div#translator_button_logout", unique), 1);
  if (jQuery.inArray("div.translator_notifications", unique) != -1)
    unique.splice(jQuery.inArray("div.translator_notifications", unique), 1);
  if (jQuery.inArray("div.translator_language", unique) != -1)
    unique.splice(jQuery.inArray("div.translator_language", unique), 1);
  if (jQuery.inArray("div.translator_toolbar", unique) != -1)
    unique.splice(jQuery.inArray("div.translator_toolbar", unique), 1);
  if (jQuery.inArray("div#choosen_translation_language", unique) != -1)
    unique.splice(jQuery.inArray("div#choosen_translation_language", unique), 1);
  if (jQuery.inArray("div#translator_Settings_Modal", unique) != -1)
    unique.splice(jQuery.inArray("div#translator_Settings_Modal", unique), 1);

  return unique;
}

function getAllTextTagPaths() {
  var entry = $("address, article, aside, blockquote, canvas, dd, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, noscript, ol, p, pre, section, table, tfoot, ul, video").map(function () {
    if ($(this).find("img").length == 0 && ($(this).get(0).id || this.className)) {
      var textTag = this.tagName.toLowerCase();
      if ($(this).get(0).id)
        textTag += "#" + $(this).get(0).id;
      if (!$(this).get(0).id && this.className)
        textTag += "." + this.className.replace(/ /g, '.');
      return textTag;
    }
  }).get();

  var entryReduce = $(entry).map(function (index, element) {
    if ($(element).find("img").length == 0)
      return element;
  }).get();

  var unique = entryReduce.reduce((prev, cur) => (prev.indexOf(cur) === -1) ? [...prev, cur] : prev, []);

  $.ajax({
    url: "translator/php/executed.php",
    dataType: 'json',
    async: false,
    error: function () {
        console.log("An error has occured!");
    },
    success: function (data) {
      $(data).map(function (key, val) {
        if ($.inArray(val, unique) != -1)
        unique.splice( $.inArray(val, unique), 1 );
      });
    }
  });

  //console.log("entryReduce: " + unique);

  return getUniqueArray(unique).join(", ");
}

/* ------------------------------------------------------------------------------- */

function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    (activeElTagName == "textarea") || (activeElTagName == "input" &&
    /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart == "number")
  ) {
      text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
      text = window.getSelection().toString();
  }
  return text;
}

function getSettingsForGoogleTranslation(textToTranslate) {
  return {
    url: 'https://translation.googleapis.com/language/translate/v2',
    method: 'POST',
    data: {
      q: textToTranslate,
      target: $('#session').val(),
      format: 'html',
      source: 'de',
      model: 'nmt',
      key: 'AIzaSyCl7fNcKez_eNIoGrz1wLBX6oyiFuLkcXk'
    }
  };
}

function activateTinymce() {
  var tagPathArray = getAllTextTagPaths();
  tinymce.init({
    selector: tagPathArray,
    menubar: false,
    inline: true,
    plugins: ['link', 'lists', 'autolink'],
    toolbar: [
      'undo redo | bold italic underline | fontfamily fontsize',
      'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent |',
      'TranslatorText | TranslatorTag | TranslatorBlock'
    ],
    setup: function(editor) {
      editor.ui.registry.addButton('TranslatorText', {
        text: 'Translator Text',
        onAction: function(_) {
          var selectedText = getSelectionText();
          var selectedTextID = document.getSelection().anchorNode.ownerDocument.activeElement.id;
          
          $.ajax(getSettingsForGoogleTranslation(selectedText)).done(function (response) {
            $('#' + selectedTextID).html($('#' + selectedTextID).html().replace(selectedText, response.data.translations[0].translatedText));
          });
        }
      });
      editor.ui.registry.addButton('TranslatorTag', {
        text: 'Translator Tag',
        onAction: function(_) {
          var selectedTag = document.getSelection().anchorNode.parentElement.outerHTML;
          var selectedTextID = document.getSelection().anchorNode.ownerDocument.activeElement.id;
          
          $.ajax(getSettingsForGoogleTranslation(selectedTag)).done(function (response) {
            $('#' + selectedTextID).html($('#' + selectedTextID).html().replace(selectedTag, response.data.translations[0].translatedText));
          });
        }
      });
      editor.ui.registry.addButton('TranslatorBlock', {
        text: 'Translator Block',
        onAction: function(_) {
          var selectedBlock = document.getSelection().anchorNode.parentElement.parentElement.outerHTML;
          
          $.ajax(getSettingsForGoogleTranslation(selectedBlock)).done(function (response) {
            $("#" + document.getSelection().anchorNode.parentElement.offsetParent.id).html(response.data.translations[0].translatedText);
          });
        }
      });
    }
  });
}

function disableTinymce() {
  tinymce.remove();
  $('[id^="mce_"]').removeClass("mce-content-body").removeAttr('id').removeAttr('spellcheck').removeAttr('data-mce-selected').removeAttr('contenteditable');
}

/* ------------------------------------------------------------------------------- */

function getAllTranslations(lang) {
  $.getJSON(jsonTranslationFile, function (data) {
    $.each(data, function (key, val) {
      $.each(val.translation, function (k, v) {
        if (v.lang == lang)
          $(val.tag).html(v.text);
      })
    });
  });
}

/* ------------------------------------------------------------------------------- */

function edit() {
  
  $('#translator_button_edit, #translator_button_settings').hide();
  $('#translator_button_check, #translator_button_cancel, #choosen_translation_language').show();

  getAllTranslations($('#session').val());

  var response = jQuery.ajax({
    url: jsonTranslationFile,
    type: 'HEAD',
    async: false
  }).status;

  if (response == "404") {
    $.ajax({
      type: 'POST',
      url: 'translator/php/save.php',
      async: false,
      data: {
        data: JSON.stringify(getDefaultLanguage())
      }
    }).done(function () {
      console.log("The file was created.");
    }).fail(function () {
      console.log("The file can't be created.");
    });
  } else if (response == "200") {
    checkDefaultLanguage();
  }

  activateTinymce();
}

/* ------------------------------------------------------------------------------- */

function getTagPaths() {
  const entry = $("address, article, aside, blockquote, canvas, dd, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, noscript, ol, p, pre, section, table, tfoot, ul, video").map(function () {
    var p = domElementPath(this);
    if ($(p).find("img").length == 0)
      return p;
  }).get();

  var unique = entry.reduce((prev, cur) => (prev.indexOf(cur) === -1) ? [...prev, cur] : prev, []);

  $.ajax({
    url: "translator/php/executed.php",
    dataType: 'json',
    async: false,
    error: function () {
        console.log("An error has occured!");
    },
    success: function (data) {
      $(data).map(function (key, val) {
        if ($.inArray(val, unique) != -1)
          unique.splice( $.inArray(val, unique), 1 );
      });
    }
  });

  return getUniqueArray(unique);
}

function getDefaultLanguage() {
  const tagPaths = getTagPaths();

  var jsonObj = [];
  $(tagPaths).map(function (index, tag) {
    jsonObj.push({
      'host': window.location.hostname,
      'tag': tag,
      'translation': [{
        'lang': "default",
        'text': $(tag).html()
      }]
    });
  });

  return jsonObj;
}

function checkDefaultLanguage() {
  var defaultData = getDefaultLanguage();

  $.getJSON(jsonTranslationFile, function (d) {
    $.each(defaultData, function (index, jObj) {
      $.each(d, function (key, val) {
        if (val.host == jObj.host && val.tag == jObj.tag) {
          $.each(val.translation, function (k, t) {
            if (t.lang == jObj.translation[0].lang && t.text != jObj.translation[0].text) {
              t.text = jObj.translation[0].text;
            } else {
              return true;
            }
          });
        } else
          return true;
      });
    });

    $.ajax({
      type: 'POST',
      url: 'translator/php/save.php',
      async: false,
      data: {
        data: JSON.stringify(d)
      }
    }).done(function () {
      console.log("The default translation was updated successfully.");
    }).fail(function () {
      console.log("The default translation couldn't be updated.");
    });
  });
}

/* ------------------------------------------------------------------------------- */

function save() {
  disableTinymce();

  var sessionLang = $('#session').val();
  var tagPaths = getTagPaths();
  
  $.getJSON(jsonTranslationFile, function (transFile) {
    $.each(tagPaths, function (i, path) {
      $.each(transFile, function (key, val) {
        if (val.tag == path) {
          const l = val.translation.map(valT => valT.lang);
          const t = val.translation.map(valT => valT.text);

          if (l.includes(sessionLang)) {
            $.each(val.translation, function (k, tFile) {
              if (tFile.lang == sessionLang && tFile.text != $(path).html())
                tFile.text = $(path).html();
              else
                return true;
            });
          } else if (!t.includes($(path).html())) {
            val.translation.push({
              lang: sessionLang,
              text: $(path).html()
            });
          } else
            return true;
        } else
          return true;
      });
    });

    $.ajax({
      type: 'POST',
      url: 'translator/php/save.php',
      async: false,
      data: {
        data: JSON.stringify(transFile)
      }
    }).done(function () {
      console.log("The translation was added successfully.");
      location.reload();

    }).fail(function () {
      console.log("The translation couldn't be added.");
    });
  });

  activateTinymce();
}

/* ------------------------------------------------------------------------------- */

function cancel() {
  tinymce.remove();
  location.reload();
}

/* ------------------------------------------------------------------------------- */

function logout() {
  $.ajax({
    type: "POST",
    url: "translator/php/logout.php",
    async: false,
    success: function (response) {
      var currentfile = document.URL.split('currentfile=')[1];
      window.location.href = 'translator.php?action=logout&currentfile=' + currentfile;
    }
  });
}

/* ------------------------------------------------------------------------------- */

$(document).ready(function () {
  addLinkListener();

  $('#translator_button_edit').click(function () { edit(); });
  $('#translator_button_check').click(function () { save(); });
  $('#translator_button_cancel').click(function () { cancel(); });
  $('#translator_button_logout').click(function () { logout(); });

  $('#translator_Settings_Modal').on('show.bs.modal', function () {
    disableTinymce();
    $.get("translator/php/translator_settings.php", function(data) {
      $("#trans_lang_settings").append(data);
    });
  });

  $("#formLangSubmit").click(function (e) {
    $.ajax({
      type: "POST",
      url: "translator/php/save_settings.php",
      data: $('form.langModal').serialize(),
      success: function (msg) {
        $("#translator_Settings_Modal").modal('hide');
      },
      error: function () {
        console.log("failure");
      }
    });
  });

  $('#translator_Settings_Modal').on('hidden.bs.modal', function () {
    $('#lang_radio_group').remove();
    activateTinymce();
  });
});