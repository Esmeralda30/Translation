<?php
/* 
 * Translator
 * Copyright (c) 2023 Bickert Web & Design
 * Licensed under the MIT license
 * https://bickert-web-design.de 
 */

session_start(); 
error_reporting(E_ALL ^ ~E_NOTICE); 

$trans_lang = htmlspecialchars($_POST["trans_language"] ?? '');

$_SESSION["trans_language_settings"] = $trans_lang;

print $trans_lang;

?>