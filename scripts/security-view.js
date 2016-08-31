var view = {
	//garage block
	garage: {
		getGarageBtn: function() {
			return document.getElementById('garage-btn');
		},
		getGarageGates: function() {
			return document.querySelector('.garage-gates');
		},
		init: function() {
				for (var key in this) {
					if(typeof this[key] == 'function') {
						this[key] = this[key].bind(this);
					}
				}
		},
		openGates: function() {
			var id = setInterval(opening, 75);
			var hght = 100;
			var self = this;
			var elem = self.getGarageGates();
			function opening() {
				if (hght == 0) {
					clearInterval(id);
				} else {
					hght--;
					elem.style.height = hght + '%';
				}
			}
		},
		closeGates: function() {
			var id = setInterval(closing, 75);
			var hght = 0;
			var self = this;
			var elem = self.getGarageGates();
			function closing() {
				if (hght == 100) {
					clearInterval(id);
				} else {
					hght++;
					elem.style.height = hght + '%';
				}
			}
		},
		changeBtnValue: function(callback, newValue) {
			callback().setAttribute('value', newValue);
		},
		addDisabled: function(element) {
			element.setAttribute('disabled', '');
		},
		removeDisabled: function(element) {
			element.removeAttribute('disabled');
		},
		openProcessFunc: function() {
			this.openGates();
			this.changeBtnValue(this.getGarageBtn, 'Opening...');
			this.addDisabled(this.getGarageBtn());
			var self = this;
			setTimeout(function() {
				self.changeBtnValue(self.getGarageBtn, 'Close');
				self.removeDisabled(self.getGarageBtn());
			}, 7500);
		},
		closeProcessFunc: function() {
			this.closeGates();
			this.changeBtnValue(this.getGarageBtn, 'Closing...');
			this.addDisabled(this.getGarageBtn());
			var self = this;
			setTimeout (function() {
				self.changeBtnValue(self.getGarageBtn, 'Open');
				self.removeDisabled(self.getGarageBtn());
			}, 7500);
		}
	},
	//camera block
	camera: {
		init: function() {
				for (var key in this) {
					if(typeof this[key] == 'function') {
						this[key] = this[key].bind(this);
					}
				}
		},
		getCameraBlock: function() {
			return document.querySelector('.camera-block');
		},
		getFullScreenBtn: function() {
			return document.getElementById('full-screen-btn');
		},
		getVideoBtn: function() {
			return document.querySelectorAll('.video-btn');
		},
		getRemoveVideoBtn: function() {
			return document.querySelectorAll('.remove-video-btn');
		},
		setVideoBtnId: function() {
			for (var i = 0; i < this.getVideoBtn().length; i++) {
				this.getVideoBtn()[i].setAttribute('data-number', i);
				this.getRemoveVideoBtn()[i].setAttribute('data-number-remove', i);
			}
		},
		getVideoBtnNewId: function() {
			return document.querySelectorAll('[data-number]');
		},
		getRemoveCameraFormBlock: function() {
			return document.querySelector('.remove-camera-form-block-btn');
		},
		getAddNewCameraBtn: function() {
			return document.getElementById('new-camera');
		},
		getCameraFormBlock: function() {
			return document.querySelector('.camera-form-block');
		},
		getCameraSubmitBtn: function() {
			return document.getElementById('camera-submit');
		},
		showCameraFormBlock: function() {
			console.log(this);
			this.getCameraFormBlock().classList.add('show');
		},
		hideCameraFormBlock: function() {
			this.getCameraFormBlock().classList.remove('show');
		},
		getCameraPathValue: function() {
			return document.getElementById('camera-path').value;
		},
		getCameraNameValue: function() {
			return document.getElementById('camera-name').value;
		},
		addCameraInnerHTML: function() {
			var div = document.createElement('div');
			div.className = "video-container";
			div.innerHTML = '<div class="screen"><video autoplay loop muted controls><source src="' + this.getCameraPathValue() +
			'" type="">Your browser does not support the video tag.</video></div><button class="remove-video-btn">&#10006;</button><button id="btnCamera1" class="video-btn">&#9632;</button>';
			this.getCameraBlock().insertBefore(div, this.getFullScreenBtn());
		},
		changeCameraBtnInner: function(target, isOn) {
			if (isOn == true){
				target.innerHTML = '&#9658;';
			} else {
				target.innerHTML = '&#9632;';
			}
		},
		getVideo: function(video) {
			return document.getElementById(video);
		},
		cancelFullScreenFunc: function() {
			document.cancelFullScreen = document.webkitCancelFullScreen
			|| document.mozCancelFullScreen;
			document.cancelFullScreen();
		},
		enterFullScreen: function() {
			if (this.getCameraBlock().webkitRequestFullScreen) {
    			this.getCameraBlock().webkitRequestFullScreen();
			} else {
    			this.getCameraBlock().mozRequestFullScreen();
			}
			this.getCameraBlock().classList.add('full-screen-camera-block');
			this.getFullScreenBtn().onclick = this.exitFullScreen.bind(this);
		},
		exitFullScreen: function() {
			this.cancelFullScreenFunc();
			this.getCameraBlock().classList.remove('full-screen-camera-block');
			this.getFullScreenBtn().onclick = this.enterFullScreen.bind(this);
		}
	},
	//password block
	password: {
		init: function() {
				for (var key in this) {
					if(typeof this[key] == 'function') {
						this[key] = this[key].bind(this);
					}
				}
		},
		getLockedIcon: function() {
			return document.getElementById('locked');
		},
		getUnlockedIcon: function() {
			return document.getElementById('unlocked');
		},
		toggleVisibility: function(id1, id2) {
			id1.style.display = 'none';
			id2.style.display = 'block';
		},
		getTd: function() {
			return document.querySelectorAll('[data-td="true"]');
		},
		getTable: function() {
			return document.querySelectorAll('.password-table');
		},
		getUnlockSvg: function() {
			return document.getElementById('unlocked');
		},
		changeUnlockSvgColor: function() {
			document.querySelectorAll('#unlocked svg g g path')[0].setAttribute('fill', '#87C540');
			document.querySelectorAll('#unlocked svg g g path')[1].setAttribute('fill', '#87C540');
		},
		getLockBtn: function() {
			return document.getElementById('lock');
		},
		getChangePasswordBtn: function() {
			return document.getElementById('change-password');
		},
		resetBtn: function() {
			return document.querySelectorAll('[data-td="reset"]');
		},
		getSetPasswordBlock: function() {
			return document.querySelector('.set-password-block');
		},
		getPasswordBlock: function() {
			return document.querySelector('.password-block');
		},
		resetLastSymbBtn: function() {
			return document.querySelectorAll('[data-td="reset-last"]');
		},
		getSetPasswordBtn: function() {
			return document.getElementById('set-password');
		},
		getWrongPasswordBlock: function() {
			return document.querySelector('.wrong-password-block');
		},
		showWrongPasswordBlock: function() {
			this.getWrongPasswordBlock().classList.add('show');
		},
		exitWrongPassword: function() {
			this.getWrongPasswordBlock().classList.remove('show');
		},
		showChangePasswordBlock: function() {
			this.getPasswordBlock().classList.add('tab-content');
			this.getSetPasswordBlock().classList.remove('hide');
		},
		generateUniqueNumbers: function() {
			for (var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], i = a.length; i--; ) {
    			var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    			this.getTd()[i].innerHTML = random;
			};
		},
		getInputPassword: function() {
			var j;
			if (controller.getPasswordStatus()) {
				j = 0;
			} else {
				j = 1;
			}
			return document.querySelectorAll('[type="password"]')[j];
		},
		getCurrentInputValue: function() {
			return this.getInputPassword().getAttribute('value');
		},
		setCurrentPassValue: function() {
			var temp = this.getCurrentInputValue();
			temp += event.target.innerHTML;
			return temp;
		},
		changeBtnValue: function(callback, newValue) {
			callback().setAttribute('value', newValue);
		},
		putPassword: function() {
			this.getInputPassword().setAttribute('value', this.setCurrentPassValue());
		},

		resetFunc: function() {
			this.getInputPassword().setAttribute('value', '');
			var a = this.getCurrentInputValue();
			return a = '';
		},
		resetLastSymbol: function() {
			var temp = this.getInputPassword().getAttribute('value');
			var newVal = temp.substring(0, temp.length - 1);
			this.getInputPassword().setAttribute('value', newVal);
			var a = this.getCurrentInputValue();
			return a = '';
		},
		addDisabled: function(element) {
			element.setAttribute('disabled', '');
		},
		removeDisabled: function(element) {
			element.removeAttribute('disabled');
		},
		getCloseGarageWarningBlock: function() {
			return document.querySelector('.close-garage-warning-block');
		},
		closeGarageWarningShow: function() {
			this.getCloseGarageWarningBlock().classList.add('show');
		},
		closeGarageWarningHide: function() {
			this.getCloseGarageWarningBlock().classList.remove('show');
		}
	},
	tabs: {
		getTabLinks: function() {
			return document.querySelectorAll('object');
		},
		getSections: function() {
			return document.querySelectorAll('.tab-content');
		},
		getTarget: function(elem) {
			return elem.getAttribute('data-tabholder').replace('#', '');
		},
		getTabCont: function(event) {
			var elem = event.currentTarget;
			self.view.password.getPasswordBlock().classList.add('tab-content');
			var testTarg = this.getTarget(elem);
			var sectionLength = this.getSections().length;
			for (var j = 0; j < sectionLength; j++) {
				this.getSections()[j].style.display = 'none';
			}
			document.getElementById(testTarg).style.display = 'block';
			for (var k = 0; k < controller.tabsLength; k++) {
				this.getTabLinks()[k].removeAttribute('class');
			}
			elem.setAttribute('class', 'is-active');
			return false;
		}
	}
}
