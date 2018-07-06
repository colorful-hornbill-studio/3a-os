<?php
    function removeFolder($path) {
        $files = glob($path . "/*");

        foreach($files as $file) { 
            if(is_dir($file)) {
                removeFolder($file);
            } else {
                unlink($file);
            } 
        }

        rmdir($path);
    }

    removeFolder($_GET["path"]);
?>