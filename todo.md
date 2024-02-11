!Translator funktioniert nur im Chrome Browser!

1) Im root Verzeichnis den Ordner "translator" und die Datei "translator.php" einfügen.

2) Füge die folgenden Zeilen vor <script type="text/javascript"> </script> am Ende deiner Datei (z.B. index.html).

<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script id="languageScript" type="text/javascript" src="/translator/js/language.js"></script>

3) Dem Ordner "translator/lang" folgende Rechte vergeben

Rechte:
linux: chmod 777 translator/lang