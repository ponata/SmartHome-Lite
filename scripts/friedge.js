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
        newProduct: document.getElementById("newProduct"),
        loaderPercentage: document.getElementById("loaderPercentage"),
        gif: document.getElementById("gif"),
        errorExtremeFrost: document.getElementById("errorExtremeFrost")
    }

    var startingValues = {
        currentWidth: 0,
        stepForward: .3,
        stepRevert: 0,
        speed: 50,
        currentTemps: {},
        flag: true,
        status: "off",
        timeFrost: 5000
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
        frostProduct(htmlObjects, startingValues, modalMessages);
    }

});

function Enable(htmlObjects, startingValues, modalMessages) {

    switch (startingValues.status) {
        case "on":
            htmlObjects.svg.classList.add("on");
            htmlObjects.svg.classList.remove("off");
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
                    svg.classList.remove("battery-mode");
                    // friedge was off and we have products
                    if (document.querySelector(".svg-elem.off") && htmlObjects.products.children.length) {
                        startingValues.status = "on";
                        Enable(htmlObjects, startingValues, modalMessages);
                        setColor(htmlObjects, startingValues);

                    } else {

                    }
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
            svg.classList.add("battery-mode");
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

                        startingValues.stepRevert = calcStep(htmlObjects, startingValues);
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
        inputFreezeTemp: htmlObjects.inputFreezeTemp.value,
        inputOverallTemp: htmlObjects.inputOverallTemp.value
    }
    return object;
}

function calcStep(htmlObjects, startingValues) {
    var coefficient = 0;

    for (var i = 0; i < htmlObjects.inputsTemp.length; i++) {
        // console.log(startingValues.currentTemps[i].value);
        if (htmlObjects.inputsTemp[i].value > 0) {
            coefficient += Math.pow(htmlObjects.inputsTemp[i].value, -1);
        } else {
            coefficient += Math.abs(htmlObjects.inputsTemp[i].value);
        }
    }

    return coefficient/1000;
}

function showModal(htmlObjects, startingValues, modalMessages) {

    htmlObjects.modal.style.display = "block";

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

    if (parseInt(elem.value) >= parseInt(elem.min) && parseInt(elem.value) <= parseInt(elem.max)) {
        return true
    } else {
        return false;
    }
}

function selectMode(htmlObjects) {

    switch (htmlObjects.selectMode.options[htmlObjects.selectMode.selectedIndex].value) {
        case "standard":
            htmlObjects.inputFreezeTemp.value = "-18";
            htmlObjects.inputOverallTemp.value = "5";
            for (var i = 0; i < htmlObjects.inputsTemp.length; i++) {
                htmlObjects.inputsTemp[i].disabled = true;
            }
            break;
        case "light":
            htmlObjects.inputFreezeTemp.value = "-14";
            htmlObjects.inputOverallTemp.value = "9";
            for (var i = 0; i < htmlObjects.inputsTemp.length; i++) {
                htmlObjects.inputsTemp[i].disabled = true;
            }
            break;
        case "highFreeze":
            htmlObjects.inputFreezeTemp.value = "-27";
            htmlObjects.inputOverallTemp.value = "3";
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
    var coefficient = calcStep(htmlObjects, startingValues);
    var svgColor = document.getElementById("svgColor");
    if (coefficient*1000 < 15) {
        svgColor.className = "light";
    } else if (coefficient*1000 >= 27) {
        svgColor.className = "highFreeze";
    } else {
        svgColor.className = "standard";
    }
}

function addProduct(htmlObjects) {
    var error = document.getElementById("productError");
    htmlObjects.errorExtremeFrost.style.opacity = "0";

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

function frostProduct(htmlObjects, startingValues, modalMessages) {
    htmlObjects.errorExtremeFrost.style.opacity = "0";
    startingValues.speed = 50;
    var tmp = 0;

    // products for frost
    var elements = document.querySelectorAll(".products label:not(.product-frozen)");

    if (elements.length) {
        var prevTemperatures = getCurrentTemps(htmlObjects);

        // set temperature to min
        htmlObjects.inputOverallTemp.value = htmlObjects.inputOverallTemp.min;
        htmlObjects.inputFreezeTemp.value = htmlObjects.inputFreezeTemp.min;

        showModal(htmlObjects, startingValues, modalMessages);

        htmlObjects.gif.style.display = "block";
        htmlObjects.outputModalMessage.innerHTML = "Freeze in progress...";

        var timeoutID = setInterval(function() {
            if (startingValues.currentWidth > 0) {
                if (tmp + startingValues.speed < startingValues.timeFrost) {
                    tmp += startingValues.speed;
                    htmlObjects.loaderPercentage.innerHTML = parseInt((tmp / startingValues.timeFrost) * 100) + '%';
                } else {
                    // set prev temp mode
                    htmlObjects.inputOverallTemp.value = prevTemperatures.inputOverallTemp;
                    htmlObjects.inputFreezeTemp.value = prevTemperatures.inputFreezeTemp;

                    htmlObjects.loaderPercentage.innerHTML = "100%";
                    htmlObjects.gif.style.display = "none";
                    htmlObjects.outputModalMessage.innerHTML = "Frozen!";

                    for (var i = 0; i < elements.length; i++) {
                        var parents = elements[i].parentNode;
                        elements[i].classList.add("product-frozen");
                    }

                    clearTimeout(timeoutID);
                }
            }
            // no battery
            else {
                htmlObjects.gif.style.display = "none";
                htmlObjects.loaderPercentage.display = "none";
                htmlObjects.outputModalMessage.innerHTML = "No battery energy...";
                clearTimeout(timeoutID);
                return false;
            }


        }, startingValues.speed);
    }
    // no prod to frost
    else {
        htmlObjects.errorExtremeFrost.style.opacity = "1";
        return false;
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
