<?php
    $path = $_GET["path"];
    echo filesize($path) . " Byte</div><div>Date Created: <br/>&nbsp;" . date("F d y, H:i:s", filectime($path)) . "</div><div>Date Modified: <br/>&nbsp;" . date("F d y, H:i:s", filemtime($path)) . "</div><div>Date Last Accessed: <br/>&nbsp;" . date("F d y, H:i:s", fileatime($path));
?>