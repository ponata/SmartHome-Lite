document.addEventListener("DOMContentLoaded", function() {

    var htmlObjects = {
        inputFreezeTemp: document.getElementById("inputFreezeTemp"),
        inputOverallTemp: document.getElementById("inputOverallTemp"),
        inputsTemp: document.getElementsByClassName("input"),
        progressBar: document.getElementById("progressBar"),
        outputPercentage: document.getElementById("outputPercentage"),
        close: document.getElementById("close"),
        modal: document.getElementById("modal"),
        outputModalMessage: document.getElementById("outputModalMessage"),
        defrost: document.getElementById("defrost"),
        svg: document.getElementById("svg"),
        status: document.getElementById("status"),
        selectMode: document.getElementById("selectMode")
    }

    var startingValues = {
        currentWidth: 0,
        stepForward: 0,
        stepRevert: 1,
        speed: 50,
        currentTemps: {},
        flag: "frost"
    }

    var modalMessages = {
            frozen: "Frozen!",
            defrozen: "Defrozen!"
        }
        // power button clicked
    htmlObjects.status.onclick = function(e) {

        if (htmlObjects.status.checked) {
            // friedge is on

            htmlObjects.svg.classList.add("on");
            htmlObjects.svg.classList.remove("off");
            startingValues.flag = "frost";
            Frost(htmlObjects, startingValues, modalMessages);
        } else {
            // friedge is off

            htmlObjects.svg.classList.add("off");
            htmlObjects.svg.classList.remove("on");
            if (startingValues.flag == "frost") {
                startingValues.flag = "defrost";
                Frost(htmlObjects, startingValues, modalMessages);

            } else {}

        }

    }




});


function Frost(htmlObjects, startingValues, modalMessages) {
    var currentTemps;

    switch (startingValues.flag) {

        // Start frost
        case "frost":

            startingValues.speed = 70;
            startingValues.currentTemps = getCurrentTemps(htmlObjects);

            var timeoutID = setInterval(function() {
                // before new iteration, check power button status
                if (htmlObjects.status.checked) {
                    // check input, if it was changed
                    document.getElementById('inputWrapper').addEventListener('change', function(event) {
                        var elem = event.target;
                        if (checkInput(elem)) {
                            startingValues.currentTemps = getCurrentTemps(htmlObjects);
                        }
                    });
                    // check if mode was selected
                    htmlObjects.selectMode.onchange = function() {
                            selectMode(htmlObjects);
                            startingValues.currentTemps = getCurrentTemps(htmlObjects);
                        }
                        // calc the step
                    startingValues.stepForward = (startingValues.currentTemps.inputFreezeTemp + startingValues.currentTemps.inputOverallTemp) / 200;

                    if (startingValues.currentWidth + startingValues.stepForward < 100) {
                        startingValues.currentWidth += startingValues.stepForward;

                        htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
                        htmlObjects.progressBar.style.width = startingValues.currentWidth + '%';

                    } else {
                        startingValues.currentWidth = 100;
                        htmlObjects.outputPercentage.innerHTML = '100%';
                        htmlObjects.progressBar.style.width = '100%';

                        showModal(htmlObjects, startingValues, modalMessages);

                        clearTimeout(timeoutID);
                        setTimeout(function() {
                            // run Frost with new flag
                            startingValues.flag = "defrost";
                            Frost(htmlObjects, startingValues, modalMessages);
                        }, 3000);
                    }
                } else {
                    // if the friedge turned off
                    clearTimeout(timeoutID);
                    return false;
                }

            }, startingValues.speed);

            break;

            // start derfrost
        case "defrost":

            startingValues.speed = 40;

            var timeoutID = setInterval(function() {
                // before new iteration, check the status of the friedge
                if (true) {
                    if (startingValues.currentWidth - startingValues.stepRevert > 0) {
                        startingValues.currentWidth -= startingValues.stepRevert;
                        htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
                        htmlObjects.progressBar.style.width = startingValues.currentWidth + '%';
                    } else {
                        startingValues.currentWidth = 0;
                        htmlObjects.outputPercentage.innerHTML = '0%';
                        htmlObjects.progressBar.style.width = '0%';
                        showModal(htmlObjects, startingValues, modalMessages);

                        clearTimeout(timeoutID);

                        if (htmlObjects.status.checked) {

                            startingValues.flag = "frost";
                            Frost(htmlObjects, startingValues, modalMessages);
                        } else {

                            clearTimeout(timeoutID);
                            return false;
                        }
                    }
                } else {


                }


            }, startingValues.speed);

            break;
    }
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
            htmlObjects.outputModalMessage.classList.add("defrozen");
            htmlObjects.modal.style.display = "block";
            setTimeout(function() {
                htmlObjects.modal.style.display = "none";
                htmlObjects.outputModalMessage.classList.remove("defrozen");
            }, 3000);
            htmlObjects.outputModalMessage.innerHTML = modalMessages.defrozen;
            break;
    }

    htmlObjects.close.onclick = function() {
        htmlObjects.modal.style.display = "none";
    }
    window.onclick = function(e) {
        if (e.target == htmlObjects.modal) {
            htmlObjects.modal.style.display = "none";
        } else {}

    }

}

function checkInput(elem) {
    if (elem.id == "inputOverallTemp") {
        if (elem.value >= -20 && elem.value <= 0) {
            return true
        } else {
            return false;
        }

    }
    if (elem.id == "inputFreezeTemp") {
        if (elem.value >= -50 && elem.value <= 0) {
            return true
        } else {
            return false;
        }

    }
}

function selectMode(htmlObjects) {

    switch (htmlObjects.selectMode.options[htmlObjects.selectMode.selectedIndex].value) {
        case "standard":
            htmlObjects.inputFreezeTemp.value = "-18";
            htmlObjects.inputOverallTemp.value = "-6";
            // htmlObjects.svg.classList.add("standard");
            // htmlObjects.svg.classList.remove("light");
            // htmlObjects.svg.classList.remove("highFreeze");
            break;
        case "light":
            htmlObjects.inputFreezeTemp.value = "-9";
            htmlObjects.inputOverallTemp.value = "-3";
            // htmlObjects.svg.classList.add("light");
            // htmlObjects.svg.classList.remove("standard");
            // htmlObjects.svg.classList.remove("highFreeze");
            break;
        case "highFreeze":
            htmlObjects.inputFreezeTemp.value = "-27";
            htmlObjects.inputOverallTemp.value = "-10";
            // htmlObjects.svg.classList.add("highFreeze");
            // htmlObjects.svg.classList.remove("standard");
            // htmlObjects.svg.classList.remove("light");
            break;
    }

}

function setColor(htmlObjects, startingValues) {
    startingValues.currentTemps = getCurrentTemps(htmlObjects);
    switch (startingValues.currentTemps.inputFreezeTemp + startingValues.currentTemps.inputOverallTemp) {
        case expression:

            break;
        default:

    }

}
