<?php
    if(is_dir($_GET["path"])) {
        echo "<div>Folder telah ada!</div>";
    } else {
        mkdir($_GET["path"]);
    }
?>