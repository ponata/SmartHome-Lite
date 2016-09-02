
objectWashingOptions.prototype.updateActiveteObjectFormsView = function () {
    
    washMachineModel.statusOnOf = this.node.checked;
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


objectWashingOptions.prototype.updateStatusView = function () {
	
	var svgControl = this.svg.getElementsByClassName('status');
	
	if(washMachineModel.statusWashing === 'pause'){	
		svgControl[0].classList.add('pause');
		
	}else{
			svgControl[0].classList.remove('pause');
	}

}


objectWashingOptions.updateAnimateView = function () {

    var svg = document.getElementById("washingMachine").contentDocument;
    var svgControlAnimate = svg.getElementsByClassName('animate');
    var svgControlStatic = svg.getElementsByClassName('static');

    if (washMachineModel.animate) {
        svgControlAnimate[0].classList.add('hide');
        svgControlStatic[0].classList.remove('hide');
    } else {
        washMachineModel.animate = true;
        svgControlAnimate[0].classList.remove('hide');
        svgControlStatic[0].classList.add("hide");
    }

}



objectWashingOptions.prototype.popupMasterView = function () {
    

        var popupWrapper = document.createElement('div');
        popupWrapper.classList.add('popupPageFill');
        var actionsElements = '<div class="actions-wrapper"> <input class="button" type="button" name="disagree" value="No"  /><input class="button green" type="button" name="agree" value="Yes"  /></div>'
        popupWrapper.innerHTML = '<div class="popupBorder"><div class="popupContainer"><h2 class="popupHeader"></h2><div class="popupContent">Do you want start washing without washing powder?' + actionsElements + '</div></div><div class="popupExit">X</div></div>';
        document.body.appendChild(popupWrapper);
  
}


objectWashingOptions.prototype.popupHide = function () {    

   document.body.querySelector('.popupPageFill').classList.add('hide');
}


/*default view */

objectWashingOptions.prototype.defaultView = function () {

    var svgActiveControls = this.svg.querySelectorAll('path')
    var svgActiveControlsLength = svgActiveControls.length;

    if (washMachineModel.animate) {
        objectWashingOptions.updateAnimateView();
    }

    for (var i = 0; i < svgActiveControlsLength; i++) {
       if (!washMachineModel.statusOnOf) {
           svgActiveControls[i].classList.remove("active");
       }
    }

   

}

