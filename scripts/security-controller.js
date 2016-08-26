var controller = {
	model: null,
	view: null,
	//garage block
	garageHandler: function() {
		this.view.garage.getGarageBtn().addEventListener ('click',
		function(event) {
			if (controller.model.garage.isClosed == true) {
				controller.model.garage.isClosed = false;
				controller.view.garage.openGates();
				controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Opening...');
				controller.view.garage.addDisabled(controller.view.garage.getGarageBtn());
				setTimeout(function() {
					controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Lock');
					controller.view.garage.removeDisabled(controller.view.garage.getGarageBtn());
				}, 10000);
			} else {
				controller.model.garage.isClosed = true; 
				controller.view.garage.closeGates();
				controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Closing...');
				controller.view.garage.addDisabled(controller.view.garage.getGarageBtn());
				setTimeout(function() {
					controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Unlock');
					controller.view.garage.removeDisabled(controller.view.garage.getGarageBtn());
				}, 10000);
			}
		}, false);
	},
	cameraHandler: function() {
		this.view.camera.getFullScreenBtn().onclick = this.view.camera.enterFullScreen.bind(controller.view.camera);
		//check bind for all event functions
	},
	cameraHandlerBtn: function() {
		this.view.camera.getVideoBtn().onclick = this.view.camera.turnOnOffCamera.bind(controller.view.camera);
		/*this.view.cameraView.getVideoBtn().addEventListener('click',	
		this.view.cameraView.turnOnOffCamera, false);*/
	},
	generateUniqueNumbers: function() {
		this.view.password.generateUniqueNumbers();
	},
	inputPassHandler: function() {
		this.view.password.getTable().addEventListener('click',
			function(event) {
				self = controller;
				if (event.target.getAttribute('data-td') === 'true'){
				self.view.password.setCurrentPassValue();
				self.view.password.putPassword();
			}
			}, false);
	},
	resetHandler: function() {
		this.view.password.resetBtn().onclick = this.view.password.resetFunc;
	},
	setPassword: function() {
		if (this.model.password.currentPassword === '' || this.model.password.currentPassword !== '') {
			this.model.password.currentPassword = this.view.password.getCurrentInputValue();
			this.view.password.resetFunc();
			this.view.password.changeBtnValue(this.view.password.getSetPasswordBtn, 'Edit password');
		} 
		else {
			alert('Password is already set!');
		}
	},
	setPasswordHandler: function () {
		this.view.password.getSetPasswordBtn().onclick = this.setPassword.bind(this); 
	},
	lockHandler: function() {
		this.view.password.getLockBtn().addEventListener('click',
			function(event) {
				var self = controller;
				if(self.view.password.getCurrentInputValue() === self.model.password.currentPassword 
				&& self.view.password.getLockBtn().getAttribute('value') === 'Lock') {
				self.view.password.resetFunc();
				self.view.password.changeBtnValue(self.view.password.getLockBtn,'Unlock');
				self.view.password.addDisabled(controller.view.garage.getGarageBtn());
				self.view.password.addDisabled(controller.view.password.getSetPasswordBtn());
				self.view.password.toggleVisibility(controller.view.password.getUnlockedIcon(),controller.view.password.getLockedIcon());
			} else if (self.view.password.getCurrentInputValue() === self.model.password.currentPassword  
				&& self.view.password.getLockBtn().getAttribute('value') === 'Unlock') {
				self.view.password.resetFunc();
				self.view.password.changeBtnValue(self.view.password.getLockBtn, 'Lock');
				self.view.password.removeDisabled(controller.view.garage.getGarageBtn());
				self.view.password.removeDisabled(controller.view.password.getSetPasswordBtn());
				self.view.password.toggleVisibility(controller.view.password.getLockedIcon(),controller.view.password.getUnlockedIcon());
			}
				else {
				alert('Wrong password!');
			}
			}, false);
	}
}