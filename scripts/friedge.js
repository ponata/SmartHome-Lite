document.addEventListener("DOMContentLoaded", function() {

    var html = {
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

    var values = {
        currentWidth: 0,
        stepForward: .3,
        stepRevert: 0,
        speed: 50,
        currentDegs: {},
        flag: true,
        status: "off",
        timeFrost: 5000
    }

    var messages = {
            on: "Freeze in progress...",
            done: "Frozen!",
            err: "No battery energy..."
        }
        // click power btn
    html.btnPower.onclick = function() {
        // is electricity
        if (html.btnPower.checked) {
            values.flag = true;
            Battery(html, values, messages);
        }
        // no electricity
        else {
            values.flag = false;
            Battery(html, values, messages);
        }
    }

    // add product
    html.btnAddProduct.onclick = function(e) {
            e.preventDefault();
            addProduct(html);
            if (values.currentWidth > 0 && document.querySelector(".svg-elem.off") && html.prodList.children.length) {
                values.status = "on";
                Enable(html, values, messages);
                setColor(html, values);
                if (!html.btnPower.checked) {
                    // no electricity
                    values.flag = false;
                    Battery(html, values, messages);
                }
            }
        }
        // remove product
    html.btnRemoveProduct.onclick = function(e) {
            e.preventDefault();
            removeProduct(html);
            if (!html.prodList.children.length) {
                values.status = "off";
                Enable(html, values, messages);
            }
        }
        // check input, if it was changed
    document.getElementById('inputWrapper').addEventListener('input', function(e) {
        var elem = e.target;

        if (checkInput(elem)) {
            values.currentDegs = getcurrentDegs(html);
            calcStep(html, values);
            setColor(html, values);
        }
    });

    // check if mode was selected
    html.selectMode.onchange = function() {
        selectMode(html);
        values.currentDegs = getcurrentDegs(html);
        setColor(html, values);
    }

    // extreme frost
    html.btnFrost.onclick = function(e) {
        e.preventDefault();
        frostProduct(html, values, messages);
    }

});

function Enable(html, values, messages) {

    switch (values.status) {
        case "on":
            html.svg.classList.add("on");
            html.svg.classList.remove("off");
            break;

        case "off":
            html.svg.classList.add("off");
            html.svg.classList.remove("on");
            break;
    }
}

function Battery(html, values, messages) {
    // var currentDegs;

    switch (values.flag) {

        case true:

            values.speed = 70;
            var timeoutIDT = setInterval(function() {
                setBatteryColor(html, values);
                // before new iteration, check electricity status
                if (html.btnPower.checked) {
                    svg.classList.remove("battery-mode");
                    // friedge was off and we have products
                    if (document.querySelector(".svg-elem.off") && html.prodList.children.length) {
                        values.status = "on";
                        Enable(html, values, messages);
                        setColor(html, values);
                    } else {

                    }
                    if (values.currentWidth + values.stepForward < 100) {
                        values.currentWidth += values.stepForward;
                        html.batteryPerc.innerHTML = parseInt(values.currentWidth) + '%';
                        html.progressBar.style.width = values.currentWidth + '%';
                    } else {
                        values.currentWidth = 100;
                        html.batteryPerc.innerHTML = '100%';
                        html.progressBar.style.width = '100%';
                        clearTimeout(timeoutIDT);
                        return false;
                    }

                } else {
                    // electricity turned off
                    clearTimeout(timeoutIDT);
                    return false;
                }

            }, values.speed);

            break;

        case false:
            svg.classList.add("battery-mode");
            values.speed = 40;
            values.currentDegs = getcurrentDegs(html);

            var timeoutIDF = setInterval(function() {
                setBatteryColor(html, values);

                // before new iteration, check the electricity status
                // no electricity
                if (!html.btnPower.checked) {
                    // check products
                    if (html.prodList.children.length) {

                        // check if mode was selected
                        html.selectMode.onchange = function() {
                            selectMode(html);
                            values.currentDegs = getcurrentDegs(html);
                            calcStep(html, values);
                            setColor(html, values);
                        }

                        if (values.currentWidth - values.stepRevert > 0) {
                            values.currentWidth -= values.stepRevert;
                            html.batteryPerc.innerHTML = parseInt(values.currentWidth) + '%';
                            html.progressBar.style.width = values.currentWidth + '%';
                        } else {
                            values.currentWidth = 0;
                            html.batteryPerc.innerHTML = '0%';
                            html.progressBar.style.width = '0%';
                            values.status = "off";
                            Enable(html, values, messages);

                            clearTimeout(timeoutIDF);
                            return false;
                        }
                    }
                    // no products
                    else {
                        // is electricity
                        if (html.btnPower.checked) {
                            clearTimeout(timeoutIDF);
                            return false;
                        }
                        values.status = "off";
                        Enable(html, values, messages);
                        clearTimeout(timeoutIDF);
                        return false;
                    }

                } else {
                    // electricity turned on
                    clearTimeout(timeoutIDF);
                    return false;
                }
            }, values.speed);
            break;
    }
}

function getcurrentDegs(html) {

    var object = {
        degFreeze: html.degFreeze.value,
        degGeneral: html.degGeneral.value
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

function calcStep(html, values) {
    var coefficient = 0;

    for (var i = 0; i < html.degs.length; i++) {

        if (html.degs[i].value > 0) {
            coefficient += Math.pow(html.degs[i].value, -1);
        } else {
            coefficient += Math.abs(html.degs[i].value);
        }
    }
    values.stepRevert = coefficient / 1000;
}

function showModal(html, values, messages) {

    html.modal.style.display = "block";

    html.close.onclick = function() {
        html.modal.style.display = "none";
    }
    window.onclick = function(e) {
        if (e.target == html.modal) {
            html.modal.style.display = "none";
        }
    }
}

function selectMode(html) {

    switch (html.selectMode.options[html.selectMode.selectedIndex].value) {
        case "standard":
            html.degFreeze.value = "-18";
            html.degGeneral.value = "5";
            for (var i = 0; i < html.degs.length; i++) {
                html.degs[i].disabled = true;
            }
            break;
        case "light":
            html.degFreeze.value = "-14";
            html.degGeneral.value = "9";
            for (var i = 0; i < html.degs.length; i++) {
                html.degs[i].disabled = true;
            }
            break;
        case "highFreeze":
            html.degFreeze.value = "-27";
            html.degGeneral.value = "3";
            for (var i = 0; i < html.degs.length; i++) {
                html.degs[i].disabled = true;
            }
            break;
        case "custom":
            for (var i = 0; i < html.degs.length; i++) {
                html.degs[i].disabled = false;
            }
            break;
    }
}

function setColor(html, values) {
    values.currentDegs = getcurrentDegs(html);
    calcStep(html, values);
    var svgColor = document.getElementById("svgColor");
    if (values.stepRevert * 1000 < 15) {
        svgColor.className = "light";
    } else if (values.stepRevert * 1000 >= 27) {
        svgColor.className = "highFreeze";
    } else {
        svgColor.className = "standard";
    }
}

function addProduct(html) {
    var error = document.getElementById("productError");
    html.errFrost.style.opacity = "0";

    if (html.newProd.value) {
        error.style.opacity = 0;

        var label = document.createElement("label");
        var elem = document.createElement("input");

        label.className = "product";
        elem.type = "checkbox";

        label.innerHTML = html.newProd.value;
        label.appendChild(elem);
        html.prodList.appendChild(label);
        html.newProd.value = "";
    } else {
        error.style.opacity = 1;
    }
}

function removeProduct(html) {
    var elems = document.querySelectorAll(".products input:checked");
    for (var i = 0; i < elems.length; i++) {
        var parents = elems[i].parentNode;
        parents.parentNode.removeChild(parents);
    }
}

function frostProduct(html, values, messages) {
    html.errFrost.style.opacity = "0";
    values.speed = 30;
    var tmp = 0;

    // products for frost
    var elems = document.querySelectorAll(".products label:not(.product-frozen)");

    if (elems.length) {
        var prevTemperatures = getcurrentDegs(html);

        // set temperature to min
        html.degGeneral.value = html.degGeneral.min;
        html.degFreeze.value = html.degFreeze.min;
        calcStep(html, values);

        showModal(html, values, messages);

        html.gif.style.display = "block";
        html.modalMessage.innerHTML = messages.on;

        var timeoutID = setInterval(function() {
            if (values.currentWidth > 0) {
                if (tmp + values.speed < values.timeFrost) {
                    tmp += values.speed;
                    html.gifPerc.innerHTML = parseInt((tmp / values.timeFrost) * 100) + '%';
                } else {
                    // set prev temp mode
                    html.degGeneral.value = prevTemperatures.degGeneral;
                    html.degFreeze.value = prevTemperatures.degFreeze;
                    calcStep(html, values);

                    html.gifPerc.innerHTML = "";
                    html.gif.style.display = "none";
                    html.modalMessage.innerHTML = messages.done;

                    for (var i = 0; i < elems.length; i++) {
                        var parents = elems[i].parentNode;
                        elems[i].classList.add("product-frozen");
                    }
                    clearTimeout(timeoutID);
                }
            }
            // no battery
            else {
                html.gif.style.display = "none";
                html.gifPerc.display = "none";
                html.modalMessage.innerHTML = messages.err;
                clearTimeout(timeoutID);
                return false;
            }

        }, values.speed);
    }
    // no prod to frost
    else {
        html.errFrost.style.opacity = "1";
        return false;
    }
}

function setBatteryColor(html, values) {
    if (values.currentWidth > 70) {
        html.progressBar.style.background = "#70FA70";

    } else if (values.currentWidth < 35) {
        html.progressBar.style.background = "#F54D4D";
    } else {
        html.progressBar.style.background = "#FEBD48";
    }
}
