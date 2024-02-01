<?php
/* 
 * Translator
 * Copyright (c) 2023 Bickert Web & Design
 * Licensed under the MIT license
 * https://bickert-web-design.de 
 */

session_start();

if ($_SESSION["authorization"] == 'OK') {
  include '../settings.php';
}

$_SESSION["authorization"] = '';

?>