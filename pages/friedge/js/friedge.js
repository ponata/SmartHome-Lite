document.addEventListener("DOMContentLoaded", function() {

    var htmlObjects = {
        inputFreezeTemp: document.getElementById("inputFreezeTemp"),
        inputOverallTemp: document.getElementById("inputOverallTemp"),
        progressBar: document.getElementById("progressBar"),
        outputPercentage: document.getElementById("outputPercentage"),
        close: document.getElementById("close"),
        modal: document.getElementById("modal"),
        outputModalMessage: document.getElementById("outputModalMessage"),
        defrost: document.getElementById("defrost")
    }

    var startingValues = {
        currentWidth: 0,
        stepForward: 0,
        stepRevert: 1,
        currentTemps: {}
    }

    var modalMessages = {
        frozen: "Frozen!",
        unfrozen: "Unfrozen!"
    }
    htmlObjects.defrost.onclick = function(e) {
    	e.preventDefault();
        Frost(htmlObjects, startingValues, modalMessages, 10);
    }

    Frost(htmlObjects, startingValues, modalMessages, 50);


});


function Frost(htmlObjects, startingValues, modalMessages, speed) {
    var currentTemps;

    var timeoutID = setInterval(function() {
        startingValues.currentTemps = getCurrentTemps(htmlObjects);

        startingValues.stepForward = (startingValues.currentTemps.inputFreezeTemp + startingValues.currentTemps.inputOverallTemp) / 5000;
        if (startingValues.currentWidth + startingValues.stepForward < 100) {
            startingValues.currentWidth += startingValues.stepForward;

        } else {
            startingValues.currentWidth = 100;
            htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
            htmlObjects.progressBar.style.width = parseInt(startingValues.currentWidth) + '%';

            showModal(htmlObjects, startingValues, modalMessages);
            setTimeout(function() {

                deFrost(htmlObjects, startingValues, modalMessages, 50);
            }, 3000);

            clearTimeout(timeoutID);

        }
        htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
        htmlObjects.progressBar.style.width = startingValues.currentWidth + '%';

    }, speed);
}

function deFrost(htmlObjects, startingValues, modalMessages, speed) {

    var timeoutID = setInterval(function() {

        if (startingValues.currentWidth - startingValues.stepRevert > 0) {
            startingValues.currentWidth -= startingValues.stepRevert;

        } else {

            startingValues.currentWidth = 0;
            htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
            htmlObjects.progressBar.style.width = parseInt(startingValues.currentWidth) + '%';
            showModal(htmlObjects, startingValues, modalMessages);

            setTimeout(function() {

                Frost(htmlObjects, startingValues, modalMessages, 50);
            }, 3000);

            clearTimeout(timeoutID);

        }
        htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
        htmlObjects.progressBar.style.width = startingValues.currentWidth + '%';

    }, speed);


}

function getCurrentTemps(htmlObjects) {
    var object = {
        inputFreezeTemp: Math.abs(htmlObjects.inputFreezeTemp.value),
        inputOverallTemp: Math.abs(htmlObjects.inputOverallTemp.value)
    }
    return object;
}

function showModal(htmlObjects, startingValues, modalMessages) {

    switch (startingValues.currentWidth) {
        case 100:
            htmlObjects.outputModalMessage.classList.add("frozen");
            htmlObjects.modal.style.display = "block";
            htmlObjects.outputModalMessage.innerHTML = modalMessages.frozen;
            setTimeout(function() {
                htmlObjects.modal.style.display = "none";
                htmlObjects.outputModalMessage.classList.remove("frozen");
            }, 3000);
            break;
        case 0:
            htmlObjects.outputModalMessage.classList.add("unfrozen");
            htmlObjects.modal.style.display = "block";
            setTimeout(function() {
                htmlObjects.modal.style.display = "none";
                htmlObjects.outputModalMessage.classList.remove("unfrozen");
            }, 3000);
            htmlObjects.outputModalMessage.innerHTML = modalMessages.unfrozen;
            break;
    }

    htmlObjects.close.onclick = function() {
        // body...
        htmlObjects.modal.style.display = "none";

    }

}
