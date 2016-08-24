document.addEventListener("DOMContentLoaded", function() {

    var htmlObjects = {
        inputFreezeTemp: document.getElementById("inputFreezeTemp"),
        inputOverallTemp: document.getElementById("inputOverallTemp"),
        progressBar: document.getElementById("progressBar"),
        outputPercentage: document.getElementById("outputPercentage"),
        close: document.getElementById("close"),
        modal: document.getElementById("modal"),
        outputModalMessage: document.getElementById("outputModalMessage"),
        defrost: document.getElementById("defrost"),
        svg: document.getElementById("svg"),
        btnPower: document.getElementById("btnPower"),
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
    htmlObjects.btnPower.onclick = function(e) {

        if (htmlObjects.status.checked) {
            htmlObjects.svg.classList.add("on");
            htmlObjects.svg.classList.remove("off");
            startingValues.flag = "frost";
            Frost(htmlObjects, startingValues, modalMessages);
        } else {
            htmlObjects.svg.classList.add("off");
            htmlObjects.svg.classList.remove("on");
            startingValues.flag = "defrost";
            Frost(htmlObjects, startingValues, modalMessages);
        }

    }

    htmlObjects.selectMode.onchange = function() {

        switch (htmlObjects.selectMode.options[htmlObjects.selectMode.selectedIndex].value) {
            case "standard":
                htmlObjects.inputFreezeTemp.value = "-18";
                htmlObjects.inputOverallTemp.value = "-8";
                htmlObjects.svg.classList.add("standard");
                htmlObjects.svg.classList.remove("light");
                htmlObjects.svg.classList.remove("highFreeze");

                break;
            case "light":
                htmlObjects.inputFreezeTemp.value = "-12";
                htmlObjects.inputOverallTemp.value = "-4";
                htmlObjects.svg.classList.add("light");
                htmlObjects.svg.classList.remove("standard");
                htmlObjects.svg.classList.remove("highFreeze");
                break;
            case "highFreeze":
                htmlObjects.inputFreezeTemp.value = "-27";
                htmlObjects.inputOverallTemp.value = "-15";
                htmlObjects.svg.classList.add("highFreeze");
                htmlObjects.svg.classList.remove("standard");
                htmlObjects.svg.classList.remove("light");
                break;
        }

    }


});

// new frost function

function Frost(htmlObjects, startingValues, modalMessages) {
    var currentTemps;

    switch (startingValues.flag) {

        // Start to froze
        case "frost":

            startingValues.speed = 70;

            var timeoutID = setInterval(function() {
                startingValues.currentTemps = getCurrentTemps(htmlObjects);

                startingValues.stepForward = (startingValues.currentTemps.inputFreezeTemp + startingValues.currentTemps.inputOverallTemp) / 5000;
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
                        startingValues.flag = "defrost";
                        Frost(htmlObjects, startingValues, modalMessages);
                    }, 3000);
                }
            }, startingValues.speed);

            break;


            // start to derfrost
        case "defrost":

            startingValues.speed = 40;

            var timeoutID = setInterval(function() {

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
                    startingValues.flag = "frost";
                    if (htmlObjects.status.checked) {
                        Frost(htmlObjects, startingValues, modalMessages);
                    } else {}

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
