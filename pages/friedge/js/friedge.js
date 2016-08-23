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


    setInterval(function() {
        if (valueCurrent <= valueX) {
        	currentTemps = getCurrentTemps();
            step = (-currentTemps.outputFreezeTemp) + (-currentTemps.outputOverallTemp);
            per = step / valueX;

            currentWidth += per * 100;
            valueCurrent += step;
            progressBar.style.width = currentWidth + '%';
            console.log(valueCurrent);
        }
        else {

        }


    }, 2000);

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
