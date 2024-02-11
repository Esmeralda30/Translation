<?php
/* 
 * Translator
 * Copyright (c) Esmeralda30
 * Licensed under the MIT license
 */

session_start(); 
error_reporting(E_ALL ^ ~E_NOTICE); 

$trans_lang = htmlspecialchars($_POST["trans_language"] ?? '');

$_SESSION["trans_language_settings"] = $trans_lang;

print $trans_lang;

?>