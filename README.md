# Translator

## About
Translator funktioniert anders als andere Translator: Übersetzungen können direkt in bereits bestehende, statische HTML-Webseiten erfolgen. 
Übersetzungen werden in einer JSON-Datei gespeichert und direkt auf der Webseite angezeigt.

Die Idee ist dabei den Benutzern zu ermöglichen einfach und schnell die Übersetzungen zu erstellen.
Bei schwierigkeiten kann auch eingebauter Google Übersetzer helfen. Dabei kann der Benutzer zwischen einzelnen Wörtern, Tags oder ganzen Blöcke wählen. 

> [!WARNING]
> **Translator funktioniert nur in Chrome Browser.**

## How To
1. Im root Verzeichnis den Ordner "translator" und die Datei "translator.php" einfügen.
2. Füge die folgenden Zeilen vor `<script type="text/javascript"> </script>` am Ende deiner Datei (z.B. index.html).
   - `<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>`
   - `<script id="languageScript" type="text/javascript" src="/translator/js/language.js"></script>`
3. Dem Ordner "translator/lang" folgende Rechte vergeben
   - linux: chmod 777 translator/lang
4. Um die Funktion "Google Überstzer" zu nutzen, füge in der Datei translation/js/translator.js in der Zeile 104 Cloud Translation API Schlüssel.
   (Es reicht vollkommen aus wenn Basic edition (v2) verwendet wird) 

## Einloggen
"www.deine-url.de/translator" aufrufen und anmelden