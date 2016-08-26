window.onload = function() {
    var heatingBtn = document.getElementById('heating-btn');
    var cookBtn = document.getElementById('cook-btn');
    var settingsBtn = document.getElementById('settings-btn');
    var heatingDisplay = document.getElementById('heating-display');
    var programDisplay = document.getElementById('program-display');
    var setProgramDisplay = document.getElementById('set-program-display');
    var spanDishName = document.getElementById("span-dish-name");
    var heatTimeSecElem = document.getElementById('heat-time-sec');
    var cookTimeSecElem = document.getElementById('cook-time-sec');
    var pauseBtn = document.getElementById('pause');
    var playBtn = document.getElementById('play');
    var stopBtn = document.getElementById('stop');
    var doneDisplay = document.getElementById('done');
    var stopHeatBtn = document.getElementById('stop-heat');
    var cancelDisplay = document.getElementById('cancel');

    var heating = {
        time: 420
    };
    var programs = {
        soup: {
            time:2400,
            action: function(){
                commonActions("soup");
            }
        },
        rice: {
            time: 3000,
            action: function(){
                commonActions("rice");
            }
        },
        porridge: {
            time: 1200,
            action: function(){
                commonActions("porridge");
            }
        },
        steam: {
            time: 1800,
            action: function(){
                commonActions("steam");
            }
        },
        pasta: {
            time: 3,
            action: function(){
                commonActions("pasta");
            }
        },
        bake: {
            time: 7200,
            action: function(){
                commonActions("bake");
            }
        },
        fry: {
            time: 3000,
            action: function() {
                commonActions("fry");
            }
        }
    };

    cookBtn.onclick = function() {
        showElem(programDisplay);
        hideElem(heatingDisplay);
        hideElem(doneDisplay);
        hideElem(cancelDisplay);
    }

    heatingBtn.onclick = function() {
        showElem(heatingDisplay);
        hideElem(programDisplay);
        hideElem(doneDisplay);
        hideElem(cancelDisplay);
        disableMainBtns();
        var t = heating.time;
        heatTimeSecElem.innerHTML = showAsTime(t);
        var timerData = {
            timerId: null,
            time: t,
            timeElem: heatTimeSecElem,
            processBlock: programDisplay
        }
        goTimer (timerData);

        stopHeatBtn.onclick = function() {
            console.log("jkhkjhj");
            hideElem(heatingDisplay);
            showElem(cancelDisplay);
            clearInterval(timerData.timerId);
            enableMainBtns ();
        }
    }

    for(var programName in programs) {
        document.getElementById(programName).onclick = programs[programName].action;
    }

    function commonActions (programName) {
        hideElem(programDisplay);
        showElem(setProgramDisplay);
        disableMainBtns();
        spanDishName.innerText = programName + ' ';
        printTime(programName);
    }

    function printTime(programName) {
        var t = programs[programName].time;
        cookTimeSecElem.innerHTML = showAsTime(t);
        var timerData = {
            timerId: null,
            time: t,
            timeElem: cookTimeSecElem,
            processBlock: setProgramDisplay
        };
        goTimer (timerData);

        pauseBtn.onclick = function() {
            clearInterval(timerData.timerId);
            hideElem(pauseBtn);
            showElem(playBtn);
        }

        playBtn.onclick = function() {
            goTimer (timerData);
            hideElem(playBtn);
            showElem(pauseBtn);
        }

        stopBtn.onclick = function() {
            showElem(pauseBtn);
            hideElem(playBtn);
            hideElem(setProgramDisplay);
            showElem(cancelDisplay);
            clearInterval(timerData.timerId);
            enableMainBtns ();
        }
    }
    function disableMainBtns () {
        heatingBtn.setAttribute("disabled","disabled");
        cookBtn.setAttribute("disabled","disabled");
        settingsBtn.setAttribute("disabled","disabled");
    }

    function enableMainBtns () {
        heatingBtn.removeAttribute("disabled","disabled");
        cookBtn.removeAttribute("disabled","disabled");
        settingsBtn.removeAttribute("disabled","disabled");
    }

    function goTimer (timerData) {
        timerData.timerId = setInterval(function() {
            if (timerData.time <= 1) {
                enableMainBtns ();
                clearInterval(timerData.timerId);
                hideElem(timerData.processBlock);
                showElem(doneDisplay);
            }
            timerData.time--;
            timerData.timeElem.innerHTML = showAsTime(timerData.time);
        }, 1000);
    }
}

function showElem(element) {
    element.style.display = "inline-block";
};
function hideElem(element) {
    element.style.display = "none";
};



function showAsTime (seconds) {
    var hours = Math.floor(seconds/3600);
    if (hours<10) hours = "0" + hours;

    var minutes = Math.floor((seconds - hours*3600)/60);
    if (minutes<10) minutes = "0" + minutes;

    var seconds = seconds - hours*3600-minutes*60;
    if (seconds<10) seconds = "0" + seconds;

    return hours + ":"  + minutes + ":" +  seconds;
}
