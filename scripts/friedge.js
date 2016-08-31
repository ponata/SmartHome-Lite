document.addEventListener("DOMContentLoaded", function() {

    var HTML = {
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
        flag: "true",
        status: "off",
        timeFrost: 5000
    }

    var modalMessages = {
        frozen: "Frozen!",
        defrozen: "Defrozen!"
    }


    HTML.btnAddProducts.onclick = function(e) {
        e.preventDefault();
        addProduct(HTML);
        if (startingValues.currentWidth > 0 && document.querySelector(".svg-elem.off") && HTML.products.children.length) {
            startingValues.status = "on";
            Enable(HTML, startingValues, modalMessages);
            setColor(HTML, startingValues);
            if (!HTML.status.checked) {
                // no electricity
                startingValues.flag = "false";
                Battery(HTML, startingValues, modalMessages);

            } else {
                // is electr

            }
        } else {

        }

    }
    HTML.btnRemoveProducts.onclick = function(e) {
            e.preventDefault();
            removeProduct(HTML);
            if (!HTML.products.children.length) {
                startingValues.status = "off";
                Enable(HTML, startingValues, modalMessages);
            } else {}
        }
        // check input, if it was changed
    document.getElementById('inputWrapper').addEventListener('input', function(event) {
        var elem = event.target;
        if (checkInput(HTML)) {
            startingValues.currentTemps = getCurrentTemps(HTML);
            startingValues.stepRevert = calcStep(HTML, startingValues);
            setColor(HTML, startingValues);
        }
    });


    // check if mode was selected
    HTML.selectMode.onchange = function() {
        selectMode(HTML);
        startingValues.currentTemps = getCurrentTemps(HTML);
        setColor(HTML, startingValues);
    }

    // extreme frost
    HTML.btnExtremeFrost.onclick = function(e) {
        e.preventDefault();
        frostProduct(HTML, startingValues, modalMessages);
    }
    HTML.status.onclick = function() {
        // is electricity
        if (HTML.status.checked) {
            startingValues.flag = "true";
            Battery(HTML, startingValues, modalMessages);

        }
        // no electricity
        else {
            startingValues.flag = "false";
            Battery(HTML, startingValues, modalMessages);

        }
    }

});

function Enable(HTML, startingValues, modalMessages) {

    switch (startingValues.status) {
        case "on":
            HTML.svg.classList.add("on");
            HTML.svg.classList.remove("off");
            break;

        case "off":
            HTML.svg.classList.add("off");
            HTML.svg.classList.remove("on");
            break;
    }
}

function Battery(HTML, startingValues, modalMessages) {
    // var currentTemps;

    switch (startingValues.flag) {

        case "true":

            startingValues.speed = 70;

            var timeoutIDT = setInterval(function() {

                setBatteryColor(HTML, startingValues);
                // before new iteration, check electricity status
                if (HTML.status.checked) {
                    svg.classList.remove("battery-mode");
                    // friedge was off and we have products
                    if (document.querySelector(".svg-elem.off") && HTML.products.children.length) {
                        startingValues.status = "on";
                        Enable(HTML, startingValues, modalMessages);
                        setColor(HTML, startingValues);

                    } else {

                    }
                    if (startingValues.currentWidth + startingValues.stepForward < 100) {
                        startingValues.currentWidth += startingValues.stepForward;

                        HTML.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
                        HTML.progressBar.style.width = startingValues.currentWidth + '%';

                    } else {
                        startingValues.currentWidth = 100;
                        HTML.outputPercentage.innerHTML = '100%';
                        HTML.progressBar.style.width = '100%';
                        clearTimeout(timeoutIDT);
                        return false;
                    }

                } else {
                    // electricity turned off
                    clearTimeout(timeoutIDT);
                    return false;
                    // startingValues.flag = "false";
                    // Battery(HTML, startingValues, modalMessages);
                }

            }, startingValues.speed);

            break;


        case "false":
            svg.classList.add("battery-mode");
            startingValues.speed = 40;
            startingValues.currentTemps = getCurrentTemps(HTML);

            var timeoutIDF = setInterval(function() {
                setBatteryColor(HTML, startingValues);

                    // before new iteration, check the electricity status
                    // no electricity
                if (!HTML.status.checked) {
                    // check products
                    if (HTML.products.children.length) {
                        // check input, if it was changed
                        // document.getElementById('inputWrapper').addEventListener('input', function(event) {
                        //     var elem = event.target;
                        //     if (checkInput(elem)) {
                        //         startingValues.currentTemps = getCurrentTemps(HTML);
                        //         startingValues.stepRevert = calcStep(HTML, startingValues);
                        //         setColor(HTML, startingValues);
                        //     }
                        // });


                        // check if mode was selected
                        HTML.selectMode.onchange = function() {
                            selectMode(HTML);
                            startingValues.currentTemps = getCurrentTemps(HTML);
                            startingValues.stepRevert = calcStep(HTML, startingValues);
                            setColor(HTML, startingValues);
                        }
                        if (checkInput(HTML)) {
                            startingValues.currentTemps = getCurrentTemps(HTML);
                            startingValues.stepRevert = calcStep(HTML, startingValues);
                            setColor(HTML, startingValues);
                        }


                        if (startingValues.currentWidth - startingValues.stepRevert > 0) {
                            startingValues.currentWidth -= startingValues.stepRevert;
                            HTML.outputPercentage.innerHTML = parseInt(startingValues.currentWidth) + '%';
                            HTML.progressBar.style.width = startingValues.currentWidth + '%';
                        } else {
                            startingValues.currentWidth = 0;
                            HTML.outputPercentage.innerHTML = '0%';
                            HTML.progressBar.style.width = '0%';
                            startingValues.status = "off";
                            Enable(HTML, startingValues, modalMessages);

                            clearTimeout(timeoutIDF);
                            return false;
                            // check when electricity will on
                            // if (HTML.status.checked) {
                            //     clearTimeout(timeoutID);
                            //     startingValues.flag = "true";
                            //     Battery(HTML, startingValues, modalMessages);
                            // }
                        }
                    }
                    // no products
                    else {
                        // is electricity
                        if (HTML.status.checked) {
                            clearTimeout(timeoutIDF);
                            return false;
                            // startingValues.flag = "true";
                            // Battery(HTML, startingValues, modalMessages);
                        }
                        // no electricity
                        else {

                        }

                        startingValues.status = "off";
                        Enable(HTML, startingValues, modalMessages);
                        clearTimeout(timeoutIDF);
                        return false;
                    }

                } else {
                    // electricity turned on
                    clearTimeout(timeoutIDF);
                    return false;
                    // startingValues.flag = "true";
                    // Battery(HTML, startingValues, modalMessages);
                }

            }, startingValues.speed);

            break;

    }
}

function getCurrentTemps(HTML) {

    var object = {
        inputFreezeTemp: HTML.inputFreezeTemp.value,
        inputOverallTemp: HTML.inputOverallTemp.value
    }
    return object;
}

function checkInput(HTML) {

    for (var i = 0, elem = HTML.inputsTemp; i < elem.length; i++) {

        if (parseInt(elem[i].value) >= parseInt(elem[i].min) && parseInt(elem[i].value) <= parseInt(elem[i].max)) {
            return true;
        } else {
            return false;
        }
    }
}

function calcStep(HTML, startingValues) {
    var coefficient = 0;

    for (var i = 0; i < HTML.inputsTemp.length; i++) {

        if (HTML.inputsTemp[i].value > 0) {
            coefficient += Math.pow(HTML.inputsTemp[i].value, -1);
        } else {
            coefficient += Math.abs(HTML.inputsTemp[i].value);
        }
    }

    return coefficient / 1000;
}

function showModal(HTML, startingValues, modalMessages) {

    HTML.modal.style.display = "block";

    HTML.close.onclick = function() {
        HTML.modal.style.display = "none";
    }
    window.onclick = function(e) {
        if (e.target == HTML.modal) {
            HTML.modal.style.display = "none";
        } else {}

    }
}

function selectMode(HTML) {

    switch (HTML.selectMode.options[HTML.selectMode.selectedIndex].value) {
        case "standard":
            HTML.inputFreezeTemp.value = "-18";
            HTML.inputOverallTemp.value = "5";
            for (var i = 0; i < HTML.inputsTemp.length; i++) {
                HTML.inputsTemp[i].disabled = true;
            }
            break;
        case "light":
            HTML.inputFreezeTemp.value = "-14";
            HTML.inputOverallTemp.value = "9";
            for (var i = 0; i < HTML.inputsTemp.length; i++) {
                HTML.inputsTemp[i].disabled = true;
            }
            break;
        case "highFreeze":
            HTML.inputFreezeTemp.value = "-27";
            HTML.inputOverallTemp.value = "3";
            for (var i = 0; i < HTML.inputsTemp.length; i++) {
                HTML.inputsTemp[i].disabled = true;
            }
            break;
        case "custom":
            for (var i = 0; i < HTML.inputsTemp.length; i++) {
                HTML.inputsTemp[i].disabled = false;
            }
            break;
    }
}

function setColor(HTML, startingValues) {
    startingValues.currentTemps = getCurrentTemps(HTML);
    var coefficient = calcStep(HTML, startingValues);
    var svgColor = document.getElementById("svgColor");
    if (coefficient * 1000 < 15) {
        svgColor.className = "light";
    } else if (coefficient * 1000 >= 27) {
        svgColor.className = "highFreeze";
    } else {
        svgColor.className = "standard";
    }
}

function addProduct(HTML) {
    var error = document.getElementById("productError");
    HTML.errorExtremeFrost.style.opacity = "0";

    if (HTML.newProduct.value) {
        error.style.opacity = 0;

        var label = document.createElement("label");
        var elem = document.createElement("input");

        label.className = "product";
        elem.type = "checkbox";

        label.innerHTML = HTML.newProduct.value;
        label.appendChild(elem);
        HTML.products.appendChild(label);
        HTML.newProduct.value = "";
    } else {
        error.style.opacity = 1;
    }
}

function removeProduct(HTML) {
    var elements = document.querySelectorAll(".products input:checked");
    for (var i = 0; i < elements.length; i++) {
        var parents = elements[i].parentNode;
        parents.parentNode.removeChild(parents);

    }
}

function frostProduct(HTML, startingValues, modalMessages) {
    HTML.errorExtremeFrost.style.opacity = "0";
    startingValues.speed = 50;
    var tmp = 0;

    // products for frost
    var elements = document.querySelectorAll(".products label:not(.product-frozen)");

    if (elements.length) {
        var prevTemperatures = getCurrentTemps(HTML);

        // set temperature to min
        HTML.inputOverallTemp.value = HTML.inputOverallTemp.min;
        HTML.inputFreezeTemp.value = HTML.inputFreezeTemp.min;

        showModal(HTML, startingValues, modalMessages);

        HTML.gif.style.display = "block";
        HTML.outputModalMessage.innerHTML = "Freeze in progress...";

        var timeoutID = setInterval(function() {
            if (startingValues.currentWidth > 0) {
                if (tmp + startingValues.speed < startingValues.timeFrost) {
                    tmp += startingValues.speed;
                    HTML.loaderPercentage.innerHTML = parseInt((tmp / startingValues.timeFrost) * 100) + '%';
                } else {
                    // set prev temp mode
                    HTML.inputOverallTemp.value = prevTemperatures.inputOverallTemp;
                    HTML.inputFreezeTemp.value = prevTemperatures.inputFreezeTemp;

                    HTML.loaderPercentage.innerHTML = "100%";
                    HTML.gif.style.display = "none";
                    HTML.outputModalMessage.innerHTML = "Frozen!";

                    for (var i = 0; i < elements.length; i++) {
                        var parents = elements[i].parentNode;
                        elements[i].classList.add("product-frozen");
                    }

                    clearTimeout(timeoutID);
                }
            }
            // no battery
            else {
                HTML.gif.style.display = "none";
                HTML.loaderPercentage.display = "none";
                HTML.outputModalMessage.innerHTML = "No battery energy...";
                clearTimeout(timeoutID);
                return false;
            }


        }, startingValues.speed);
    }
    // no prod to frost
    else {
        HTML.errorExtremeFrost.style.opacity = "1";
        return false;
    }

}

function setBatteryColor(HTML, startingValues) {
    if (startingValues.currentWidth > 70) {
        HTML.progressBar.style.background = "#70FA70";

    } else if (startingValues.currentWidth < 35) {
        HTML.progressBar.style.background = "#F54D4D";
    } else {
        HTML.progressBar.style.background = "#FEBD48";

    }

}
