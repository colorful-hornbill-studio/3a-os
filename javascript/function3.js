var calledAppsList = new Array();
alert(innerHeight);
const dialogBoxModel = new DialogBoxModel(), 
    dialogBoxView = new DialogBoxView(), 
    dialogBoxController = new DialogBoxController(dialogBoxModel, dialogBoxView), 
    menu = document.getElementById("menu"), 
    calendar = document.getElementById("calendar"), 
    clock = setInterval(setTime, 999), 
    time = document.getElementById("time"), 
    dateAndTime = document.getElementById("date-and-time");

function goToFullscreen() {
    var element = document.documentElement;

    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function checkAuthority() {
    if(!localStorage.getItem("user_info")) {
        location.assign("/3a-os/page/redirect/index.php");
    }
}

function showMenu() {
	menu.style.visibility = "visible";
}

function hideMenu() {
	menu.style.visibility = "hidden";
}

function logOut() {
	localStorage.removeItem("user_info");
	checkAuthority();
}

function getFullMonth() {
    switch(new Date().getMonth()) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}

function getFullDay() {
    switch(new Date().getDay()) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

function setCalendar() {
    const fullMonth = getFullMonth(), 
        month = new Date().getMonth(),
        year = new Date().getFullYear(), 
        firstDate = fullMonth + " 1, " + year,
        calendarRows = document.getElementsByClassName("calendar-rows");

    var start = new Date(firstDate).getDay(), 
        date = new Date(firstDate).getTime();

    document.getElementById("current-date").innerHTML = getFullDay() + ", " + fullMonth + " " + new Date().getDate() + ", " + year;

    for(x = 0; x < 6; ++x) {
        for(y = start; y < 7; ++y) {
            var incrementedDate = new Date(date);

            if(incrementedDate.getMonth() !== month) {
                return;
            }

            calendarRows[x].getElementsByTagName("td")[y].innerHTML = incrementedDate.getDate();
            date += 86400000;
        }

        start = 0;
    }
}

function hideCalendar() {
    calendar.style.display = "none";
}

function showCalendar() {
    calendar.style.display = "block";
}

function setTime() {
    time.innerHTML = (new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours()) + ":" + 
        (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()) + ":" + 
        (new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds());

    if(new Date().getHours() === 0 && new Date().getMinutes() === 0 ) {
        setCalendar();
    }
}

// fungsi yang dijalankan apabila pengguna hendak memanggil suatu program

function callApplication(app) {
    /*
        mendeklarasikan konstanta yang berisi alamat URI ke file yang berisi setting dari program yang dipanggil dan variabel yang digunakan 
        untuk mengetes apakah program telah dipanggil sebelumnya
    */

    const appSetting = "/3a-os/applications/" + app + "/app-setting.json";

    var found = false;
    //------------------------------------------------------------------------------------------------------------------------------------------


    /*
        memeriksa apakah program telah dipanggil sebelumnya dengan mencari nama program yang sedang dipanggil di array yang berisi kumpulan
        nama program yang telah dipanggil
    */

    for(x = 0; x < calledAppsList.length; ++x) {
        if(calledAppsList[x] === app) {
            found = true;
            dialogBoxController.show(1, "<div>Program telah dipanggil!</div>");
        }
    }
    //------------------------------------------------------------------------------------------------------------------------------------------


    // kode blok yang dijalankan apabila program belum dipanggil

    if(!found) {
        /* 
            menyiapkan konstansta yang bertugas menangani koneksi ke server dan mendaftarkan program yang sedang dipanggil ke daftar program 
            yang telah dipanggil
        */

        const ajax = new XMLHttpRequest();

        calledAppsList.push(app);
        //--------------------------------------------------------------------------------------------------------------------------------------


        // kode yang akan dieksekusi apabila response telah diberikan oleh server

        ajax.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                // menyiapkan id yang akan diberikan ke berbagai elemen

                const firstId = app + "-app-call-button", 
                    secondId = app + "-window-size-button", 
                    thirdId = app + "-window-hide-button", 
                    fourthId = app + "-window-close-button";
                //------------------------------------------------------------------------------------------------------------------------------


                /*
                    blok if digunakan agar memori yang digunakan sebagai tempat menyimpan nilai konstanta dapat dibebaskan setelah tidak 
                    dbutuhkan lagi sehingga memberikan ruang memori untuk proses selanjutnya
                */

                if(true) {
                    // menyiapkan konstanta yang akan digunakan dalam mengatur berbagai elemen dalam program

                    const appSetting = JSON.parse(this.responseText), 
                        windowHeader = document.createElement("div"), 
                        windowFrame = document.createElement("iframe"), 
                        program = document.createElement("div"), 
                        appCallButton = document.createElement("button"), 
                        windowSizeButton = document.createElement("button"), 
                        windowHideButton = document.createElement("button"), 
                        windowCloseButton = document.createElement("button");
                    //--------------------------------------------------------------------------------------------------------------------------


                    // mengatur class dan id parent element dari jendela program serta mengatur ukurannya

                    program.className = "program";
                    program.id = app;

                    if(appSetting.height === "100%" && appSetting.width === "100%") {
                        program.style.height = innerHeight - 40 + "px";
                        program.style.width = innerWidth + "px";
                    } else {
                        program.style.height = appSetting.height;
                        program.style.width = appSetting.width;
                    }
                    //--------------------------------------------------------------------------------------------------------------------------


                    // mengatur ukuran jendela program dan memberikan alamat URI dimana file utama aplikasi yang dipanggil berada

                    windowFrame.src = "/3a-os/applications/" + app + "/index.php";

                    if(appSetting.height === "100%" && appSetting.width === "100%") {
                        windowFrame.style.height = innerHeight - 74.5 + "px";
                        windowFrame.style.width = innerWidth + "px";
                    } else {
                        windowFrame.style.height = appSetting.height + "px";
                        windowFrame.style.width = appSetting.width + "px";
                    }
                    //--------------------------------------------------------------------------------------------------------------------------


                    // memberikan class dan id pada tombol pemanggil program yang berada di taskbar serta mengatur kontennya

                    appCallButton.className = "app-call-button";
                    appCallButton.id = app + "-app-call-button";
                    appCallButton.innerHTML = "<img src='" + appSetting.icon + "' />";
                    //--------------------------------------------------------------------------------------------------------------------------


                    //--------------------------------- menyetting tombol-tombol pada header jendela program -----------------------------------

                    // memberikan type, id dan icon pada tombol windowSizeButton

                    windowSizeButton.type = "button";
                    windowSizeButton.id = secondId;
                    windowSizeButton.innerHTML = "<svg width='30' height='30'>" + 
                            "<rect x='6' y='12' rx='3' ry='3' width='12' height='12' style='fill: transparent; stroke: white; " + 
                                "stroke-width: 3' />" + 
                            "<rect x='12' y='6' rx='3' ry='3' width='12' height='12' style='fill: transparent; stroke: white; " + 
                                "stroke-width: 3' />" + 
                            "<!--<rect x='6' y='6' rx='4.5' ry='4.5' width='18' height='18' style='fill: transparent; stroke: white; " + 
                                "stroke-width: 3' />-->" + 
                        "</svg>";
                    //--------------------------------------------------------------------------------------------------------------------------


                    // memberikan type, id dan icon pada tombol windowHideButton

                    windowHideButton.type = "button";
                    windowHideButton.id = thirdId;
                    windowHideButton.innerHTML = "<svg width='30' height='30'>" + 
                            "<line x1='6' y1='16.5' x2='24' y2='16.5' style='stroke: white; stroke-width: 3' />" + 
                        "</svg>";
                    //--------------------------------------------------------------------------------------------------------------------------


                    // memberikan type, id dan icon pada tombol windowCloseButton

                    windowCloseButton.type = "button";
                    windowCloseButton.id = fourthId;
                    windowCloseButton.innerHTML = "<svg width='30' height='30'>" + 
                            "<polyline points='6,6 15,15 24,6 15,15 6,24 15,15 24,24' style='fill: none; stroke: white; " + 
                                "stroke-width: 3' />" + 
                        "</svg>";
                    //--------------------------------------------------------------------------------------------------------------------------
                    //--------------------------------------------------------------------------------------------------------------------------


                    // memasukkan element yang telah dibuat ke parent element yang telah ditentukan

                    document.getElementById("nav").insertBefore(appCallButton, dateAndTime);

                    document.body.insertBefore(program, document.getElementsByTagName("script")[0]);

                    program.appendChild(windowHeader);
                    program.appendChild(windowFrame);
                    //--------------------------------------------------------------------------------------------------------------------------


                    // memasukkan tombol-tombol yang diperlukan ke header dari jendela program dan mengatur class dan konten dari header

                    windowHeader.className = "window-header";

                    windowHeader.appendChild(windowCloseButton);
                    windowHeader.appendChild(windowHideButton);
                    windowHeader.appendChild(windowSizeButton);

                    windowHeader.innerHTML += "<span id='apps-name'>" + appSetting.name + "</span>" + 
                            "<div style='clear: both'>" +
                            "</div>" +
                        "</div>";
                    //--------------------------------------------------------------------------------------------------------------------------
                }
                //------------------------------------------------------------------------------------------------------------------------------


                //--------------------------- memberikan event handler ke setiap elemen yang telah disiapkan------------------------------------

                // menyiapkan data yang dibutuhkan untuk memberikan event handler ke setiap tombol yang telah disiapkan

                const program = document.getElementById(app), 
                    appCallButton = document.getElementById(firstId), 
                    windowSizeButton = document.getElementById(secondId), 
                    windowHideButton = document.getElementById(thirdId), 
                    windowCloseButton = document.getElementById(fourthId);
                //------------------------------------------------------------------------------------------------------------------------------


                // memberikan event handler yang akan menangani letak kursor pada tombol appCallButton yang berada di taskbar serta saat diklik

                appCallButton.addEventListener("mouseOut", 
                    function() {
                        this.style.backgroundColor = "red";
                    }
                );
                appCallButton.addEventListener("mouseOver", 
                    function() {
                        this.style.backgroundColor = "white";
                    }
                );
                appCallButton.addEventListener("click", 
                    function() {
                        program.style.display = "block";
                    }
                );
                //------------------------------------------------------------------------------------------------------------------------------


                // memberikan event handler yang akan menangani letak kursor pada tombol windowSizeButton

                windowSizeButton.addEventListener("mouseover", 
                    function() {
                        this.style.background = "yellow";
                    }
                );
                windowSizeButton.addEventListener("mouseout", 
                    function() {
                        this.style.background = "transparent";
                    }
                );
                //------------------------------------------------------------------------------------------------------------------------------


                // memberikan event handler yang akan menangani letak kursor pada tombol windowHideButton serta saat diklik

                windowHideButton.addEventListener("mouseover", 
                    function() {
                        this.style.background = "green";
                    }
                );
                windowHideButton.addEventListener("mouseout", 
                    function() {
                        this.style.background = "transparent";
                    }
                );
                windowHideButton.addEventListener("click", 
                    function() {
                        program.style.display = "none";
                    }
                );
                //------------------------------------------------------------------------------------------------------------------------------


                // memberikan event handler yang akan menangani letak kursor pada tombol windowCloseButton serta saat diklik

                windowCloseButton.addEventListener("mouseout", 
                    function() {
                        this.style.background = "transparent";
                    }
                );
                windowCloseButton.addEventListener("mouseover", 
                    function() {
                        this.style.background = "red";
                    }
                );
                windowCloseButton.addEventListener("click", 
                    function() {
                        document.body.removeChild(program);

                        document.getElementById("nav").removeChild(appCallButton);

                        for(x = 0; x < calledAppsList.length; ++x) {
                            if(calledAppsList[x] === app) {
                                calledAppsList.splice(x, 1);
                            }
                        }
                    }
                );
                //------------------------------------------------------------------------------------------------------------------------------
                //------------------------------------------------------------------------------------------------------------------------------
            }
        };
        //--------------------------------------------------------------------------------------------------------------------------------------


        // mengirimkan request file yang berisi setting aplikasi ke server

        ajax.open("GET", appSetting);
        ajax.send();
        //--------------------------------------------------------------------------------------------------------------------------------------
    }
    //------------------------------------------------------------------------------------------------------------------------------------------
}
//----------------------------------------------------------------------------------------------------------------------------------------------

function setDesktopPage() {
    checkAuthority();
    setCalendar();

    dialogBoxController.show(0, "<div>Apakah Anda Ingin memasuki mode fullscreen?</div>", {yesResponseHandler: goToFullscreen});

    time.innerHTML = (new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours()) + ":" + 
        (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()) + ":" + 
        (new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds());

    document.getElementById("date").innerHTML = new Date().toDateString();
}