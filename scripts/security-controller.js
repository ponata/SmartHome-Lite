var controller = {
	model: null,
	view: null,
	//tabs block
	tabsHandler: function() {
		var tabsLength = this.view.tabs.getTabLinks().length;
		var self = this;
		for (var i = 0; i < tabsLength; i++) {
			self.view.tabs.getTabLinks()[i].addEventListener('click', function(event) {
				self.view.tabs.getTabCont(event);
			}, false);
		}
	},
	//garage block
	garageHandler: function() {
		var self = this;
		this.view.garage.getGarageBtn().addEventListener ('click',
		function(event) {
			event.preventDefault();
			if (self.model.garage.isClosed == true) {
				self.model.garage.isClosed = false;
				self.view.garage.openProcessFunc();
			} else {
				self.model.garage.isClosed = true;
				self.view.garage.closeProcessFunc();
			}
		}, false);
	},
	//camera block
	cameraHandler: function() {
		this.view.camera.getFullScreenBtn().onclick = this.view.camera.enterFullScreen.bind(this.view.camera);
	},
	addCameraHandler: function() {
		this.view.camera.getAddNewCameraBtn().onclick = this.view.camera.showCameraFormBlock.bind(this.view.camera);
	},
	removeCameraHandler: function() {
		this.view.camera.getRemoveCameraFormBlock().onclick = this.view.camera.hideCameraFormBlock.bind(this.view.camera);
	},
	fillInCameraModel: function() {
		var newCamera = new controller.NewCameraConstructor(this.view.camera.getCameraNameValue(), this.view.camera.getCameraPathValue());
		this.model.camera.push(newCamera);
	},
	hideCameraHandler: function() {
		var self = this;
		this.view.camera.getCameraSubmitBtn().addEventListener('submit', function(e) {
			e.preventDefault();
			self.fillInCameraModel();
			self.view.camera.hideCameraFormBlock();
			self.view.camera.addCameraInnerHTML();
			self.setVideoBtnIdHandler();
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
		var self = this;
		this.view.camera.getCameraBlock().addEventListener('click', function(e) {
			var target = e.target;
			var dataNumber = target.getAttribute('data-number');
			var dataNumberRemove = target.getAttribute('data-number-remove');
			if (target.hasAttribute('data-number')){
				var video = target.previousElementSibling.previousElementSibling.firstElementChild;
				if (self.model.camera[dataNumber].isOn == true){
					self.model.camera[dataNumber].isOn = false;
					video.classList.add('hide-video');
					self.view.camera.changeCameraBtnInner(target, true);
				} else{
					self.model.camera[dataNumber].isOn = true;
					video.classList.remove('hide-video');
					self.view.camera.changeCameraBtnInner(target, false);
				}
			} else if (target.hasAttribute('data-number-remove')) {
				var block = target.parentElement;
				self.model.camera.splice([dataNumberRemove],1);
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
		if (e.target.getAttribute('data-td') === 'true'){
		self.view.password.setCurrentPassValue();
		self.view.password.putPassword();
		}
	},
	getPasswordStatus: function(){
		var status = this.model.password.passwordStatus;
		return status;
	},
	inputPassHandler: function() {
		if (this.model.password.passwordStatus == false) {
			this.i = 1;
		} else {
			this.i = 0;
		};
		var self = this;
		this.view.password.getTable()[this.i].removeEventListener('click',
				self.inputPassHandlerFunc);
		this.view.password.getTable()[this.i].addEventListener('click',
			self.inputPassHandlerFunc, false);
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
			self.view.password.getPasswordBlock().classList.remove('hide');
		}, false);
	},
	changePasswordBlockHandler: function() {
		var self = this;
		this.view.password.getChangePasswordBtn().addEventListener('click', function() {
			self.view.password.getPasswordBlock().classList.add('hide');
			self.view.password.showChangePasswordBlock();
			self.model.password.passwordStatus = false;
			self.model.password.currentPassword= '';
		}, false);
	},
	//lock/unlock process
	lockHandler: function() {
		var self = this;
		this.view.password.getLockBtn().addEventListener('click',
			function(event) {
				if (self.model.garage.isClosed == true) {
					if(self.view.password.getCurrentInputValue() === self.model.password.currentPassword
						&& self.view.password.getLockBtn().getAttribute('value') === 'Lock') {
							self.view.password.resetFunc();
							self.view.password.changeBtnValue(self.view.password.getLockBtn,'Unlock');
							self.view.password.addDisabled(self.view.garage.getGarageBtn());
							self.view.password.addDisabled(self.view.password.getSetPasswordBtn());
							self.view.password.toggleVisibility(self.view.password.getUnlockedIcon(),self.view.password.getLockedIcon());
							self.view.password.getChangePasswordBtn().classList.add('hide');
					} else if (self.view.password.getCurrentInputValue() === self.model.password.currentPassword
						&& self.view.password.getLockBtn().getAttribute('value') === 'Unlock') {
							self.view.password.resetFunc();
							self.view.password.changeBtnValue(self.view.password.getLockBtn, 'Lock');
							self.view.password.removeDisabled(self.view.garage.getGarageBtn());
							self.view.password.removeDisabled(self.view.password.getSetPasswordBtn());
							self.view.password.toggleVisibility(self.view.password.getLockedIcon(),self.view.password.getUnlockedIcon());
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
