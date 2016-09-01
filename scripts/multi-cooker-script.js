window.onload = function() {
    var heatingBtn = document.getElementById('heating-btn');
    var cookBtn = document.getElementById('cook-btn');
    var customBtn = document.getElementById('custom-btn');
    var heatingDisplay = document.getElementById('heating-display');
    var programDisplay = document.getElementById('program-display');
    var setProgramDisplay = document.getElementById('set-program-display');
    var spanDishName = document.getElementById("span-dish-name");
    var heatTimeSecElem = document.getElementById('heat-time-sec');
    var cookTimeSecElem = document.getElementById('cook-time-sec');
    var customTimeSecElem = document.getElementById('custom-time-sec');
    var pauseBtn = document.getElementById('pause');
    var playBtn = document.getElementById('play');
    var stopBtn = document.getElementById('stop');
    var doneDisplay = document.getElementById('done');
    var stopHeatBtn = document.getElementById('stop-heat');
    var cancelDisplay = document.getElementById('cancel');
    var customDisplay = document.getElementById('custom-display');
    var lessTemperatureBtn = document.getElementById('less-temperature');
    var moreTemperatureBtn = document.getElementById('more-temperature');
    var setTemperature = document.getElementById('set-temperature');
    var moreClockBtn = document.getElementById('more-clock');
    var lessClockBtn = document.getElementById('less-clock');
    var setClockBtn = document.getElementById('set-clock');
    var setClock = document.getElementById('set-clock');
    var startBtn = document.getElementById('start');
    var resetBtn = document.getElementById('reset');
    var playCustomProgramBtn = document.getElementById('play-custom-program');
    var pauseCustomProgramBtn = document.getElementById('pause-custom-program');
    var stopCustomProgramBtn = document.getElementById('stop-custom-program');
    var customDisplayProcess = document.getElementById('custom-display-process');
    var imgTimer = document.getElementById('img-timer');
    var imgTimer2 = document.getElementById('img-timer2');
    var parImg = document.getElementById('par');

    /**
        config modes objects
    */
    var heating = {
        time: 420,
        temperature: 65
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

    var custom = {
        time: 3600,
        temperature: 100
    };

    /**
        heating button click handler
    */
    heatingBtn.onclick = function() {
        showElem(heatingDisplay);
        hideElem(programDisplay);
        hideElem(doneDisplay);
        hideElem(cancelDisplay);
        hideElem(customDisplay);
        disableMainBtns();
        parImg.className = "par-img";

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
            hideElem(heatingDisplay);
            showElem(cancelDisplay);
            clearInterval(timerData.timerId);
            enableMainBtns ();
            stopPar();
        }
    }

    /**
        cook button click handler
    */
    cookBtn.onclick = function() {
        showElem(programDisplay);
        hideElem(heatingDisplay);
        hideElem(doneDisplay);
        hideElem(cancelDisplay);
        hideElem(customDisplay);
    }

    for(var programName in programs) {
        document.getElementById(programName).onclick = programs[programName].action;
    };

    function commonActions (programName) {
        hideElem(programDisplay);
        showElem(setProgramDisplay);
        disableMainBtns();
        spanDishName.innerText = programName + ' ';
        printTime(programName);
        parImg.className = "par-img";
    };

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
            imgTimer.className = "stop-animation";
            stopPar();
        }

        playBtn.onclick = function() {
            hideElem(playBtn);
            showElem(pauseBtn);
            goTimer (timerData);
            imgTimer.className = "timer";
            parImg.className = "par-img";
        }

        stopBtn.onclick = function() {
            showElem(pauseBtn);
            hideElem(playBtn);
            hideElem(setProgramDisplay);
            showElem(cancelDisplay);
            clearInterval(timerData.timerId);
            enableMainBtns ();
            imgTimer.className = "timer";
            stopPar()
        }
    }

    /**
        custom button click handler
    */
    customBtn.onclick = function () {
        showElem(customDisplay);
        hideElem(programDisplay);
        hideElem(doneDisplay);
        hideElem(cancelDisplay);
        hideElem(heatingDisplay);
        moreClockBtn.removeAttribute("disabled","disabled");
        lessClockBtn.removeAttribute("disabled","disabled");
        moreTemperatureBtn.removeAttribute("disabled","disabled");
        lessTemperatureBtn.removeAttribute("disabled","disabled");

        var timerData = {
            timerId: null,
            time: custom.time,
            timeElem: customTimeSecElem,
            processBlock: customDisplayProcess
        }

        pauseCustomProgramBtn.onclick = function() {
            clearInterval(timerData.timerId);
            hideElem(pauseCustomProgramBtn);
            showElem(playCustomProgramBtn);
            imgTimer2.className = "stop-animation";
            stopPar();
        }

        playCustomProgramBtn.onclick = function() {
            clearInterval(timerData.timerId);
            showElem(pauseCustomProgramBtn);
            hideElem(playCustomProgramBtn);
            goTimer (timerData);
            imgTimer2.className = "timer";
            parImg.className = "par-img";
        }

        stopCustomProgramBtn.onclick = function() {
            hideElem(customDisplayProcess);
            showElem(cancelDisplay);
            showElem(pauseCustomProgramBtn);
            hideElem(playCustomProgramBtn);
            clearInterval(timerData.timerId);
            enableMainBtns ();
            resetTempTime ();
            imgTimer2.className = "timer";
            stopPar();
        }

        resetBtn.onclick = function (){
            resetTempTime ();
        }

        function resetTempTime () {
            setTemperature.innerText = 100 + " °";
            setClock.innerText = "01:00";
            custom.temperature = 100;
            timerData.time = custom.time;
        }

        startBtn.onclick = function () {
            hideElem(customDisplay);
            showElem(customDisplayProcess);
            disableMainBtns();
            goTimer (timerData);
            customTimeSecElem.innerHTML = showAsTime(timerData.time);
            parImg.className = "par-img";
        }

        lessClockBtn.onclick = function() {
            moreClockBtn.removeAttribute("disabled","disabled");
            changeTime(-300);
        }

        moreClockBtn.onclick = function() {
            lessClockBtn.removeAttribute("disabled","disabled");
            startBtn.removeAttribute("disabled","disabled");
            changeTime(300);
        }

        lessTemperatureBtn.onclick = function() {
            moreTemperatureBtn.removeAttribute("disabled","disabled");
            changeTemperature(-5);
        }

        moreTemperatureBtn.onclick = function() {
            lessTemperatureBtn.removeAttribute("disabled","disabled");
            startBtn.removeAttribute("disabled","disabled");
            changeTemperature(5);
        }

        function changeTime(step) {
            timerData.time += step;
            var hours = Math.floor(timerData.time/3600);
            if (hours<10) hours = "0" + hours;

            var minutes = Math.floor((timerData.time - hours*3600)/60);
            if (minutes<10) minutes = "0" + minutes;

            var clock =  hours + ":"  + minutes;

            setClock.innerText = clock;
            if(timerData.time <= 0){
                lessClockBtn.setAttribute("disabled","disabled");
                startBtn.setAttribute("disabled","disabled");
                }
            if(timerData.time >= 36000){
                moreClockBtn.setAttribute("disabled","disabled");
                }
        }

        function changeTemperature (step) {
            setTemperature.innerText = custom.temperature + step + " °";
            custom.temperature += step;
            if(custom.temperature >= 200){
                moreTemperatureBtn.setAttribute("disabled","disabled");
            }
            else if(custom.temperature <= 45){
                lessTemperatureBtn.setAttribute("disabled","disabled");
            }
        }
    }

    /**
        common functions
    */
    function disableMainBtns () {
        heatingBtn.setAttribute("disabled","disabled");
        cookBtn.setAttribute("disabled","disabled");
        customBtn.setAttribute("disabled","disabled");
        lessTemperatureBtn.setAttribute("disabled","disabled");
        moreTemperatureBtn.setAttribute("disabled","disabled");
    }

    function enableMainBtns () {
        heatingBtn.removeAttribute("disabled","disabled");
        cookBtn.removeAttribute("disabled","disabled");
        customBtn.removeAttribute("disabled","disabled");
    }

    function goTimer (timerData) {
        timerData.timerId = setInterval(function() {
            if (timerData.time <= 1) {
                enableMainBtns ();
                clearInterval(timerData.timerId);
                hideElem(timerData.processBlock);
                hideElem(setProgramDisplay);
                hideElem(customDisplayProcess);
                hideElem(heatingDisplay);
                showElem(doneDisplay);
                stopPar();
            }
            timerData.time--;
            timerData.timeElem.innerHTML = showAsTime(timerData.time);
        }, 1000);
    }


    function showElem(element) {
        element.style.display = "inline-block";
    };

    function hideElem(element) {
        element.style.display = "none";
    };

    function stopPar() {
        parImg.className = "";
    }

    function showAsTime (seconds) {
        var hours = Math.floor(seconds/3600);
        if (hours<10) hours = "0" + hours;

        var minutes = Math.floor((seconds - hours*3600)/60);
        if (minutes<10) minutes = "0" + minutes;

        var seconds = seconds - hours*3600-minutes*60;
        if (seconds<10) seconds = "0" + seconds;

        return hours + ":"  + minutes + ":" +  seconds;
    }
}
