<?php
/* 
 * Translator
 * Copyright (c) Esmeralda30
 * Licensed under the MIT license
 */

session_start();

if ($_SESSION["authorization"] == 'OK') {
  include '../settings.php';
}

$_SESSION["authorization"] = '';

?>