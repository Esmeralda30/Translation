<?php
if(!file_exists('cms/lang/'.$lang.'.js')) { $lang = 'de'; } 

$allKeys = array_keys($languageToTranslate);
$l = (!isset($_SESSION["trans_language_settings"])) ? $allKeys[1] : $_SESSION["trans_language_settings"];

$header = '
<link rel="stylesheet" type="text/css" href="translator/css/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="translator/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="translator/css/font-awesome-all.min.css">
<link rel="stylesheet" type="text/css" href="translator/css/toolbar.css">';

$toolbar = '
<div id="translator_notifications"></div>
<div class="translator_toolbar">
  <div class="translator_logo"><a href="index.html"><img class="translator_logo_img" alt="Translator Logo" src="translator/img/language_white.png" >Translator</a></div> 
  <input type="hidden" value="' . $l . '" id="session">
  <div class="translator_language" id="choosen_translation_language">You\'re translating to '. $languageToTranslate[$l].'</div>
  <div class="translator_buttons">
    <div class="translator_button" id="translator_button_edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i> Edit</div>
    <div class="translator_button" id="translator_button_check" title="Save"><i class="fa-solid fa-floppy-disk"></i> Save</div>
    <div class="translator_button" id="translator_button_cancel" title="Cancel"><i class="fa-solid fa-ban"></i> Cancel</div>
    <div class="translator_button" id="translator_button_settings" data-bs-toggle="modal" data-bs-target="#translator_Settings_Modal" title="Settings"><i class="fa-solid fa-screwdriver-wrench"></i> Settings</div>
    <div class="translator_button_logout" id="translator_button_logout" title="Log out"><i class="fa-solid fa-power-off"></i> Log out</div>
  </div>
</div>

<div class="modal fade" id="translator_Settings_Modal" tabindex="-1" aria-labelledby="translator_Settings_Modal_Label" aria-hidden="true">
  <form class="langModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="translator_Settings_Modal_Label">Translator Settings</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Choose your translate language:</p>
          <div id="trans_lang_settings"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" id="formLangSubmit" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </form>
</div>
';


$footer = '
<script type="text/javascript" src="translator/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="translator/lang/'.$lang.'.js"></script>

<script type="text/javascript" src="translator/js/jquery.min.js"></script>
<script type="text/javascript" src="translator/js/tinymce-jquery.min.js"></script>
<script type="text/javascript" src="translator/js/dom-element-path.js"></script>
<script type="text/javascript" src="translator/js/bootstrap.bundle.min.js"></script>

<script type="text/javascript" src="translator/js/Notify.js"></script>
<script type="text/javascript" src="translator/js/translator.js"></script>';

?>