document.addEventListener("DOMContentLoaded", function() {

    var htmlObjects = {
        inputFreezeTemp: document.getElementById("inputFreezeTemp"),
        inputOverallTemp: document.getElementById("inputOverallTemp"),
        inputsTemp: document.getElementsByClassName("temp"),
        progressBar: document.getElementById("progressBar"),
        outputPercentage: document.getElementById("outputPercentage"),
        close: document.getElementById("close"),
        modal: document.getElementById("modal"),
        outputModalMessage: document.getElementById("outputModalMessage"),
        svg: document.getElementById("svg"),
        status: document.getElementById("status"),
        selectMode: document.getElementById("selectMode"),
        products: document.getElementById("products"),
        btnAddProducts: document.getElementById("btnAddProducts"),
        btnRemoveProducts: document.getElementById("btnRemoveProducts"),
        btnExtremeFrost: document.getElementById("btnExtremeFrost"),
        newProduct: document.getElementById("newProduct")
    }

    var startingValues = {
        currentWidth: 0,
        stepForward: .3,
        stepRevert: 0,
        speed: 50,
        currentTemps: {},
        flag: true,
        status: "off"
    }

    var modalMessages = {
        frozen: "Frozen!",
        defrozen: "Defrozen!"
    }

    Frost(htmlObjects, startingValues, modalMessages);

    htmlObjects.btnAddProducts.onclick = function(e) {
        e.preventDefault();
        addProduct(htmlObjects);
        if (document.querySelector(".svg-elem.off") && htmlObjects.products.children.length) {
            startingValues.status = "on";
            Enable(htmlObjects, startingValues, modalMessages);
            setColor(htmlObjects, startingValues);
            if (htmlObjects.status.checked) {
                // no electricity
                startingValues.flag = false;
                Frost(htmlObjects, startingValues, modalMessages);

            } else {
                // is electr

            }
        } else {

        }

    }
    htmlObjects.btnRemoveProducts.onclick = function(e) {
        e.preventDefault();
        removeProduct(htmlObjects);
        if (!htmlObjects.products.children.length) {
            startingValues.status = "off";
            Enable(htmlObjects, startingValues, modalMessages);
        } else {}
    }

});

function Enable(htmlObjects, startingValues, modalMessages) {

    switch (startingValues.status) {
        case "on":

            htmlObjects.svg.classList.add("on");
            htmlObjects.svg.classList.remove("off");

            // check input, if it was changed
            document.getElementById('inputWrapper').addEventListener('change', function(event) {
                setColor(htmlObjects, startingValues);
            });

            // check if mode was selected
            htmlObjects.selectMode.onchange = function() {
                selectMode(htmlObjects);
                startingValues.currentTemps = getCurrentTemps(htmlObjects);
                setColor(htmlObjects, startingValues);
            }

            // extreme frost
            htmlObjects.btnExtremeFrost.onclick = function(e) {
                e.preventDefault();
                frostProduct(htmlObjects);
            }

            break;

        case "off":
            htmlObjects.svg.classList.add("off");
            htmlObjects.svg.classList.remove("on");
            break;
    }


}

function Frost(htmlObjects, startingValues, modalMessages) {
    // var currentTemps;

    switch (startingValues.flag) {


        case true:

            startingValues.speed = 70;

            var timeoutID = setInterval(function() {
                setBatteryColor(htmlObjects, startingValues);
                // before new iteration, check electricity status
                if (!htmlObjects.status.checked) {
                    if (startingValues.currentWidth + startingValues.stepForward < 100) {
                        startingValues.currentWidth += startingValues.stepForward;

                        htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
                        htmlObjects.progressBar.style.width = startingValues.currentWidth + '%';

                    } else {
                        startingValues.currentWidth = 100;
                        htmlObjects.outputPercentage.innerHTML = '100%';
                        htmlObjects.progressBar.style.width = '100%';
                    }

                } else {
                    // electricity turned off
                    clearTimeout(timeoutID);
                    startingValues.flag = false;
                    Frost(htmlObjects, startingValues, modalMessages);
                }

            }, startingValues.speed);

            break;


        case false:

            startingValues.speed = 40;
            startingValues.currentTemps = getCurrentTemps(htmlObjects);

            var timeoutID = setInterval(function() {
                setBatteryColor(htmlObjects, startingValues);
                // before new iteration, check the electricity status
                // no electricity
                if (htmlObjects.status.checked) {
                    // check products
                    if (htmlObjects.products.children.length) {
                        // check input, if it was changed
                        document.getElementById('inputWrapper').addEventListener('change', function(event) {
                            var elem = event.target;
                            if (checkInput(elem)) {
                                startingValues.currentTemps = getCurrentTemps(htmlObjects);
                                setColor(htmlObjects, startingValues);
                            }
                        });

                        // check if mode was selected
                        htmlObjects.selectMode.onchange = function() {
                            selectMode(htmlObjects);
                            startingValues.currentTemps = getCurrentTemps(htmlObjects);
                            setColor(htmlObjects, startingValues);
                        }

                        startingValues.currentTemps = getCurrentTemps(htmlObjects);
                        startingValues.stepRevert = (startingValues.currentTemps.inputFreezeTemp + startingValues.currentTemps.inputOverallTemp) / 1000;
                        if (startingValues.currentWidth - startingValues.stepRevert > 0) {
                            startingValues.currentWidth -= startingValues.stepRevert;
                            htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
                            htmlObjects.progressBar.style.width = startingValues.currentWidth + '%';
                        } else {
                            startingValues.currentWidth = 0;
                            htmlObjects.outputPercentage.innerHTML = '0%';
                            htmlObjects.progressBar.style.width = '0%';
                            startingValues.status = "off";
                            Enable(htmlObjects, startingValues, modalMessages);
                            // check when electricity will on
                            if (!htmlObjects.status.checked) {
                                clearTimeout(timeoutID);
                                startingValues.flag = true;
                                Frost(htmlObjects, startingValues, modalMessages);
                            }
                        }
                    }
                    // no products
                    else {
                        // electricity on
                        if (!htmlObjects.status.checked) {
                            clearTimeout(timeoutID);
                            startingValues.flag = true;
                            Frost(htmlObjects, startingValues, modalMessages);
                        } else {

                        }
                        startingValues.status = "off";
                        Enable(htmlObjects, startingValues, modalMessages);
                    }

                } else {
                    // electricity turned off
                    clearTimeout(timeoutID);
                    startingValues.flag = true;
                    Frost(htmlObjects, startingValues, modalMessages);
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
            htmlObjects.outputModalMessage.className = "frozen";
            htmlObjects.modal.style.display = "block";
            htmlObjects.outputModalMessage.innerHTML = modalMessages.frozen;
            setTimeout(function() {
                htmlObjects.modal.style.display = "none";
            }, 3000);
            break;
        case 0:
            htmlObjects.outputModalMessage.className = "defrozen";
            htmlObjects.modal.style.display = "block";
            setTimeout(function() {
                htmlObjects.modal.style.display = "none";
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
            for (var i = 0; i < htmlObjects.inputsTemp.length; i++) {
                htmlObjects.inputsTemp[i].disabled = true;
            }
            break;
        case "light":
            htmlObjects.inputFreezeTemp.value = "-9";
            htmlObjects.inputOverallTemp.value = "-3";
            for (var i = 0; i < htmlObjects.inputsTemp.length; i++) {
                htmlObjects.inputsTemp[i].disabled = true;
            }
            break;
        case "highFreeze":
            htmlObjects.inputFreezeTemp.value = "-27";
            htmlObjects.inputOverallTemp.value = "-10";
            for (var i = 0; i < htmlObjects.inputsTemp.length; i++) {
                htmlObjects.inputsTemp[i].disabled = true;
            }
            break;
        case "custom":
            for (var i = 0; i < htmlObjects.inputsTemp.length; i++) {
                htmlObjects.inputsTemp[i].disabled = false;
            }
            break;
    }
}

function setColor(htmlObjects, startingValues) {
    startingValues.currentTemps = getCurrentTemps(htmlObjects);
    var svgColor = document.getElementById("svgColor");
    if ((startingValues.currentTemps.inputFreezeTemp + startingValues.currentTemps.inputOverallTemp) <= 12) {
        svgColor.className = "light";
    } else if ((startingValues.currentTemps.inputFreezeTemp + startingValues.currentTemps.inputOverallTemp) >= 37) {
        svgColor.className = "highFreeze";
    } else {
        svgColor.className = "standard";
    }
}

function addProduct(htmlObjects) {
    var error = document.getElementById("productError");

    if (htmlObjects.newProduct.value) {
        error.style.opacity = 0;

        var label = document.createElement("label");
        var elem = document.createElement("input");

        label.className = "product";
        elem.type = "checkbox";

        label.innerHTML = htmlObjects.newProduct.value;
        label.appendChild(elem);
        htmlObjects.products.appendChild(label);
        htmlObjects.newProduct.value = "";
    } else {
        error.style.opacity = 1;
    }
}

function removeProduct(htmlObjects) {
    var elements = document.querySelectorAll(".products input:checked");
    for (var i = 0; i < elements.length; i++) {
        var parents = elements[i].parentNode;
        parents.parentNode.removeChild(parents);

    }
}

function frostProduct(htmlObjects) {
    var elements = document.querySelectorAll(".products label");
    for (var i = 0; i < elements.length; i++) {
        var parents = elements[i].parentNode;
        elements[i].classList.add("product-frozen");
    }
}

function setBatteryColor(htmlObjects, startingValues) {
    if (startingValues.currentWidth > 70) {
        htmlObjects.progressBar.style.background = "#70FA70";

    } else if (startingValues.currentWidth < 35) {
        htmlObjects.progressBar.style.background = "#F54D4D";
    } else {
        htmlObjects.progressBar.style.background = "#FEBD48";

    }

}
