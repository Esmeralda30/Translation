<?php
/* 
 * Translator
 * Copyright (c) Esmeralda30
 * Licensed under the MIT license
 */

include '../settings.php';
?>

<link rel="stylesheet" type="text/css" href="translator/css/language.css" />

<div class="langPanel">
  <div class="langItem">
    <div class="RightLanguageIcon flexContainer aligncenter justifycenter">
      <img alt="" src="translator/img/language_white.png">
    </div>
    <div class="RightLanguage flexContainer aligncenter">
      <label for="langToTranslateIndex">Choose a language:</label>
      <select name="langToTranslateIndex" id="langToTranslateIndex">
        <?php
          foreach ($languageToTranslate as $key => $value) {
            echo '<option value="'. $key .'">'. $value .'</option>';
          }
        ?>
      </select>
   </div>
  </div>
</div>

