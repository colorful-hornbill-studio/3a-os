<?php
    if($_GET["directory"] !== "" && $_GET["video_name"] !== "") {
        $files = $videos = array();

        $content = scandir( $_GET["directory"]);
        $y = 0;

        for($x = 0; $x < count($content); ++$x) {
            $path2 = $_GET["directory"] . $content[$x];

            if(pathinfo($path2, PATHINFO_EXTENSION) === "webm" || pathinfo($path2, PATHINFO_EXTENSION) === "mp4")  {
                $videos[] = $content[$x];
            }
        }

        for($x = 0; $x < count($videos); ++$x) {
            ++$y;

            if($videos[$x] == $_GET["video_name"] && isset($videos[$y])) {
                echo $videos[$y];
                $isFound = true;
                break;
            }
        }
    }

    if(!isset($isFound)) {
        echo "Nothing";
    }
?>