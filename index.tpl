<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Boo</title>
        <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="lib/phaser.2.6.2.min.js" type="text/javascript"></script>
        {scripts_html}
    </head>
    <body>
        <div id="canvas-div"></div>
        {links_html}
        <script type="text/javascript" src="{game}"></script>
        <script>
            window.onload = function() {
                //document.querySelector("#canvas-div canvas").focus();
            }
        </script>
    </body>
</html>