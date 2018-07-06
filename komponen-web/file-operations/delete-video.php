<?php
    $isFound = false;

    if($_GET["directory"] !== "" && $_GET["video_name"] !== "") {
        $files = $images = array();

        $content = scandir($_GET["directory"]);
        $y = 0;
        $z = -1;

        for($x = 0; $x < count($content); ++$x) {
            $path2 = $_GET["directory"] . $content[$x];

            if(pathinfo($path2, PATHINFO_EXTENSION) === "webm" || pathinfo($path2, PATHINFO_EXTENSION) === "mp4")  {
                $images[] = $content[$x];
            }
        }

        for($x = 0; $x < count($images); ++$x) {
            ++$y;

            if($images[$x] == $_GET["video_name"] && isset($images[$y])) {
                echo $images[$y];
                $isFound = true;
                break;
            } else if($images[$x] == $_GET["video_name"] && isset($images[$z])) {
                echo $images[$z];
                $isFound = true;
                break;
            }

            ++$z;
        }

        $path = $_GET["directory"] . $_GET["video_name"];
        unlink($path);
    }

    if(!$isFound) {
        echo "Nothing";
    }
?>