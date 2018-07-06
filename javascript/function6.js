var isFieldName = true, 
	isFieldEmail = false, 
	isFieldUsername = false, 
	isFieldPassword = false;

const dialogBoxModel = new DialogBoxModel(),
	dialogBoxView = new DialogBoxView(),
	dialogBoxController = new DialogBoxController(dialogBoxModel, dialogBoxView),
	formSignUp = document.getElementById("form-sign-up"), 
	nextButton = document.getElementById("next-button"), 
	prevButton = document.getElementById("prev-button"), 
	nama = document.getElementById("name"), 
	email = document.getElementById("email"), 
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
    if(isFieldName) {
        email.style.display = "block";
        nama.style.display = "none";
        email.style.animationPlayState = "running";
		nextButton.style.display = "none";
        prevButton.style.display = "block";
        prevButton.style.animationPlayState = "running";
        isFieldName = false;
		isFieldEmail = true;
		
		if(email.value !== "") {
			nextButton.style.display = "block";
		}
    } else if(isFieldEmail) {
        username.style.display = "block";
        email.style.display = "none";
        username.style.animationPlayState = "running";
		nextButton.style.display = "none";
		isFieldEmail = false;
        isFieldUsername = true;
		
		if(username.value !== "") {
			nextButton.style.display = "block";
		}
	} else if(isFieldUsername) {
        password.style.display = "block";
        username.style.display = "none";
        password.style.animationPlayState = "running";
		nextButton.style.display = "none";
		isFieldUsername = false;
		isFieldPassword = true;
		
		if(password.value !== "") {
			nextButton.style.display = "block";
		}
	} else {
		//var email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var error = "";

		if(innerWidth > 768) {
			if(nama.value === "") {
				error += "<div>Kolom nama belum diisi!</div>";
			}

			if(email.value === "") {
				error += "<div>Kolom email belum diisi!</div>";
			}

			if(username.value === "") {
				error += "<div>Kolom username belum diisi!</div>";
			}

			if(password.value === "") {
				error += "<div>Kolom password belum diisi!</div>";
			}

			if(error !== "") {
				dialogBoxController.show(1, error);
				return false;
			}
		} else {
			if(nama.value === "") {
				error += "Kolom nama belum diisi!;\n";
			}

			if(email.value === "") {
				error += "Kolom email belum diisi!;\n";
			}

			if(username.value === "") {
				error += "Kolom username belum diisi!;\n";
			}
			
			if(password.value === "") {
				error += "Kolom password belum diisi!";
			}

			if(error !== "") {
				window.alert(error);
				return false;
			}
		}

		const ajax = new XMLHttpRequest(), request = "name=" + nama.value + "&email=" + email.value + "&username=" + username.value + 
			"&password=" + password.value;

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

        ajax.open("POST", "/3a-os/server-proccess/sign-up.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(request);
    }
}


function previousField(val) {
    if(isFieldEmail) {
        email.style.display = "none";
        nama.style.display = "block";
        nama.style.animationPlayState = "running";
		nextButton.style.display = "block";
        prevButton.style.display = "none";
        isFieldName = true;
		isFieldEmail = false;
    } else if(isFieldUsername) {
        username.style.display = "none";
        email.style.display = "block";
        email.style.animationPlayState = "running";
		nextButton.style.display = "block";
        isFieldEmail = true;
		isFieldUsername = false;
	} else if(isFieldPassword) {
        password.style.display = "none";
        username.style.display = "block";
        username.style.animationPlayState = "running";
		nextButton.style.display = "block";
        isFieldUsername = true;
		isFieldPassword = false;
	}
}

function setSignUpPage() {
	checkAuthority();

    nama.value = "";
    email.value = "";
    username.value = "";
    password.value = "";

    formSignUp.style.height = innerHeight + "px";
    formSignUp.style.width = innerWidth + "px";

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
	
	formSignUp.style.display = "block";
}