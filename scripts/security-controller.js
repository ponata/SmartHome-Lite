var controller = {
	model: null,
	view: null,
	//tabs block
	tabsHandler: function() {
		var tabsLength = this.view.tabs.getTabLinks().length;
		for (var i = 0; i < tabsLength; i++) {
			this.view.tabs.getTabLinks()[i].addEventListener('click', function(event) {
				controller.view.tabs.getTabCont(event);
			}, false);
		}
	},
	//garage block
	garageHandler: function() {
		this.view.garage.getGarageBtn().addEventListener ('click',
		function(event) {
			event.preventDefault();
			if (controller.model.garage.isClosed == true) {
				controller.model.garage.isClosed = false;
				controller.view.garage.openGates();
				controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Opening...');
				controller.view.garage.addDisabled(controller.view.garage.getGarageBtn());
				setTimeout(function() {
					controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Close');
					controller.view.garage.removeDisabled(controller.view.garage.getGarageBtn());
				}, 7500);
			} else {
				controller.model.garage.isClosed = true;
				controller.view.garage.closeGates();
				controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Closing...');
				controller.view.garage.addDisabled(controller.view.garage.getGarageBtn());
				setTimeout (function() {
					controller.view.garage.changeBtnValue(controller.view.garage.getGarageBtn, 'Open');
					controller.view.garage.removeDisabled(controller.view.garage.getGarageBtn());
				}, 7500);
			}
		}, false);
	},
	//camera block
	cameraHandler: function() {
		this.view.camera.getFullScreenBtn().onclick = this.view.camera.enterFullScreen.bind(controller.view.camera);
	},
	addCameraHandler: function() {
		this.view.camera.getAddNewCameraBtn().onclick = this.view.camera.showCameraFormBlock;
	},
	removeCameraHandler: function() {
		this.view.camera.getRemoveCameraFormBlock().onclick = this.view.camera.hideCameraFormBlock;
	},
	fillInCameraModel: function() {
		var newCamera = new controller.NewCameraConstructor(controller.view.camera.getCameraNameValue(), controller.view.camera.getCameraPathValue());
		controller.model.camera.push(newCamera);
	},
	hideCameraHandler: function() {
		this.view.camera.getCameraSubmitBtn().addEventListener('submit', function(e) {
			e.preventDefault();
			controller.fillInCameraModel();
			controller.view.camera.hideCameraFormBlock();
			controller.view.camera.addCameraInnerHTML();
			controller.setVideoBtnIdHandler();
		}, false);
	},
	NewCameraConstructor: function NewCameraConstructor(name, url) {
		this.name = name;
		this.url = url;
		this.isOn = true;
	},
	setVideoBtnIdHandler: function() {
		this.view.camera.setVideoBtnId();
	},
	hideShowVideoTagHandler: function() {
		//Comment Added
		this.view.camera.getCameraBlock().addEventListener('click', function(e) {
			var target = e.target;
			var dataNumber = target.getAttribute('data-number');
			var dataNumberRemove = target.getAttribute('data-number-remove');
			if (target.hasAttribute('data-number')){
				var video = target.previousElementSibling.previousElementSibling.firstElementChild;
				if (controller.model.camera[dataNumber].isOn == true){
					controller.model.camera[dataNumber].isOn = false;
					video.classList.add('tab-content');
					controller.view.camera.changeCameraBtnInner(target, true);
				} else{
					controller.model.camera[dataNumber].isOn = true;
					video.classList.remove('tab-content');
					controller.view.camera.changeCameraBtnInner(target, false);
				}
			} else if (target.hasAttribute('data-number-remove')) {
				var block = target.parentElement;
				controller.model.camera.splice([dataNumberRemove],1);
				block.remove();
			} else {
				return;
			}

		}, false);
	},
	//password block
	generateUniqueNumbers: function() {
		this.view.password.generateUniqueNumbers();
	},
	//reset
	resetHandler: function() {
		this.view.password.resetBtn()[0].onclick = this.view.password.resetFunc;
		this.view.password.resetBtn()[1].onclick = this.view.password.resetFunc;
	},
	resetLastValueHandler: function() {
		this.view.password.resetLastSymbBtn()[0].onclick = this.view.password.resetLastSymbol;
		this.view.password.resetLastSymbBtn()[1].onclick = this.view.password.resetLastSymbol;
	},
	//set password
	i: null,
	inputPassHandlerFunc: function(e) {
		self = controller;
		if (event.target.getAttribute('data-td') === 'true'){
		self.view.password.setCurrentPassValue();
		self.view.password.putPassword();
		}
	},

	getPasswordStatus: function(){
		var status = this.model.password.passwordStatus;
		return status;
	},
	inputPassHandler: function() {
		if (this.model.password.passwordStatus === false) {
			this.i = 1;
		} else {
			this.i = 0;
		};

		this.view.password.getTable()[this.i].removeEventListener('click',
				this.inputPassHandlerFunc);

		this.view.password.getTable()[this.i].addEventListener('click',
			this.inputPassHandlerFunc, false);

	},

	setPassword: function() {
		if (this.model.password.currentPassword === '' || this.model.password.currentPassword !== '') {
			this.model.password.currentPassword = this.view.password.getCurrentInputValue();
			this.model.password.passwordStatus = true;
			this.view.password.resetFunc();
			this.view.password.getSetPasswordBlock().classList.add('hide');
			this.view.password.getPasswordBlock().classList.remove('tab-content');
			this.view.password.changeUnlockSvgColor();
		}
		else {
			alert('Password is already set!');
		}
	},
	setPasswordHandler: function () {
		var self = this;
		this.view.password.getSetPasswordBtn().addEventListener('click', function() {
			self.setPassword();
			self.inputPassHandler();
		}, false);
	},

	changePasswordBlockHandler: function() {
		controller.view.password.getChangePasswordBtn().addEventListener('click', function() {
			controller.view.password.showChangePasswordBlock();
			controller.model.password.passwordStatus = false;
			controller.model.password.currentPassword= '';

		}, false);
	},
	//lock/unlock process
	lockHandler: function() {
		this.view.password.getLockBtn().addEventListener('click',
			function(event) {
				var self = controller;
				if (self.model.garage.isClosed == true) {
					if(self.view.password.getCurrentInputValue() === self.model.password.currentPassword
						&& self.view.password.getLockBtn().getAttribute('value') === 'Lock') {
							self.view.password.resetFunc();
							self.view.password.changeBtnValue(self.view.password.getLockBtn,'Unlock');
							self.view.password.addDisabled(controller.view.garage.getGarageBtn());
							self.view.password.addDisabled(controller.view.password.getSetPasswordBtn());
							self.view.password.toggleVisibility(controller.view.password.getUnlockedIcon(),controller.view.password.getLockedIcon());
							self.view.password.getChangePasswordBtn().classList.add('hide');
					} else if (self.view.password.getCurrentInputValue() === self.model.password.currentPassword
						&& self.view.password.getLockBtn().getAttribute('value') === 'Unlock') {
							self.view.password.resetFunc();
							self.view.password.changeBtnValue(self.view.password.getLockBtn, 'Lock');
							self.view.password.removeDisabled(controller.view.garage.getGarageBtn());
							self.view.password.removeDisabled(controller.view.password.getSetPasswordBtn());
							self.view.password.toggleVisibility(controller.view.password.getLockedIcon(),controller.view.password.getUnlockedIcon());
							self.view.password.getChangePasswordBtn().classList.remove('hide');
					} else {
						self.view.password.showWrongPasswordBlock();
					}
				} else {
					self.view.password.closeGarageWarningShow();
				}

			}, false);
	},
	exitWrongPasswordHandler: function() {
		this.view.password.getWrongPasswordBlock().onclick = this.view.password.exitWrongPassword;
	},
	exitCloseGarageHandler: function() {
		this.view.password.getCloseGarageWarningBlock().onclick = this.view.password.closeGarageWarningHide;
	}
}
