<?php
    $newFolderLocation;
    $oldFolderLocation;

    function renameFolder($path) {
        global $newFolderLocation, $oldFolderLocation;

        $contents = glob($path . "*");

        for($x = 0; $x < count($contents); ++$x) {
            if(is_dir($contents[$x])) {
                mkdir(str_replace($oldFolderLocation, $newFolderLocation, $contents[$x]));
                renameFolder($contents[$x] . "/");
            } else {
                copy($contents[$x], str_replace($oldFolderLocation, $newFolderLocation, $contents[$x]));
            }
        }
    }

    function removeFolder($path) {
        $files = glob($path . "*");

        foreach($files as $file) { 
            if(is_dir($file)) {
                removeFolder($file . "/");
            } else {
                unlink($file);
            } 
        }
    
        rmdir($path);
    }

    if(isset($_GET["from"])) {
        if(is_file($_GET["from"])) {
            $newFileLocation = $_GET["to"] . pathinfo($_GET["from"], PATHINFO_BASENAME);

            if(file_exists($newFileLocation)) {
                echo "<div>Nama file telah ada!</div>";
            } else {
                rename($_GET["from"], $newFileLocation);
            }
        } else {
            $newFolderLocation = $_GET["to"] . pathinfo($_GET["from"], PATHINFO_BASENAME);
            $oldFolderLocation = $_GET["from"] . "/";

            if(is_dir($newFolderLocation)) {
                echo "<div>Nama folder telah ada!</div>";
            } else {
                mkdir($newFolderLocation);
                $newFolderLocation .= "/";

                renameFolder($oldFolderLocation);
                removeFolder($oldFolderLocation);
            }
        } 
    } else {
            echo "<div>Alamat tidak ada!</div>";
    }
?>