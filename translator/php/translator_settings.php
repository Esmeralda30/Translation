<?php
/* 
 * Translator
 * Copyright (c) 2023 Bickert Web & Design
 * Licensed under the MIT license
 * https://bickert-web-design.de 
 */

include '../settings.php';

session_start(); 
error_reporting(E_ALL ^ ~E_NOTICE); 

$allKeys = array_keys($languageToTranslate);
$l = (!isset($_SESSION["trans_language_settings"])) ? $allKeys[1] : $_SESSION["trans_language_settings"];
?>

<div id="lang_radio_group" class="lang_group">

<?php
foreach($languageToTranslate as $key => $val){
  if($key != "default"){
    echo '<div class="radio_lang"><input type="radio" id="trans_lang_'.$key.'" name="trans_language" value="'.$key.'"' . (($key == $l) ? ' checked ' : '') . '><label for="trans_lang_'.$key.'">'.$val.'</label></div>'; 
  }
} 
?>

</div>
