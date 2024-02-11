<?php
/* 
 * Translator
 * Copyright (c) Esmeralda30
 * Licensed under the MIT license
 */


$jsonfile = '../lang/translation.json';

if(isset($_POST["data"])){
	$data = json_decode($_POST['data']);
	$jsonString = json_encode($data, JSON_PRETTY_PRINT);
	
	$fp = fopen($jsonfile, 'w');
	fwrite($fp, $jsonString);
	fclose($fp);

} else {
	fopen($jsonfile, "w") or die("Unable to open file!");
}


?>