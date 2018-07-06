<?php
        $newFolderName;
        $oldFolderName;

        function renameFolder($path) {
                global $newFolderName, $oldFolderName;

                $contents = glob($path . "*");

                for($x = 0; $x < count($contents); ++$x) {
                        if(is_dir($contents[$x])) {
                                mkdir(str_replace($oldFolderName, $newFolderName, $contents[$x]));
                                renameFolder($contents[$x] . "/");
                        } else {
                                copy($contents[$x], str_replace($oldFolderName, $newFolderName, $contents[$x]));
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

        if($_GET["type"] === "file") {
                $newFileName = $_GET["path"] . $_GET["new_name"] . "." . pathinfo($_GET["path"] . $_GET["name"], PATHINFO_EXTENSION);

                if(file_exists($newFileName)) {
                        echo "<div>Nama file telah ada!</div>";
                } else {
                        rename($_GET["path"] . $_GET["name"], $newFileName);
                }
        } else {
                $newFolderName = $_GET["path"] . $_GET["new_name"];
                $oldFolderName = $_GET["path"] . $_GET["name"] . "/";

                if(is_dir($newFolderName)) {
                        echo "<div>Nama folder telah ada!</div>";
                } else {
                        mkdir($newFolderName);
                        $newFolderName .= "/";

                        renameFolder($oldFolderName);
                        removeFolder($oldFolderName);
                }
        }

?>