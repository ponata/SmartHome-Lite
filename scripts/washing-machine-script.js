
window.onload = function () {
    document.forms.washingOptions.addEventListener('click', function (event) {
        if (event.target.nodeName === 'INPUT') {
            //event.preventDefault(); Отмена действия браузера по умолчанию              
            var control = event.target;
            var master = new objectWashingOptions(control);
        }
    }, true);
};

var washMachineModel = {
    status: false,
    statusWashing: 'choose',
    animate:'off',
    washingOptions: {
        Sport: {
            time: '00:01',
            temperature: '40'
        },
        Cotton: {
            time: '02:55',
            temperature: '90'
        },
        Jeans: {
            time: '02:01',
            temperature: '40'
        }
    }
}


function objectWashingOptions(node) {
    this.node = node;
    this.svg = document.getElementById("washingMachine").contentDocument;
    this.arrayHoursMinutes;
    this.period;
    this.initValueObject = {
        switchNode: false,
        program: []
    };
    this.init();
}


objectWashingOptions.prototype.init = function () {

    if (this.node.name === 'status') {
        this.activeteObjectForms();

    } else if (this.node.name === 'switch') {
        this.updateSwitchView();
    }
    else if (this.node.name === 'program') {
        this.SelectProgram();
    }
    else if (this.node.name === 'submit') {
        this.submitForm();

    } else if (this.node.name === 'startNew') {
        this.restoreObjectForms();
    }

}


objectWashingOptions.prototype.initValue = function (node) {

    if (node.name === 'switch') {
        this.initValueObject.switchNode = node.checked;
    }
    else if (node.name === 'program') {
        this.initValueObject.program.push(node.checked);
    }

}


objectWashingOptions.prototype.activeteObjectForms = function () {
    var elements = document.querySelectorAll('input:not([name="status"])');

    washMachineModel.status = document.forms.washingOptions.status.checked;

    for (var i = 0; i < elements.length; i++) {
        this.initValue(elements[i]);
        if (this.node.checked) {
            elements[i].disabled = false;

        }
        else {
            elements[i].disabled = true;
        }
    }

    this.updateActiveteObjectFormsView();
}

objectWashingOptions.prototype.SelectProgram = function () {

    var programsList = document.querySelectorAll('input[name = program]');

    for (var i = 0; i < programsList.length; i++) {

        if (programsList[i].id === this.node.id) {
            this.updateSelectProgramView(i);
        }
    }
}



objectWashingOptions.prototype.submitForm = function () {
    event.preventDefault();

    var outputTimer = document.getElementById('panel');
    var outputActions = document.getElementById('panel-in-process');
    var outputActionsHeader = document.querySelector('#panel-in-process > h3');
    var programName = document.querySelector('input[name="program"]:checked').id;
    var arrayHoursMinutes = washMachineModel.washingOptions[programName].time.split(':');
    var outputTimer = document.getElementById('panel');
    var timerSeconds = document.getElementById('seconds');
    var timerHours = document.getElementById('hours');
    var timerMinutes = document.getElementById('minutes');


    outputTimer.classList.add('hide');
    outputActions.classList.remove('hide');
    outputActionsHeader.innerHTML = 'Program ' + programName + ' is running';
    timerSeconds.innerHTML = '04';
    timerHours.innerHTML = arrayHoursMinutes[0];
    timerMinutes.innerHTML = arrayHoursMinutes[1];

    setTimeout(window.timerGlobal, 1000);
    objectWashingOptions.updateAnimateView()
}


objectWashingOptions.prototype.restoreObjectForms = function () {

    var message = document.querySelector('p.message');

    document.getElementById('panel-in-process').classList.add('hide');
    document.getElementById('panel').classList.remove('hide');
    document.querySelector('input[name="startNew"]').classList.add('hide');
    document.querySelector('input[name="pause"]').classList.remove('hide');
    node.parent.removeChild(message);

    this.defaultView();
}


objectWashingOptions.statusOnChange = function () {
    if (washMachineModel.statusWashing === 'finished') {
        document.querySelector('input[name="pause"]').classList.add('hide');
        document.querySelector('input[name="startNew"]').classList.remove('hide');
       this.updateAnimateView();

    }

}


/*update views methods*/

objectWashingOptions.prototype.updateActiveteObjectFormsView = function () {
    var svgClassName = this.node.name;
    var svgControl = this.svg.getElementsByClassName(svgClassName);
    var svgControlSwitch = this.svg.getElementsByClassName('switch');
    var svgControlProgram = this.svg.getElementsByClassName('program');
    for (var i = 0; i < svgControl.length; i++) {
        if (this.node.checked) {
            svgControl[i].classList.add('active');
            if (this.initValueObject.switchNode) {
                svgControlSwitch[0].classList.add('active');
            }
            for (var j = 0; j < this.initValueObject.program.length; j++) {
                if (this.initValueObject.program[j] == true) {
                    svgControlProgram[j].classList.add('active');
                }
            }

        } else {
            svgControl[i].classList.remove("active");
            if (this.node.checked === false) {
                this.defaultView();
            }
        }

    }

}



objectWashingOptions.prototype.updateSwitchView = function () {
    var svgClassName = this.node.name;
    var svgControl = this.svg.getElementsByClassName(svgClassName);

    if (this.node.checked) {
        svgControl[0].classList.add('active');
    } else {
        svgControl[0].classList.remove("active");
    }
}


objectWashingOptions.prototype.updateSelectProgramView = function (j) {
    var className = this.node.name;
    var svgControl = this.svg.getElementsByClassName(className);
    for (var i = 0; i < svgControl.length; i++) {
        if (svgControl[i].classList.length > 1 && i !== j) {
            svgControl[i].classList.remove("active");
        } else if (this.node.checked = 'true') {
            svgControl[j].classList.add('active');
        }

    }


}


objectWashingOptions.updateAnimateView = function () {

    var svg = document.getElementById("washingMachine").contentDocument;
    var svgControlAnimate = svg.getElementsByClassName('animate');
    var svgControlStatic = svg.getElementsByClassName('static');

    if (washMachineModel.animate === 'on') {
        svgControlAnimate[0].classList.add('hide');
        svgControlStatic[0].classList.remove('hide');
    } else {
        washMachineModel.animate = 'on';
        svgControlAnimate[0].classList.remove('hide');
        svgControlStatic[0].classList.add("hide");
    }

}

/*default view */

objectWashingOptions.prototype.defaultView = function () {

    var svgActiveControls = this.svg.querySelectorAll('path');
    var svgActiveControlsLength = svgActiveControls.length;

    if (washMachineModel.animate = 'on') {
        objectWashingOptions.updateAnimateView();
    }

    for (var i = 0; i < svgActiveControlsLength; i++) {
        if (!washMachineModel.status) {
            svgActiveControls[i].classList.remove("active");
        }
    }

   

}



/*global timer*/

var timerGlobal = function () {
    washMachineModel.statusWashing = 'process';
    var timeinterval = function () { setTimeout(timerGlobal, 1000) };
    var elemMinutes = document.getElementById('minutes');
    var elemHourse = document.getElementById('hours');
    var elemSeconds = document.getElementById('seconds');
    elemSeconds.innerHTML--;
    var elemSecondsSecound = ('0' + elemSeconds.innerHTML).slice(-2);
    elemSeconds.innerHTML = elemSecondsSecound;
    if (elemSeconds.innerHTML == 0) {
        if (elemMinutes.innerHTML == 0) {
            if (elemHourse.innerHTML !== '00') {
                elemMinutes.innerHTML = '59';
                elemSeconds.innerHTML = '60';
                elemHourse.innerHTML--;
                var elemHourseSecound = ('0' + elemHourse.innerHTML).slice(-2);
                elemHourse.innerHTML = elemHourseSecound;
                timeinterval();
            }
            else {
                var infoTextElement = document.createElement('div');
                infoTextElement.innerHTML = '<p class="message">Program was finished</p>';
                elemMinutes.parentNode.parentNode.appendChild(infoTextElement);
                washMachineModel.statusWashing = 'finished';
                objectWashingOptions.statusOnChange();
                clearInterval(timeinterval);
            }
        }
        else {
            elemSeconds.innerHTML = '60';
            elemMinutes.innerHTML--;
            var elemMinutesSecound = ('0' + elemMinutes.innerHTML).slice(-2);
            elemMinutes.innerHTML = elemMinutesSecound;
            timeinterval();
        }

    }
    else {
        timeinterval();
    }
    clearInterval(timerGlobal);
}

