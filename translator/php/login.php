<?php
/* 
 * Translator
 * Copyright (c) 2023 Bickert Web & Design
 * Licensed under the MIT license
 * https://bickert-web-design.de 
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