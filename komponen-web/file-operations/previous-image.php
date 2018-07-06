<?php
    if($_GET["directory"] !== "" && $_GET["image_name"] !== "") {
        $files = $images = array();
        $images[] = "Nothing";

        $content = scandir( $_GET["directory"]);

        for($x = 0; $x < count($content); ++$x) {
            $path2 = $_GET["directory"] . $content[$x];

            if(pathinfo($path2, PATHINFO_EXTENSION) === "jpeg" || pathinfo($path2, PATHINFO_EXTENSION) === "jpg" || 
                pathinfo($path2, PATHINFO_EXTENSION) === "gif" || pathinfo($path2, PATHINFO_EXTENSION) === "png")  {
                $images[] = $content[$x];
            }
        }

        for($x = 0; $x < count($images); ++$x) {
            if($images[$x] == $_GET["image_name"]) {
                --$x;
                echo $images[$x];
                $isFound = true;
                break;
            }
        }
    }

    if(!isset($isFound)) {
        echo "Nothing";
    }
?>