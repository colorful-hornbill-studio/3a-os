<?php
    if($_GET["directory"] !== "" && $_GET["video_name"] !== "") {
        $files = $images = array();
        $videos[] = "Nothing";

        $content = scandir( $_GET["directory"]);

        for($x = 0; $x < count($content); ++$x) {
            $path2 = $_GET["directory"] . $content[$x];

            if(pathinfo($path2, PATHINFO_EXTENSION) === "webm" || pathinfo($path2, PATHINFO_EXTENSION) === "mp4")  {
                $videos[] = $content[$x];
            }
        }

        for($x = 0; $x < count($videos); ++$x) {
            if($videos[$x] == $_GET["video_name"]) {
                --$x;
                echo $videos[$x];
                $isFound = true;
                break;
            }
        }
    }

    if(!isset($isFound)) {
        echo "Nothing";
    }
?>