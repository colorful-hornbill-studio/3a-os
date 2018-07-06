<!DOCTYPE html>
<html>
    <head lang="en-us">
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
            Photo Viewer
        </title>
        <link rel="stylesheet" type="text/css" href="/3a-os/style/style1.css" />
        <link rel="stylesheet" type="text/css" href="/3a-os/komponen-web/open-file/style.css" />
        <link rel="stylesheet" type="text/css" href="/3a-os/applications/photo-viewer/style.css" />
    </head>
    <body onload="setFileManager(location.pathname, 'image'); setPhotoViewer()">
        <?php
            $path = "";

            echo "<script>" . 
                    "isImageSet = false" .
                "</script>";

            if(isset($_GET["file_name"]) && isset($_GET["directory"])) {
                $image = $_GET["file_name"];
                $directory = $_GET["directory"];

                $path = $directory . $image;
            }
        ?>
        <div id="bar" onmouseover="this.style.display = 'block'" onmouseout="this.nextElementSibling.style.display = 'block'; 
            this.style.display = 'none'">
            <button type="button" onclick="showFileManager()">
                <img src="/3a-os/pictures/komponen-web/picture.svg" width="40" height="40" />
            </button><!--
            --><button type="button" onclick="deleteImage()">
                <img src="/3a-os/pictures/komponen-web/delete-button.svg" width="40" height="40" />
            </button><!--
            --><button type="button" id="slide-button" onclick="startSlideshow()">
                <img src="/3a-os/pictures/komponen-web/play-slideshow-button.svg" width="40" height="40" />
            </button><!--
            --><button type="button" onclick="rotateImage()">
                <img src="/3a-os/pictures/komponen-web/update-arrow.svg" width="40" height="40" />
            </button><!--
            --><button type="button" onclick="showImageInfo()">
                <img src="/3a-os/pictures/komponen-web/information.svg" width="40" height="40" />
            </button><!--
            --><button type="button" onclick="downloadImage()">
                <img src="/3a-os/pictures/komponen-web/down-arrow.svg" width="40" height="40" />
            </button><!--
            --><input type="number" max="100" min="10" step="10" value="100" oninput="scaleImage(this.value)" />

            <div id="file-name"><?php echo file_exists($path) ? $image : '' ?></div>
        </div>
        <div id="bar-activator" onmouseover="this.previousElementSibling.style.display = 'block'; 
            this.previousElementSibling.style.animationPlayState = 'running'; this.style.display = 'none'">
        </div>
        <input type="text" id="directory" value="<?php echo file_exists($path) ? $directory : '' ?>" name="directory" style="display: none" />
        <div id="viewer">
        </div><!--
        --><button type="button" class="nav-button" onclick="previousImage()" style="left: 0" 
            onmouseleave="this.nextElementSibling.style.display = 'block'; this.style.display = 'none'">
            &lt;
        </button><!--
        --><div class="command-activator" style="left: 0" onmouseenter="this.previousElementSibling.style.display = 'block'; 
            this.previousElementSibling.style.animationPlayState = 'running'; this.style.display = 'none'">
        </div><!--
        --><button type="button" class="nav-button" onclick="nextImage()" style="right: 0" 
            onmouseleave="this.nextElementSibling.style.display = 'block'; this.style.display = 'none'">
            &gt;
        </button><!--
        --><div class="command-activator" style="right: 0" onmouseenter="this.previousElementSibling.style.display = 'block'; 
            this.previousElementSibling.style.animationPlayState = 'running'; this.style.display = 'none'">
        </div>
        <?php
            require "../../komponen-web/open-file/file-manager.xml";
        ?>
        <?php
            echo "<script>" . 
                "const img = document.createElement('img');";

            if(file_exists($path)) {
                echo "img.src = '" . $path . "';" . 
                    "isImageSet = true;";
            }

            echo "</script>";
        ?>
        <script src="/3a-os/javascript/function1.js">
        </script>
	    <script src="/3a-os/komponen-web/open-file/function.js">
	    </script>
        <script src="/3a-os/applications/photo-viewer/function.js">
        </script>
    </body>
</html>
