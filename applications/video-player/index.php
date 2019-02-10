<!DOCTYPE html>
<html>
    <head lang="En-US">
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
            Video Player
        </title>
        <link rel="stylesheet" type="text/css" href="../../stylesheets/style.css" />
        <link rel="stylesheet" type="text/css" href="./style.css" />
    </head>
    <body onload="setFileManager(location.pathname, 'video'); setVideoPlayer()">
        <?php
            $path = "";

            echo "<script>" .
                    "var isVideoSet = false;" .
                "</script>";

            if(isset($_GET["file_name"]) && isset($_GET["directory"])) {
                $video = $_GET["file_name"];
                $directory = $_GET["directory"];

                $path = $directory . $video;
            }
        ?>
        <div id="bar" onmouseenter="this.style.display = 'block'"
            onmouseleave="this.nextElementSibling.style.display = 'block'; this.style.display = 'none'">
            <div id="file-name"><?php echo file_exists($path) ? $video : ''; ?></div>
            <div id="operations">
                <button type="button" onclick="showFileManager()">
                    <img src="/3a-os/pictures/komponen-web/video-file.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="deleteVideo()">
                    <img src="/3a-os/pictures/komponen-web/delete-button.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="//openSub()">
                    <img src="/3a-os/pictures/komponen-web/subtitles.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="//hideSub()">
                    <img src="/3a-os/pictures/komponen-web/eye.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="previousVideo()">
                    <img src="/3a-os/pictures/komponen-web/rewind.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="fastBackward()">
                    <img src="/3a-os/pictures/komponen-web/previous.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="playVideo()">
                    <img id="play-button-image" src="/3a-os/pictures/komponen-web/pause.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="fastForward()">
                    <img src="/3a-os/pictures/komponen-web/skip.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="nextVideo()">
                    <img src="/3a-os/pictures/komponen-web/fast-forward.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="showVideoInfo()">
                    <img src="/3a-os/pictures/komponen-web/information.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="loopVideo()">
                    <img src="/3a-os/pictures/komponen-web/progress-arrows.svg" width="20" height="20" />
                </button><!--
                --><button type="button" onclick="downloadVideo()">
                    <img src="/3a-os/pictures/komponen-web/down-arrow.svg" width="20" height="20" />
                </button><!--
                --><input type="number" max="100" min="10" step="10" value="100" oninput="scaleVideo(this.value)" /><!--
                --><input type="range" max = "4.0" min="0.5" step="0.5" value="1.0" oninput="setPlaybackRate(this.value)" />
            </div>
        </div>
        <div id="bar-activator" onclick="this.previousElementSibling.style.display = 'block'; this.previousElementSibling.style.animationPlayState = 'running'; this.style.display = 'none'">
        </div>
        <div id="video-player">
        </div>
        <input type="text" id="directory" value="<?php echo file_exists($path) ? $directory : ''; ?>" name="directory" style="display: none" />
        <?php
            require "../../komponen-web/open-file/file-manager.xml";
        ?>
        <?php
            echo "<script>" .
                "const videoPlayer = document.getElementById('video-player'), " .
                    "playButtonImage = document.getElementById('play-button-image');" .
                "var isPlay = true;";

            if(file_exists($path)) {
                echo "const video = document.createElement('video'), " .
                        "source = document.createElement('source');" .
                        "video.autoplay = true;" .
                        "video.addEventListener('play', function() {" .
                            "playButtonImage.src = '/3a-os/pictures/komponen-web/pause.svg';" .
                            "isPlay = true;" .
                        "});" .
                        "video.addEventListener('pause', function() {" .
                            "playButtonImage.src = '/3a-os/pictures/komponen-web/play-button2.svg';" .
                            "isPlay = false;" .
                        "});" .
                        "video.controls = true;" .
                        "video.width = innerWidth;" .
                        "video.height = innerHeight - 4.5;" .
                        "source.src= '" . $path . "';" .
                        "videoPlayer.appendChild(video);" .
                        "video.appendChild(source);" .
                        "isVideoSet = true;";
            }

            echo "</script>;";
        ?>
        <script src="/3a-os/javascript/function1.js">
        </script>
	    <script src="/3a-os/komponen-web/open-file/function.js">
	    </script>
	    <script src="/3a-os/applications/video-player/function.js">
	    </script>
    </body>
</html>
