1) Im root Verzeichnis füge den Ordner "translator" und die Datei "translator.php" ein.

2) Füge diese zwei Zeilen vor <script type="text/javascript"> </script> am Ende deiner Datei (z.B. index.html).

<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script id="languageScript" type="text/javascript" src="/translator/js/language.js"></script>


Rechte:
chmod 777 translator/lang