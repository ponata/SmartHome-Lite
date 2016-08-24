window.onload = function() {
    var cookBtn = document.getElementById('cook-btn');
    var settingsBtn = document.getElementById('settings');
    var programDisplay = document.getElementById('program-display');
    var setProgramDisplay = document.getElementById('set-program-display');
    var spanDishName = document.getElementById("spanDishName");
    var timeSecElem = document.getElementById('timeSec');

    var programs = {};

    programs.soup = function soup(){
        commonActions(arguments.callee.name);
    };

    programs.rice = function rice(){
        commonActions(arguments.callee.name);
    };

    programs.porridge = function porridge(){
        commonActions(arguments.callee.name);
    };

    programs.steam = function steam(){
        commonActions(arguments.callee.name);
    };

    programs.pasta = function pasta(){
        commonActions(arguments.callee.name);
    };

    programs.bake = function bake(){
        commonActions(arguments.callee.name);
    };

    programs.fry = function fry(){
        commonActions(arguments.callee.name);
    };


    for(var programName in programs) {
        document.getElementById(programName).onclick = programs[programName];
    }

    function commonActions (programName) {
        programDisplay.style.display="none";
        setProgramDisplay.style.display="inline-block";
        cookBtn.setAttribute("disabled","disabled");
        spanDishName.innerText = programName + ' ';
    }


    cookBtn.onclick = function() {
        programDisplay.style.display="inline-block";
        // programDisplay.classList.add("visible");
    }

    // settingsBtn.onclick = function() {
    //
    // };
    // function doingNow(){
    //     programDisplay.style.display="none";
    //     setProgramDisplay.style.display="inline-block";
    //     cookBtn.setAttribute("disabled","disabled");
    // }


function printTime() {
    var i = 620; //01:02:13
    var timerId = setInterval(function() {
        console.log(i);
        if (i == 1) clearInterval(timerId);
        i--;
        timeSecElem.innerHTML = showAsTime(i);
    }, 1000);
}
function showAsTime (seconds) {
    var hours = Math.floor(seconds/3600);
    if(hours<10) {
        hours = "0" + hours
    }else{}

    var minutes = Math.floor((seconds - hours*3600)/60);
    if(minutes<10) {
        minutes = "0" + minutes
    }else{}

    var seconds = seconds - hours*3600-minutes*60;
    if(seconds<10) {
        seconds = "0" + seconds
    }else{}

    return hours + ":"  + minutes + ":" +  seconds;
}
// вызов
printTime();

}
