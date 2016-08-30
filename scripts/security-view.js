var view = {
	//garage block
	garage: {
		getGarageBtn: function() {
			return document.getElementById('garage-btn');
		},
		getGarageGates: function() {
			return document.querySelector('.garage-gates');
		},
		openGates: function() {
			this.getGarageGates().classList.add('open-gates');
			this.getGarageGates().classList.remove('close-gates');
		},
		closeGates: function() {
			this.getGarageGates().classList.add('close-gates');
			this.getGarageGates().classList.remove('open-gates');
		},
		changeBtnValue: function(callback, newValue) {
			callback().setAttribute('value', newValue);
		},
		addDisabled: function(element) {
			element.setAttribute('disabled', '');
		},
		removeDisabled: function(element) {
			element.removeAttribute('disabled');
		}
	},

	//camera block
	camera: {
		getCameraBlock: function() {
			return document.querySelector('.camera-block');
		},
		/*getVideoContainerBlock: function() {
			return document
		},*/
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
			var self = controller.view.camera;
			self.getCameraFormBlock().classList.add('show');
		},
		hideCameraFormBlock: function() {
			var self = controller.view.camera;
			self.getCameraFormBlock().classList.remove('show');
		},
		getCameraPathValue: function() {
			return document.getElementById('camera-path').value;
		},
		getCameraNameValue: function() {
			//console.log(document.getElementById('camera-name').value);
			return document.getElementById('camera-name').value;
		},

		addCameraInnerHTML: function() {
			var div = document.createElement('div');
			div.className = "video-container";
			div.innerHTML = '<div class="screen"><video autoplay loop muted controls><source src="' + controller.view.camera.getCameraPathValue() +
			'" type="">Your browser does not support the video tag.</video></div><button class="remove-video-btn">&#10006;</button><button id="btnCamera1" class="video-btn">&#9632;</button>';
			this.getCameraBlock().insertBefore(div, controller.view.camera.getFullScreenBtn());
		},
		changeCameraBtnInner: function(target, isOn) {
			if (isOn == true){
				target.innerHTML = '&#9658;';
			} else {
				target.innerHTML = '&#9632;';
			}
		},
		srcCompare: function(targetVideo, btnCamera) {
			var video = document.getElementById(targetVideo).parentElement;
			var temp = document.getElementById(targetVideo);
			var source = temp.getAttribute('src');
			if (source === '../img/') {
				temp.setAttribute('src', controller.model.camera[btnCamera]);
			} else {
				temp.setAttribute('src', '../img/');
			}
			video.load();
			video.play();
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
			self = controller.view.camera;// bind?
			if (self.getCameraBlock().webkitRequestFullScreen) {
    			self.getCameraBlock().webkitRequestFullScreen();
			} else {
    			self.getCameraBlock().mozRequestFullScreen();
			}
			self.getCameraBlock().classList.add('full-screen-camera-block');
			self.getFullScreenBtn().onclick = self.exitFullScreen;
		},
		exitFullScreen: function() {
			self = controller.view.camera;
			self.cancelFullScreenFunc();
			self.getCameraBlock().classList.remove('full-screen-camera-block');
			self.getFullScreenBtn().onclick = self.enterFullScreen;
		}
	},

	//password block
	password: {
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
			var self = controller.view.password;
			self.getWrongPasswordBlock().classList.add('show');
			console.log(self.getWrongPasswordBlock());
		},
		exitWrongPassword: function() {
			var self = controller.view.password;
			self.getWrongPasswordBlock().classList.remove('show');
		},
		showChangePasswordBlock: function() {
			console.log('click');
			var self = controller.view.password;
			self.getPasswordBlock().classList.add('tab-content');
			self.getSetPasswordBlock().classList.remove('hide');
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
			var self = controller.view.password;
			self.getInputPassword().setAttribute('value', self.setCurrentPassValue());
		},
		resetFunc: function() {
			var self = controller.view.password;
			self.getInputPassword().setAttribute('value', '');
			var a = self.getCurrentInputValue();
			return a = '';
		},
		resetLastSymbol: function() {
			var temp = controller.view.password.getInputPassword().getAttribute('value');
			var newVal = temp.substring(0, temp.length - 1);
			controller.view.password.getInputPassword().setAttribute('value', newVal);
			var a = controller.view.password.getCurrentInputValue();
			return a = '';
		},
		addDisabled: function(element) {
			element.setAttribute('disabled', '');
			//add some interactive elements of disability
		},
		removeDisabled: function(element) {
			element.removeAttribute('disabled');
		}
		
				
	}	
}