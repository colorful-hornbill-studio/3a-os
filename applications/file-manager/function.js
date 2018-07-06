/* ---------------------------------------- Credit By A Naive Dreamer ----------------------------------------

 konstanta untuk urusan manipulasi file atau folder (contoh: rename file, copy file, dll) */
const ajax1 = new XMLHttpRequest(), 
    ajax2 = new XMLHttpRequest(), 
    ajax3 = new XMLHttpRequest(), 
    ajax4 = new XMLHttpRequest(), 
    ajax5 = new XMLHttpRequest(), 
    uploadPath = document.getElementById("upload-path"), 
    uploadedFile = document.getElementById("uploaded-file"), 
    message = "<div>Ukuran maksimum file yang dapat diupload adalah 200MB, jikalau melebihi ukuran batas maksimum maka proses upload akan " + 
        "gagal</div>";

// konstanta yang menyimpan alamat ke element HTML dan digunakan untuk memanipulasi tampilan halaman web
    fileManager = document.getElementById("file-manager"), 
    storage = document.getElementById("storage"), 
    pathNavigations = document.getElementById("path-navigations"), 
    tools = document.getElementById("tools"), 
    filesAndFolders = document.getElementById("files-and-folders"), 
    dialogBoxController = new DialogBoxController(),

// konstanta untuk urusan navigasi antar folder (contoh: open folder, to parent folder, dll)
    previousPathButton = document.getElementById("previous-path-button"), 
    pathForm = document.getElementById("path-form");

// variabel untuk urusan manipulasi file atau folder (contoh: rename file, copy file, dll)
var name = "",
    type = "",
    selectedFile = undefined, 
    appRequest = "", 
    input = undefined, 
    span = undefined, 
    copyFrom = "", 
    cutFrom = "", 
    isUpload = false,

// variabel untuk urusan navigasi antar folder (contoh: open folder, to parent folder, dll)
    path1 = "", 
    path2 = new Array(), 
    path3 = new Array(), 
    isPreviousPathButtonDisabled = true, 
    isPreviousPath = false, 
    tempPath = "", 

// variabel untuk urusan menyimpan data user
    userInfo = "";

/* menyimpan alamat ke element HTML (file/folder) yang dipilih (diklik) ke variabel dengan nama 'selectedFile' dan mengubah 
   tampilannya (memberi warna biru pada background file/folder) */
function select(id) {
    if(selectedFile !== undefined) {
        selectedFile.style.background = "white";
        input = undefined;
        span = undefined;
        /* ^ hanya akan dieksekusi apabila user telah memilih file/folder yang lain sebelumnya dengan cara mengganti alamat yang dipilih 
           sebelumnya dengan alamat element HTML yang baru dan mengubah warna background element (file/folder) yang dipilih sebelumnya menjadi 
           putih dan yang baru menjadi biru */
    }

    selectedFile = document.getElementById(id);
    span = selectedFile.children[1];
    input = selectedFile.children[2];

    selectedFile.style.background = "rgba(0, 200, 200, 0.75)";

    name = selectedFile.id.slice(0, -15);

    if(selectedFile.title === "file") {
        const request = "/3a-os/komponen-web/file-operations/file-info.php?path=../../storage/" + path1 +  name;

        ajax4.open("GET", request);
        ajax4.send();
    } else {
        const request = "/3a-os/komponen-web/file-operations/folder-info.php?path=../../storage/" + path1 +  name;

        ajax5.open("GET", request);
        ajax5.send();
    }
}

function typeName(a, extension = "") {
    const key = a.which || a.keyCode;

    if(key === 13 && input.value !== "") {
        if(copyFrom === path1 + name) {
            copyFrom = path1 + input.value + extension;
        } else if(cutFrom === path1 + name) {
            cutFrom = path1 + input.value + extension;
        }

        const request = "/3a-os/komponen-web/file-operations/rename.php?path=../../storage/" + path1 + "&name=" + name + 
            "&new_name=" +  input.value + "&type=" + selectedFile.title;

        ajax2.open("GET", request);
        ajax2.send();
    }
}

function typeFolderName(a, name) {
    const key = a.which || a.keyCode;

    if(key === 13 && name !== "") {
        const request = "/3a-os/komponen-web/file-operations/create-folder.php?path=../../storage/" + path1 + name;

        ajax2.open("GET", request);
        ajax2.send();
    }
}

function createFolder() {
    folder = document.createElement("a");
    folder.className = "list selected";
    folder.innerHTML = "<img src='/3a-os/pictures/komponen-web/folder3.svg' width='100' height='100'><span></span>" + 
        "<input type='text' onkeydown='typeFolderName(event, this.value)' onblur='refresh()' style='width: 100%' />";

    filesAndFolders.appendChild(folder);
    folder.childNodes[2].focus();

    scrollTo(0, document.body.offsetHeight);
}

function rename() {
    if(selectedFile !== undefined) {
        span.style.display = "none";

        input.style.display = "block";
        input.focus();
    }
}

function upToParentDir() {
    if(path1 !== userInfo.storage_path) {
        const parentDir = path1.split("/");

        parentDir.pop();
        parentDir.pop();

        path1 = parentDir.join("/");
        path1 += "/";
        pathForm.value = path1;

        if(isPreviousPath) {
            const sliceSection = path3.length - path2.length;

            path3.splice(path2.length, sliceSection, path1);
            isPreviousPath = false;
        } else {
            path3.push(path1);
        }

        path2.push(path1);

        selectedFile = undefined;

        refresh();
    }
}

function goToPreviousPath() {
    if(path2.length !== 1) {
        path2.pop();

        path1 = path2[path2.length - 1];
        pathForm.value = path1;
        isPreviousPath = true;
        selectedFile = undefined;

        refresh();
    } else {
        previousPathButton.disabled = true;
        isPreviousPathButtonDisabled = true;
    }
}

function upload() {
    uploadPath.value = "../../storage/" + path1;

    dialogBoxController.show(1, message);

    uploadedFile.click();
}

function goToNextPath() {
    if(path2.length !== path3.length) {
        path1 = path3[path2.length];
        pathForm.value = path1;

        path2.push(path1);

        if(isPreviousPathButtonDisabled) {
            previousPathButton.disabled = false;
            isPreviousPathButtonDisabled = false;
        }

        selectedFile = undefined;

        refresh();
    }
}

function waitForKey(a, value, keyword) {
    var key = a.which || a.keyCode;

    if(key === 13) {
        if(value !== "" && value !== userInfo.storage_path) {
            if(value.slice(-1) !== "/") {
                value += "/";
                keyword.value += "/";
            }

            const request = "/3a-os/komponen-web/file-operations/read-dir.php?path=../../storage/" + value;

            tempPath = value;

            ajax3.open("GET", request);
            ajax3.send();
        }
    }
}

function openFolder() {
    if (selectedFile.title === "folder") {
        if(isPreviousPathButtonDisabled) {
            previousPathButton.disabled = false;
            isPreviousPathButtonDisabled = false;
        }

        path1 += name + "/";

        if(isPreviousPath && path1 !== path3[path2.length]) {
            const sliceSection = path3.length - path2.length;

            path3.splice(path2.length, sliceSection, path1);

            isPreviousPath = false;
        }

        refresh();

        path2.push(path1);
        path3.push(path1);

        pathForm.value = path1;
        selectedFile = undefined;
    }
}

function download() {
    if(selectedFile !== undefined && selectedFile.title === "file") {
        const request = "/3a-os/komponen-web/file-operations/download.php?path=../../storage/" + path1 + name;

        location.assign(request);
    }
}

function copy() {
    if(selectedFile !== undefined) {
        copyFrom = path1 + name;
    }
}

function cut() {
    if(selectedFile !== undefined) {
        cutFrom = path1 + name;
        copyFrom = undefined;
    }
}

function paste() {
    if(copyFrom !== undefined) {
        const request = "/3a-os/komponen-web/file-operations/copy.php?from=../../storage/" + copyFrom + "&to=../../storage/" + path1;

        ajax2.open("GET", request);
        ajax2.send();
    } else if(cutFrom !== undefined) {
        const request = "/3a-os/komponen-web/file-operations/cut.php?from=../../storage/" + cutFrom + "&to=../../storage/" + path1;

        ajax2.open("GET", request);
        ajax2.send();

        cutFrom = undefined;
    } else {
        dialogBoxController.show(1, "<div>Alamat tidak ada</div>")
    }
}

function del() {
    if(copyFrom === path1 + name ) {
        copyFrom = undefined;
    } else if(cutFrom === path1 + name ) {
        cutFrom = undefined;
    }

    if(selectedFile.title === "file") {
        const request = "/3a-os/komponen-web/file-operations/delete-file.php?path=../../storage/" + path1 + name;

        ajax2.open("GET", request);
        ajax2.send();
    } else if(selectedFile.title === "folder") {
        const request = "/3a-os/komponen-web/file-operations/remove-folder.php?path=../../storage/" + path1 + name;

        ajax2.open("GET", request);
        ajax2.send();
    }
}

function refresh() {
    const request = "/3a-os/komponen-web/file-operations/read-dir.php?path=../../storage/" + path1;

    ajax1.open("GET", request);
    ajax1.send();

    selectedFile = undefined;
    storage.innerHTML = "";
}

function setFileManager(appPath, tempType) {
    appRequest = appPath;
    type = tempType;

    storage.style.height = innerHeight + "px";
    pathNavigations.style.left = (innerWidth - pathNavigations.offsetWidth) / 2 + 150 + "px";
    tools.style.left = (innerWidth - tools.offsetWidth) / 2 + 150 + "px";
    filesAndFolders.style.width = innerWidth - 319 + "px";
    filesAndFolders.style.height = innerHeight - 165 + "px";

    userInfo = JSON.parse(localStorage.getItem("user_info"));

    pathForm.value = userInfo.storage_path;
    path1 = userInfo.storage_path;

    path2.push(path1);
    path3.push(path1);

    ajax1.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            filesAndFolders.innerHTML = this.responseText;
        }
    };

    refresh();

    ajax2.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            refresh();

            if(this.responseText !== "") {
                dialogBoxController.show(1, this.responseText);
            }
        }
    };

    ajax3.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            if(this.responseText === "<div>Nothing directory found!</div>") {
                dialogBoxController.show(1, this.responseText);
            } else {
                filesAndFolders.innerHTML = this.responseText;

                path1 = tempPath;

                if(isPreviousPath) {
                    const sliceSection = path3.length - path2.length;

                    path3.splice(path2.length, sliceSection, path1);

                    isPreviousPath = false;
                } else {
                    path3.push(path1);
                }
        
                path2.push(path1);
            }
        }
    };

    ajax4.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            infoFile = "<div>File Name: <br/>&nbsp;" + name + "</div><div>Extension: <br/>&nbsp;" + this.responseText + 
                "</div><div> Location: <br/>&nbsp;" + path1 + "</div>";

            storage.innerHTML = infoFile;
        }
    };

    ajax5.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            infoFile = "<div>Folder Name: <br/>&nbsp;" + name + "</div><div>Folder Size: <br/>&nbsp;" + this.responseText + 
                "</div><div> Location: <br/>&nbsp;" + path1 + "</div>";

            storage.innerHTML = infoFile;
        }
    };

    fileManager.style.visibility = "visible";
}
