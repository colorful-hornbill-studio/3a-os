const fileManagerContainer = document.getElementById("file-manager-container"), 
    fileManagerHeader = document.getElementById("file-manager-header"), 
    directory = document.getElementById("directory").value, 
    bar = document.getElementById("bar"), 
    barActivator = document.getElementById("bar-activator"), 
    operations = document.getElementById("operations"), 
    fileName = document.getElementById("file-name"), 
    ajax6 = new XMLHttpRequest(), 
    ajax7 = new XMLHttpRequest(), 
    ajax8 = new XMLHttpRequest();

var fileInfo = "",
    sub = undefined, 
    isPlay = true;

function setVideoPlayer() {
    bar.style.left = (innerWidth - barActivator.offsetWidth) / 2 + "px";
    barActivator.style.left = (innerWidth - barActivator.offsetWidth) / 2 + "px";

    ajax6.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            if(this.responseText === "Nothing") {
                dialogBoxController.show(1, "<div>Video telah habis!</div>"); 
            } else {
                video.currentTime = 0;
                source.src = directory + this.responseText;

                video.load();

                fileName.innerHTML = this.responseText;

                const request = "/3a-os/komponen-web/file-operations/file-info.php?path=" + directory + fileName.innerHTML;

                ajax8.open("GET", request);
                ajax8.send();
            }
        }
    };

    ajax7.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            if(this.responseText === "Nothing") {
                videoPlayer.innerHTML = "";

                isVideoSet = false;
            } else {
                video.currentTime = 0;
                source.src = directory + this.responseText;

                video.load();

                fileName.innerHTML = this.responseText;

                const request = "/3a-os/komponen-web/file-operations/file-info.php?path=" + directory + fileName.innerHTML;

                ajax8.open("GET", request);
                ajax8.send();
            }
        }
    };

    ajax8.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            fileInfo = "<div>File Name: " + fileName.innerHTML + "</div><div>Extension: " + this.responseText + " Byte</div><div> Location: " + 
                directory.slice(14) + "</div>";
        }
    };

    if(isVideoSet) {
        const request = "/3a-os/komponen-web/file-operations/file-info.php?path=" + directory + fileName.innerHTML;

        ajax8.open("GET", request);
        ajax8.send();
    }
}

function playVideo() {
    if(isVideoSet) {
        if(isPlay) {
            video.pause();
        } else {
            video.play();
        }
    }
}

function scaleVideo(scale) {
    if(isVideoSet) {
        video.width = scale / 100 * innerWidth;
    }
}

function nextVideo() {
    if(isVideoSet) {
        const request = "/3a-os/komponen-web/file-operations/next-video.php?video_name=" + fileName.innerHTML + "&directory=" + directory;

        ajax6.open("GET", request);
        ajax6.send();
    }
}

function previousVideo() {
    if(isVideoSet) {
        const request = "/3a-os/komponen-web/file-operations/previous-video.php?video_name=" + fileName.innerHTML + "&directory=" + directory;

        ajax6.open("GET", request);
        ajax6.send();
    }
}

function deleteVideo() {
    if(isVideoSet) {
        const request = "/3a-os/komponen-web/file-operations/delete-video.php?video_name=" + fileName.innerHTML + "&directory=" + directory;

        ajax7.open("GET", request);
        ajax7.send();
    }
}

function downloadVideo() {
    if(isVideoSet) {
        const request = "/3a-os/komponen-web/file-operations/download.php?path=" + directory + fileName.innerHTML;

        location.assign(request);
    }
}

function showVideoInfo() {
    if(isVideoSet) {
        dialogBoxController.show(0, fileInfo)
    }
}

function setPlaybackRate(number) {
    if(isVideoSet) {
        video.playbackRate = number;
    }
}

function fastBackward() {
    if(isVideoSet) {
        video.currentTime -= 60;
    }
}

function fastForward() {
    if(isVideoSet) {
        video.currentTime += 60;
    }
}

/*
function openSub() {
    if(isVideoSet) {
        if(video.children[1]) {
            video.removeChild(video.children[1]);
        } else {
            sub = document.createElement("track");
            sub.src = "/3a-os/storage/1/ws.vtt";
            sub.kind = "subtitles";
        }

        video.appendChild(sub);
    }
}

function hideSub() {
    if(video.children[1]) {
        video.removeChild(video.children[1]);
    }
}
*/