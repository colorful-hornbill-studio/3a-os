<html>
    <head lang="eng-us">
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
            File Download
        </title>
    </head>
    <body>
        <?php
            if(isset($_GET["path"]) && file_exists($_GET["path"])) {
                header("Content-Description: File Transfer");
                header("Content-Type: application/octet-stream");
                header("Content-Disposition: attachment; filename=\"" . basename($_GET["path"]) . "\"");
                header("Expires: 0");
                header("Cache-Control: must-revalidate");
                header("Content-Length: " . filesize($_GET["path"]));
                flush();
                readfile($_GET["path"]);
                exit;
            }

            echo "<script>history.go(-1)</script>";
        ?>
    </body>
</html>