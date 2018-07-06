const dialogBoxModel = new DialogBoxModel(), 
    dialogBoxView = new DialogBoxView(), 
    dialogBoxController = new DialogBoxController(dialogBoxModel, dialogBoxView);

var count = 5, 
    countShow, 
    redirect;

function countDown() {
    countShow = countShow || document.getElementById("count");
    --count;

    if(count === 0) {
        location.assign("/3a-os/page/sign-in/index.php");
    }

    countShow.innerHTML = count; 
}

function setRedirectPage() {
    dialogBoxController.show(1, "<div>Anda akan dialihkan ke halaman sign in dalam <span id='count'>5</span> detik!</div>", true);

    redirect = setInterval(countDown, 1000);
}