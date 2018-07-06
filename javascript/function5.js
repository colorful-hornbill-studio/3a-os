var isFieldUsername = true;

const formSignIn = document.getElementById("form-sign-in"), 
    dialogBoxModel = new DialogBoxModel(), 
    dialogBoxView = new DialogBoxView(),
    dialogBoxController = new DialogBoxController(dialogBoxModel, dialogBoxView), 
    nextButton = document.getElementById("next-button"), 
    prevButton = document.getElementById("prev-button"), 
    username = document.getElementById("username"), 
    password = document.getElementById("password");

    nextButton.addEventListener("click", nextField);
    prevButton.addEventListener("click", previousField);

function checkAuthority() {
    if(localStorage.getItem("user_info")) {
        location.assign("/3a-os/page/desktop/index.php");
	}
}

function check(val) {
	    if(val === "") {
    	    nextButton.style.display = "none";
    	} else {
        	nextButton.style.display = "block";
		}
}

function nextField() {
    if(isFieldUsername) {
        password.style.display = "block";
        username.style.display = "none";
        password.style.animationPlayState = "running";
		nextButton.style.display = "none";
        prevButton.style.display = "block";
        prevButton.style.animationPlayState = "running";
        isFieldUsername = false;
    } else {
        var error = "";

        if(username.value === "") {
            error += "<div>Kolom username belum diisi!;</div>";
        }
        
        if(password.value === "") {
            error += "<div>Kolom password belum diisi!</div>";
        }

        if(error !== "") {
            dialogBoxController.show(1, error);
            return false;
        }

        const ajax = new XMLHttpRequest(), request = "username=" + username.value + "&password=" + password.value;

        ajax.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                try{
                    const user_info_test = JSON.parse(this.responseText);

                    localStorage.setItem("user_info", this.responseText);
                    location.assign('/3a-os/page/desktop/index.php');
                } catch (err) {
                    dialogBoxController.show(1, this.responseText);
                }
            }
        };

        ajax.open("POST", "/3a-os/server-proccess/sign-in.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(request);
    }
}


function previousField(val) {
    password.style.display = "none";
    password.value = "";
    username.style.display = "block";
    nextButton.style.display = "block";
    prevButton.style.display = "none";
    nextButton.style.animationPlayState = "running";
    isFieldUsername = true;
}

function setSignInPage() {
    checkAuthority();

    document.getElementById("fields").style.bottom = ((innerHeight - 40) / 2) + "px";
    document.getElementById("fields").style.left = ((innerWidth - 300) / 2) + "px";

    document.getElementsByTagName("a")[0].style.bottom = ((innerHeight - 80) / 2) + "px";
    document.getElementsByTagName("a")[0].style.left = ((innerWidth - 100) / 2) + "px";

    document.getElementsByTagName("img")[0].style.bottom = ((innerHeight + 130) / 2) + "px";
    document.getElementsByTagName("img")[0].style.left = ((innerWidth - 150) / 2) + "px";

    nextButton.style.bottom = ((innerHeight - 30) / 2) + "px";
    nextButton.style.right = ((innerWidth + 320) / 2) + "px";

    prevButton.style.bottom = ((innerHeight - 30) / 2) + "px";
    prevButton.style.left = ((innerWidth + 320) / 2) + "px";

    formSignIn.style.height = innerHeight + "px";
    formSignIn.style.width = innerWidth + "px";
    formSignIn.style.display = "block";
}
