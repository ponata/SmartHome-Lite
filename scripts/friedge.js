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
        if (!htmlObjects.status.checked && document.querySelector(".svg-elem.off") && htmlObjects.products.children.length) {

            htmlObjects.svg.classList.add("on");
            htmlObjects.svg.classList.remove("off");
            setColor(htmlObjects, startingValues);
            startingValues.flag = "frost";
            Frost(htmlObjects, startingValues, modalMessages);
        } else {}
    }
    htmlObjects.btnAddProducts.onclick = function(e) {
        e.preventDefault();
        addProduct(htmlObjects);
        if (!htmlObjects.status.checked && document.querySelector(".svg-elem.off")) {

            htmlObjects.svg.classList.add("on");
            htmlObjects.svg.classList.remove("off");
            setColor(htmlObjects, startingValues);
            startingValues.flag = "frost";
            Frost(htmlObjects, startingValues, modalMessages);
        } else {}
    }
    htmlObjects.btnRemoveProducts.onclick = function(e) {
        e.preventDefault();
        removeProduct(htmlObjects);
    }



});


function Frost(htmlObjects, startingValues, modalMessages) {
    // var currentTemps;

    switch (startingValues.flag) {

        // Start frost
        case "frost":

            startingValues.speed = 70;
            startingValues.currentTemps = getCurrentTemps(htmlObjects);

            var timeoutID = setInterval(function() {
                // before new iteration, check electricity status
                if (!htmlObjects.status.checked) {
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

                        // extreme frost
                        htmlObjects.btnExtremeFrost.onclick = function(e) {
                                e.preventDefault();
                                frostProduct(htmlObjects);
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
                        htmlObjects.svg.classList.add("off");
                        htmlObjects.svg.classList.remove("on");

                        clearTimeout(timeoutID);
                        // run Frost with new flag
                        startingValues.flag = "defrost";
                        Frost(htmlObjects, startingValues, modalMessages);
                    }

                } else {

                    // electricity turned off
                    clearTimeout(timeoutID);
                    startingValues.flag = "defrost";
                    Frost(htmlObjects, startingValues, modalMessages);
                }

            }, startingValues.speed);

            break;

            // start derfrost
        case "defrost":

            startingValues.speed = 40;
            startingValues.stepRevert = 1;


            var timeoutID = setInterval(function() {
                // before new iteration, check the electricity status
                if (!htmlObjects.status.checked) {

                    // no products
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

                        if (htmlObjects.products.children.length) {
                            startingValues.flag = "frost";
                            Frost(htmlObjects, startingValues, modalMessages);
                        } else {

                            clearTimeout(timeoutID);
                            htmlObjects.svg.classList.add("off");
                            htmlObjects.svg.classList.remove("on");
                            return false;
                        }
                    }





                } else {
                    // electricity turned off
                    clearTimeout(timeoutID);
                    startingValues.flag = "power saving mode";
                    Frost(htmlObjects, startingValues, modalMessages);
                }

            }, startingValues.speed);

            break;

        case "power saving mode":

            startingValues.speed = 1000;
            startingValues.stepRevert = 0.3;

            var timeoutID = setInterval(function() {
                // before new iteration, check the electricity status
                // if electricity turned off
                if (htmlObjects.status.checked) {
                    if (startingValues.currentWidth - startingValues.stepRevert > 0) {
                        startingValues.currentWidth -= startingValues.stepRevert;
                        htmlObjects.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
                        htmlObjects.progressBar.style.width = startingValues.currentWidth + '%';
                    } else {
                        startingValues.currentWidth = 0;
                        htmlObjects.outputPercentage.innerHTML = '0%';
                        htmlObjects.progressBar.style.width = '0%';
                        showModal(htmlObjects, startingValues, modalMessages);

                        if (!htmlObjects.status.checked && htmlObjects.products.children.length) {
                            startingValues.flag = "frost";
                            Frost(htmlObjects, startingValues, modalMessages);
                        } else {
                            htmlObjects.svg.classList.add("off");
                            htmlObjects.svg.classList.remove("on");
                            clearTimeout(timeoutID);
                            return false;
                        }
                        clearTimeout(timeoutID);
                    }

                } else {
                    // electricity turned on
                    clearTimeout(timeoutID);
                    startingValues.flag = "frost";
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
    var elements = document.querySelectorAll(".product input:checked");
    for (var i = 0; i < elements.length; i++) {
        var parents = elements[i].parentNode;
        parents.parentNode.removeChild(parents);
    }
}

function frostProduct(htmlObjects) {
    var elements = document.querySelectorAll(".product input:checked");
    for (var i = 0; i < elements.length; i++) {
        var parents = elements[i].parentNode;
        parents.classList.add("frozen-product");
    }
}
