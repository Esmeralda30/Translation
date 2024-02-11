<?php
/* 
 * Translator
 * Copyright (c) Esmeralda30
 * Licensed under the MIT license
 */

session_start();

include '../settings.php';

$name = htmlspecialchars($_POST["name"] ?? '');
$password = htmlspecialchars($_POST["password"] ?? '');

if ($name == $username && $password == $userpassword){ 
    echo 'OK'; 
    $_SESSION["authorization"] = 'OK';
    $_SESSION["name"] = $name;
} else {
    echo 'NO'; 
}


?>