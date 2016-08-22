
window.onload = function () {
    document.documentElement.addEventListener('click', function (event) {
        if (event.target.nodeName === 'INPUT') {
            //event.preventDefault(); Отмена действия браузера по умолчанию              
            var control = event.target;
            var master = new Forms(control);
        }
    }, true);
};




function Forms(node) {
    this.node = node;
    this.svg = document.getElementById("washingMachine").contentDocument;
    this.initValueObject = {
        switchNode : false,
        program: []
    };
    this.washingOptions = {
        sport: {
            time: 0040
	        , temperature: 40
        }
	    , cotton: {
	        time: 0255
	        , temperature: 90
	    }
	    , jeans: {
	        time: 0040
	        , temperature: 40
	    }
    };
    this.init();
}

Forms.prototype.initValue = function (node) {
    if (node.name === 'switch') {
        this.initValueObject.switchNode = node.checked ;
    }
    else if (node.name === 'program') {
        this.initValueObject.program[node.id] = node.checked;
    }

}


Forms.prototype.init = function () {

    if (this.node.name === 'status') {
        //this.node.addEventListener('click', this.activeteFroms.bind(this));
        this.activeteFroms();

    } else if (this.node.name === 'switch') {
        this.updateSwitchView();
    }
    else if (this.node.name === 'program') {
        this.SelectProgram();
    }
}

Forms.prototype.SelectProgram = function(){
    var programsList = document.querySelectorAll('input[name = program]');
    for (var i = 0; i < programsList.length; i++) {
        if (programsList[i].id === this.node.id) {
            this.updateSelectProgramView(i);
        }
    }
}


Forms.prototype.activeteFroms = function () {
    var elements = document.querySelectorAll('input:not([name="status"])');
    for (var i = 0; i < elements.length; i++) {
        this.initValue(elements[i]);
        if (this.node.checked) {
            elements[i].disabled = false;

        }
        else {
            elements[i].disabled = true;
        }
    }
    this.updateActiveteFromsView();
}


Forms.prototype.updateSwitchView = function () {
    var svgClassName = this.node.name;
    var svgControl = this.svg.getElementsByClassName(svgClassName);
    if (this.node.checked) {
        svgControl[0].classList.add('active');
    } else {
        svgControl[0].classList.remove("active");
    }
}


Forms.prototype.updateActiveteFromsView = function () {
    var svgClassName = this.node.name;
    var svgControl = this.svg.getElementsByClassName(svgClassName);
    for (var i = 0; i < svgControl.length; i++) {
        if (this.node.checked) {
            svgControl[i].classList.add('active');
            this.SelectProgram();

        } else {
            svgControl[i].classList.remove("active");
            if (this.node.checked === false) {
                this.defaultView();
            }
            // remove active at all
        }

    }


}




Forms.prototype.updateSelectProgramView = function (j) {
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


Forms.prototype.defaultView = function () {
    var svgActiveControls = this.svg.querySelectorAll('path');
    var svgActiveControlsLength = svgActiveControls.length;
    for (var i = 0; i < svgActiveControlsLength; i++) {
        svgActiveControls[i].classList.remove("active");
    }
}

