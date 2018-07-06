function DialogBoxModel() {
    this.currentDialogBoxOrder = -1;
    this.currentDialogBoxType = 1;
    this.confirmBoxNumber = 0;

    this.addDialogBox = function(dialogBoxType) {
        if(this.currentDialogBoxType === 1) {
            if(dialogBoxType === 0) {
                ++this.confirmBoxNumber;
                this.currentDialogBoxType = 0;
            } else {
                this.confirmBoxNumber = 0;
                this.currentDialogBoxType = 1;
            }

            ++this.currentDialogBoxOrder;

            return {
                confirmBoxNumber: this.confirmBoxNumber,
                currentDialogBoxType: this.currentDialogBoxType,
                currentDialogBoxOrder: this.currentDialogBoxOrder
            };
        }

        return {
            confirmBoxNumber: 2,
            currentDialogBoxType: this.currentDialogBoxType,
            currentDialogBoxOrder: this.currentDialogBoxOrder
        };
    };

    this.reduceDialogBox = function() {
        if(this.currentDialogBoxType === 0) {
            this.confirmBoxNumber = 0;
            this.currentDialogBoxType = 1;
        }

        --this.currentDialogBoxOrder;

        return {
            confirmBoxNumber: this.confirmBoxNumber,
            currentDialogBoxType: this.currentDialogBoxType,
            currentDialogBoxOrder: this.currentDialogBoxOrder
        };
    };
}

function DialogBoxView() {
    this.render = function(dialogBoxType, message, disableCloseButton, exitResponseHandler, yesResponseHandler, noResponseHandler, 
        confirmBoxNumber, closeDialogBoxHandler) {

        if(confirmBoxNumber <= 1) {
            const dialogBox = document.createElement("div");

        	if(dialogBoxType === 0) {
                dialogBox.className = "dialog-box";
                dialogBox.id = "confirm-box";
                dialogBox.innerHTML = "<div class='header'>" + 
                        "<span>" + 
                                "Confirm Box" + 
                        "</span>" + 
                        "<button type='button' class='close-dialog-box-button'>X</button>" + 
                    "</div>" + 
                    "<div class='body'>" + 
                        "<div class='icon'>" + 
                            "<img src='/3a-os/pictures/komponen-web/info.svg' alt='info icon'>" +
                        "</div>" + 
                        "<div class='content-container'>" + 
                            "<div id='info'>" + 
                                message + 
                            "</div>" + 
                            "<div id='confirm'>" + 
                                "<button type='button' id='yes'>Yes</button><!--" + 
                                "--><button type='button' id='no'>No</button>" + 
                            "</div>" + 
                        "</div>" +
                        "<div style='clear: both'>" +
                        "</div>" + 
                    "</div>";
    	    } else if(dialogBoxType === 1) {
                dialogBox.className = "alert-box dialog-box";
                dialogBox.innerHTML = "<div class='header'>" + 
                        "<span>" + 
                            "Alert Box" + 
                        "</span>" + 
                        "<button type='button' class='close-dialog-box-button'>X</button>" + 
                    "</div>" + 
                    "<div class='body'>" + 
                        "<div class='icon'>" + 
                            "<img src='/3a-os/pictures/komponen-web/warning.png' alt='alert icon'>" + 
                        "</div>" + 
                        "<div class='content-container'>" + 
                            "<div class='alert'>" + 
                                message + 
                            "</div>" + 
                        "</div>" + 
                        "<div style='clear: both'>" +
                        "</div>" + 
                    "</div>";
            }

            const closeButton = dialogBox.getElementsByClassName("close-dialog-box-button")[0];

            if(disableCloseButton) {
                closeButton.disabled = true;
            } else {
                closeButton.addEventListener("click", closeDialogBoxHandler);
            }

            document.body.appendChild(dialogBox);

            if(dialogBoxType === 0) {
                const yesButton = document.getElementById("yes");
                const noButton = document.getElementById("no");

                yesButton.addEventListener("click", closeDialogBoxHandler);
                noButton.addEventListener("click", closeDialogBoxHandler);

                if(yesResponseHandler) {
                    yesButton.addEventListener("click", yesResponseHandler);
                }

                if(noResponseHandler) {
                    noButton.addEventListener("click", noResponseHandler);
                }
            }

            if(exitResponseHandler) {
                closeButton.addEventListener("click", exitResponseHandler);
            }

        	dialogBox.style.top = ((innerHeight - dialogBox.offsetHeight) / 2) + "px";
            dialogBox.style.left = ((innerWidth - dialogBox.offsetWidth) / 2) + "px";
        }
    }

    this.closeConfirmBox = function(currentDialogBoxOrder) {
        document.body.removeChild(document.getElementsByClassName("dialog-box")[currentDialogBoxOrder]);
    }

    this.closeAlertBox = function(currentDialogBoxOrder) {
        document.body.removeChild(document.getElementsByClassName("dialog-box")[currentDialogBoxOrder]);
    }
}

function DialogBoxController(dialogBoxModel = new DialogBoxModel(), dialogBoxView = new DialogBoxView()) {
    this.dialogBoxModel = dialogBoxModel;
    this.dialogBoxView = dialogBoxView;

    this.close = function() {
        if(this.data.currentDialogBoxType === 0) {
            this.dialogBoxView.closeConfirmBox(this.data.currentDialogBoxOrder);
        } else {
            this.dialogBoxView.closeAlertBox(this.data.currentDialogBoxOrder);
        }

        this.data = this.dialogBoxModel.reduceDialogBox();
    };

    this.show = function(dialogBoxType, message, disableCloseButton, response = {}) {
        this.data = this.dialogBoxModel.addDialogBox(dialogBoxType);

        if(this.data.confirmBoxNumber <= 1) {
            this.dialogBoxView.render(dialogBoxType, message, disableCloseButton, response.exitResponseHandler, response.yesResponseHandler, 
                response.noResponseHandler, this.data.confirmBoxNumber, this.close.bind(this)
            );
        }
    };
}