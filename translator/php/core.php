<?php
/* 
 * Translator
 * Copyright (c) Esmeralda30
 * Licensed under the MIT license
 */

session_start(); 
error_reporting(E_ALL ^ ~E_NOTICE); 



// CHECK SETTINGSFILE
if(!file_exists('translator/settings.php')) { 
    include 'translator/inc/error_settingsfile.html';
    exit();	
} else {
    include 'translator/settings.php';	
}

// CHECK DEFAULT-USERNAME
if ($username == 'admin' OR $userpassword == 'topsecret') {
    include 'translator/inc/error_logindata.html';
    exit();	
}

// LOGGEDOUT
if (isset($_GET["action"])) { 
    if ($_GET["action"] == 'logout') {	
        include 'translator/inc/loggedout.html';
        exit();	
    }
}

// LOGIN
if ($_SESSION["name"] != $username) { 
    include 'translator/inc/login.html';
    exit();	
}

$authorization = $_SESSION["authorization"];
if ($authorization != 'OK') { 
    include 'translator/inc/login.html';
    $currentfile = 'index.html';
    exit();	
    
} else {
    $currentfile = $_GET["currentfile"]; 

    if (!$currentfile) { 
        echo '<script type="text/javascript">window.location = "translator.php?currentfile=index.html";</script>';
        $currentfile = 'index.html';
    }
}


//echo $currentfile;
include 'translator/php/ganon.php';
include 'translator/php/toolbar.php';

$currentpagecontent = file_get_dom($currentfile);
$currentpagecontent('head', 0)->setInnerText($currentpagecontent('head', 0)->getInnerText().$header);
$currentpagecontent('body', 0)->setInnerText($toolbar.$currentpagecontent('body', 0)->getInnerText().$footer);

echo $currentpagecontent;


?>