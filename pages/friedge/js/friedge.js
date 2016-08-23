document.addEventListener("DOMContentLoaded", function() {


    var inputFreezeTemp = document.getElementById("inputFreezeTemp");
    var outputFreezeTemp = document.getElementById("outputFreezeTemp");
    var outputOverallTemp = document.getElementById("outputOverallTemp");
    var inputOverallTemp = document.getElementById("inputOverallTemp");

    updateTemp(inputFreezeTemp, outputFreezeTemp);
    updateTemp(inputOverallTemp, outputOverallTemp);

    inputFreezeTemp.onchange = function() {
        updateTemp(inputFreezeTemp, outputFreezeTemp);
    };
    inputOverallTemp.onchange = function() {
        updateTemp(inputOverallTemp, outputOverallTemp);
    };

    var valueX = 1000;
    var valueCurrent = 0;
    var currentWidth = 0;
    var step = 0;
    var per = 0;
    var progressBar = document.getElementById("progressBar");
    var currentTemps = getCurrentTemps();
    var outputPercentage = document.getElementById("outputPercentage");
    progressBar.classList.remove("defrost");


    var timeoutID = setInterval(function() {
        currentTemps = getCurrentTemps();
        step = (-currentTemps.outputFreezeTemp) + (-currentTemps.outputOverallTemp);
        per = (step / valueX) * 100;
        if (valueCurrent + step < valueX) {
            currentWidth += per;
            valueCurrent += step;
            console.log(valueCurrent);

        } else {
            currentWidth = 100;
            deFrost();
            clearTimeout(timeoutID);

        }
        outputPercentage.innerHTML = parseInt(currentWidth) + '%';
        progressBar.style.width = parseInt(currentWidth) + '%';

    }, 500);


});


function updateTemp(input, output) {
    output.innerHTML = input.value;
}

function getCurrentTemps() {
    var array = {
        outputFreezeTemp: parseInt(outputFreezeTemp.innerHTML),
        outputOverallTemp: parseInt(outputOverallTemp.innerHTML)
    }
    return array;
}

function deFrost() {
    var timeoutID = setInterval(function() {
        var valueX = 1000;
        var valueCurrent = 0;
        var currentWidth = 0;
        var step = 0;
        var per = 0;
        var progressBar = document.getElementById("progressBar");
        var outputPercentage = document.getElementById("outputPercentage");
        var currentTemps = getCurrentTemps();
        var valueX = 1000;
        var step = (-currentTemps.outputFreezeTemp) + (-currentTemps.outputOverallTemp);
        per = (step / valueX) * 100;
        if (valueCurrent - step > 0) {
            currentWidth -= per;
            valueCurrent -= step;
            console.log(valueCurrent);

        } else {
            currentWidth = 0;
            clearTimeout(timeoutID);
        }
        outputPercentage.innerHTML = parseInt(currentWidth) + '%';
        progressBar.style.width = parseInt(currentWidth) + '%';

    }, 100);
}
