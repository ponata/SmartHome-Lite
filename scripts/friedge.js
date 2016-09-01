document.addEventListener("DOMContentLoaded", function() {

    var HTML = {
        degFreeze: document.getElementById("degFreeze"),
        degGeneral: document.getElementById("degGeneral"),
        degs: document.getElementsByClassName("degree"),
        progressBar: document.getElementById("progressBar"),
        batteryPerc: document.getElementById("batteryPerc"),
        close: document.getElementById("close"),
        modal: document.getElementById("modal"),
        modalMessage: document.getElementById("modalMessage"),
        svg: document.getElementById("svg"),
        btnPower: document.getElementById("btnPower"),
        selectMode: document.getElementById("selectMode"),
        prodList: document.getElementById("prodList"),
        btnAddProduct: document.getElementById("btnAddProduct"),
        btnRemoveProduct: document.getElementById("btnRemoveProduct"),
        btnFrost: document.getElementById("btnFrost"),
        newProd: document.getElementById("newProd"),
        gifPerc: document.getElementById("gifPerc"),
        gif: document.getElementById("gif"),
        errFrost: document.getElementById("errFrost")
    }

    var Values = {
        currentWidth: 0,
        stepForward: .3,
        stepRevert: 0,
        speed: 50,
        currentDegs: {},
        flag: "true",
        status: "off",
        timeFrost: 5000
    }

    var Messages = {
        on: "Freeze in progress...",
        done: "Frozen!",
        err: "No battery energy..."
    }

    HTML.btnPower.onclick = function() {
        // is electricity
        if (HTML.btnPower.checked) {
            Values.flag = "true";
            console.log(Values.stepRevert);

            Battery(HTML, Values, Messages);


        }
        // no electricity
        else {
            Values.flag = "false";
            console.log(Values.stepRevert);

            Battery(HTML, Values, Messages);

        }
    }


    HTML.btnAddProduct.onclick = function(e) {
        e.preventDefault();
        addProduct(HTML);
        if (Values.currentWidth > 0 && document.querySelector(".svg-elem.off") && HTML.prodList.children.length) {
            Values.status = "on";
            Enable(HTML, Values, Messages);
            setColor(HTML, Values);
            if (!HTML.btnPower.checked) {
                // no electricity
                Values.flag = "false";
                Battery(HTML, Values, Messages);

            }
        }

    }
    HTML.btnRemoveProduct.onclick = function(e) {
            e.preventDefault();
            removeProduct(HTML);
            if (!HTML.prodList.children.length) {
                Values.status = "off";
                Enable(HTML, Values, Messages);
            }
        }
        // check input, if it was changed
    document.getElementById('inputWrapper').addEventListener('input', function(e) {
        var elem = e.target;

        if (checkInput(elem)) {
            Values.currentDegs = getcurrentDegs(HTML);
            calcStep(HTML, Values);
            setColor(HTML, Values);
        }
        console.log(Values.stepRevert);

    });


    // check if mode was selected
    HTML.selectMode.onchange = function() {
        selectMode(HTML);
        Values.currentDegs = getcurrentDegs(HTML);
        setColor(HTML, Values);
        console.log(Values.stepRevert);

    }

    // extreme frost
    HTML.btnFrost.onclick = function(e) {
        e.preventDefault();
        frostProduct(HTML, Values, Messages);
    }


});

function Enable(HTML, Values, Messages) {

    switch (Values.status) {
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

function Battery(HTML, Values, Messages) {
    // var currentDegs;

    switch (Values.flag) {

        case "true":

            Values.speed = 70;

            var timeoutIDT = setInterval(function() {

                setBatteryColor(HTML, Values);
                // before new iteration, check electricity status
                if (HTML.btnPower.checked) {
                    svg.classList.remove("battery-mode");
                    // friedge was off and we have products
                    if (document.querySelector(".svg-elem.off") && HTML.prodList.children.length) {
                        Values.status = "on";
                        Enable(HTML, Values, Messages);
                        setColor(HTML, Values);

                    } else {

                    }
                    if (Values.currentWidth + Values.stepForward < 100) {
                        Values.currentWidth += Values.stepForward;

                        HTML.batteryPerc.innerHTML = parseInt(Values.currentWidth) + '%';
                        HTML.progressBar.style.width = Values.currentWidth + '%';

                    } else {
                        Values.currentWidth = 100;
                        HTML.batteryPerc.innerHTML = '100%';
                        HTML.progressBar.style.width = '100%';
                        clearTimeout(timeoutIDT);
                        return false;
                    }

                } else {
                    // electricity turned off
                    clearTimeout(timeoutIDT);
                    return false;
                }

            }, Values.speed);

            break;


        case "false":
            svg.classList.add("battery-mode");
            Values.speed = 40;
            Values.currentDegs = getcurrentDegs(HTML);

            var timeoutIDF = setInterval(function() {
                setBatteryColor(HTML, Values);

                // before new iteration, check the electricity status
                // no electricity
                if (!HTML.btnPower.checked) {
                    // check products
                    if (HTML.prodList.children.length) {

                        // check if mode was selected
                        HTML.selectMode.onchange = function() {
                                selectMode(HTML);
                                Values.currentDegs = getcurrentDegs(HTML);
                                calcStep(HTML, Values);
                                setColor(HTML, Values);
                            }
                            // if (checkInput(elem)) {
                            //     Values.currentDegs = getcurrentDegs(HTML);
                            //     Values.stepRevert = calcStep(HTML, Values);
                            //     setColor(HTML, Values);
                            // }

                        if (Values.currentWidth - Values.stepRevert > 0) {
                            Values.currentWidth -= Values.stepRevert;
                            HTML.batteryPerc.innerHTML = parseInt(Values.currentWidth) + '%';
                            HTML.progressBar.style.width = Values.currentWidth + '%';
                        } else {
                            Values.currentWidth = 0;
                            HTML.batteryPerc.innerHTML = '0%';
                            HTML.progressBar.style.width = '0%';
                            Values.status = "off";
                            Enable(HTML, Values, Messages);

                            clearTimeout(timeoutIDF);
                            return false;
                        }
                    }
                    // no products
                    else {
                        // is electricity
                        if (HTML.btnPower.checked) {
                            clearTimeout(timeoutIDF);
                            return false;
                        }
                        Values.status = "off";
                        Enable(HTML, Values, Messages);
                        clearTimeout(timeoutIDF);
                        return false;
                    }

                } else {
                    // electricity turned on
                    clearTimeout(timeoutIDF);
                    return false;
                }

            }, Values.speed);

            break;

    }
}

function getcurrentDegs(HTML) {

    var object = {
        degFreeze: HTML.degFreeze.value,
        degGeneral: HTML.degGeneral.value
    }
    return object;
}

function checkInput(elem) {

    if (parseInt(elem.value) >= parseInt(elem.min) && parseInt(elem.value) <= parseInt(elem.max)) {
        return true;
    } else {
        return false;
    }
}

function calcStep(HTML, Values) {
    var coefficient = 0;

    for (var i = 0; i < HTML.degs.length; i++) {

        if (HTML.degs[i].value > 0) {
            coefficient += Math.pow(HTML.degs[i].value, -1);
        } else {
            coefficient += Math.abs(HTML.degs[i].value);
        }
    }
    Values.stepRevert = coefficient / 1000;
}

function showModal(HTML, Values, Messages) {

    HTML.modal.style.display = "block";

    HTML.close.onclick = function() {
        HTML.modal.style.display = "none";
    }
    window.onclick = function(e) {
        if (e.target == HTML.modal) {
            HTML.modal.style.display = "none";
        }

    }
}

function selectMode(HTML) {

    switch (HTML.selectMode.options[HTML.selectMode.selectedIndex].value) {
        case "standard":
            HTML.degFreeze.value = "-18";
            HTML.degGeneral.value = "5";
            for (var i = 0; i < HTML.degs.length; i++) {
                HTML.degs[i].disabled = true;
            }
            break;
        case "light":
            HTML.degFreeze.value = "-14";
            HTML.degGeneral.value = "9";
            for (var i = 0; i < HTML.degs.length; i++) {
                HTML.degs[i].disabled = true;
            }
            break;
        case "highFreeze":
            HTML.degFreeze.value = "-27";
            HTML.degGeneral.value = "3";
            for (var i = 0; i < HTML.degs.length; i++) {
                HTML.degs[i].disabled = true;
            }
            break;
        case "custom":
            for (var i = 0; i < HTML.degs.length; i++) {
                HTML.degs[i].disabled = false;
            }
            break;
    }
}

function setColor(HTML, Values) {
    Values.currentDegs = getcurrentDegs(HTML);
    calcStep(HTML, Values);
    var svgColor = document.getElementById("svgColor");
    if (Values.stepRevert * 1000 < 15) {
        svgColor.className = "light";
    } else if (Values.stepRevert * 1000 >= 27) {
        svgColor.className = "highFreeze";
    } else {
        svgColor.className = "standard";
    }
}

function addProduct(HTML) {
    var error = document.getElementById("productError");
    HTML.errFrost.style.opacity = "0";

    if (HTML.newProd.value) {
        error.style.opacity = 0;

        var label = document.createElement("label");
        var elem = document.createElement("input");

        label.className = "product";
        elem.type = "checkbox";

        label.innerHTML = HTML.newProd.value;
        label.appendChild(elem);
        HTML.prodList.appendChild(label);
        HTML.newProd.value = "";
    } else {
        error.style.opacity = 1;
    }
}

function removeProduct(HTML) {
    var elems = document.querySelectorAll(".products input:checked");
    for (var i = 0; i < elems.length; i++) {
        var parents = elems[i].parentNode;
        parents.parentNode.removeChild(parents);

    }
}

function frostProduct(HTML, Values, Messages) {
    HTML.errFrost.style.opacity = "0";
    Values.speed = 30;
    var tmp = 0;

    // products for frost
    var elems = document.querySelectorAll(".products label:not(.product-frozen)");

    if (elems.length) {
        var prevTemperatures = getcurrentDegs(HTML);

        // set temperature to min
        HTML.degGeneral.value = HTML.degGeneral.min;
        HTML.degFreeze.value = HTML.degFreeze.min;
        calcStep(HTML, Values);
        console.log(Values.stepRevert);


        showModal(HTML, Values, Messages);

        HTML.gif.style.display = "block";
        HTML.modalMessage.innerHTML = Messages.on;

        var timeoutID = setInterval(function() {
            if (Values.currentWidth > 0) {
                if (tmp + Values.speed < Values.timeFrost) {
                    tmp += Values.speed;
                    HTML.gifPerc.innerHTML = parseInt((tmp / Values.timeFrost) * 100) + '%';
                } else {
                    // set prev temp mode
                    HTML.degGeneral.value = prevTemperatures.degGeneral;
                    HTML.degFreeze.value = prevTemperatures.degFreeze;
                    calcStep(HTML, Values);

                    HTML.gifPerc.innerHTML = "";
                    HTML.gif.style.display = "none";
                    HTML.modalMessage.innerHTML = Messages.done;
                    console.log(Values.stepRevert);


                    for (var i = 0; i < elems.length; i++) {
                        var parents = elems[i].parentNode;
                        elems[i].classList.add("product-frozen");
                    }

                    clearTimeout(timeoutID);
                }
            }
            // no battery
            else {
                HTML.gif.style.display = "none";
                HTML.gifPerc.display = "none";
                HTML.modalMessage.innerHTML = Messages.err;
                clearTimeout(timeoutID);
                return false;
            }

        }, Values.speed);
    }
    // no prod to frost
    else {
        HTML.errFrost.style.opacity = "1";
        return false;
    }
}

function setBatteryColor(HTML, Values) {
    if (Values.currentWidth > 70) {
        HTML.progressBar.style.background = "#70FA70";

    } else if (Values.currentWidth < 35) {
        HTML.progressBar.style.background = "#F54D4D";
    } else {
        HTML.progressBar.style.background = "#FEBD48";
    }
}
