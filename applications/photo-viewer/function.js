const navButton = document.getElementsByClassName("nav-button"), 
    slideButton = document.getElementById("slide-button"), 
    commandActivator = document.getElementsByClassName("command-activator"), 
    directory = document.getElementById("directory").value, 
    fileName = document.getElementById("file-name"), 
    viewer = document.getElementById("viewer"), 
    ajax6 = new XMLHttpRequest(), 
    ajax7 = new XMLHttpRequest(), 
    ajax8 = new XMLHttpRequest(), 
    ajax9 = new XMLHttpRequest();

var fileInfo = "", 
    slideshow = undefined;
    isSlide = true, 
    rotateValue = 90;

function setPhotoViewer() {
    navButton[0].style.height = innerHeight - 50 + "px";
    navButton[1].style.height = innerHeight - 50 + "px";

    commandActivator[0].style.height = innerHeight - 50 + "px";
    commandActivator[1].style.height = innerHeight - 50 + "px";

    viewer.style.width = innerWidth - 100 + "px";
    viewer.style.height = innerHeight - 50 + "px";
    viewer.style.marginTop = (innerHeight - viewer.offsetHeight) / 2 + "px";

    viewer.appendChild(img);

    fileName.style.width = innerWidth - 652 + "px";

    ajax6.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            if(this.responseText === "Nothing") {
                dialogBoxController.show(1, "<div>Foto telah habis!</div>"); 
            } else {
                fileName.innerHTML = this.responseText;
                img.src = directory + this.responseText;

                const request = "/3a-os/komponen-web/file-operations/file-info.php?path=" + directory + fileName.innerHTML;

                ajax8.open("GET", request);
                ajax8.send();
            }
        }
    };

    ajax7.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            if(this.responseText === "Nothing") {
                fileName.innerHTML = "";
                img.src = "";

                isImageSet = false;
            } else {
                    fileName.innerHTML = this.responseText;
                    img.src = directory + this.responseText;

                    const request = "/3a-os/komponen-web/file-operations/file-info.php?path=" + directory + fileName.innerHTML;

                    ajax8.open("GET", request);
                    ajax8.send();
            }
        }
    };

    ajax8.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            fileInfo = "<div>File Name: " + fileName.innerHTML + "</div><div>Extension: " + this.responseText + "</div><div> Location: " + 
                directory.slice(14) + "</div>";
        }
    };

    ajax9.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            if(this.responseText === "Nothing") {
                stopSlideshow();
            } else {
                fileName.innerHTML = this.responseText;
                img.src = directory + this.responseText;

                const request = "/3a-os/komponen-web/file-operations/file-info.php" + directory + fileName.innerHTML;

                ajax8.open("GET", request);
                ajax8.send();
            }
        }
    };

    if(isImageSet) {
        const request = "/3a-os/komponen-web/file-operations/file-info.php" + directory + fileName.innerHTML;

        ajax8.open("GET", request);
        ajax8.send();
    }

    fileManager.style.display = "none";
    fileManager.style.visibility = "visible";
}

function startSlideshow() {
    if(isImageSet) {
        if(isSlide) {
            slideButton.getElementsByTagName("img")[0].src = "/3a-os/pictures/komponen-web/pause.svg";

            slideshow = setInterval(slideshowImage, 4000);

            isSlide = false;
        } else {
            isSlide = true;

            stopSlideshow();
        }
    }
}

function stopSlideshow() {
    if(isImageSet) {
        slideButton.getElementsByTagName("img")[0].src = "/3a-os/pictures/komponen-web/play-slideshow-button.svg";

        clearInterval(slideshow);
    }
}

function slideshowImage() {
    const request = "/3a-os/komponen-web/file-operations/next-image.php?image_name=" + fileName.innerHTML + "&directory=" + directory;

    ajax9.open("GET", request);
    ajax9.send();
}

function rotateImage() {
    if(isImageSet) {
        img.style.transform = "rotate(" + rotateValue + "deg)";

        rotateValue += 90;
    }
}

function scaleImage(scale) {
    if(isImageSet) {
        img.style.height = scale + "%";
        img.style.width = "auto";
    }
}

function nextImage() {
    if(isImageSet) {
        const request = "/3a-os/komponen-web/file-operations/next-image.php?image_name=" + fileName.innerHTML + "&directory=" + directory;

        ajax6.open("GET", request);
        ajax6.send();
    }
}

function previousImage() {
    if(isImageSet) {
        const request = "/3a-os/komponen-web/file-operations/previous-image.php?image_name=" + fileName.innerHTML + "&directory=" + directory;

        ajax6.open("GET", request);
        ajax6.send();
    }
}

function deleteImage() {
    if(isImageSet) {
        const request = "/3a-os/komponen-web/file-operations/delete-image.php?image_name=" + fileName.innerHTML + "&directory=" + directory;

        ajax7.open("GET", request);
        ajax7.send();
    }
}

function downloadImage() {
    if(isImageSet) {
        const request = "/3a-os/komponen-web/file-operations/download.php?path=" + directory + fileName.innerHTML;

        location.assign(request);
    }
}

function showImageInfo() {
    if(isImageSet) {
        dialogBoxController.show(0, fileInfo);
    }
}