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
		getFullScreenBtn: function() {
			return document.getElementById('full-screen-btn');
		},
		getVideoBtn: function() {
			return document.getElementById('video-btn');
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
		turnOnOffCamera: function(e) {
			var target = e.target.getAttribute('id');
			/*self = controller.view.cameraView;
			self = this;*/
			// add data-attribures
			switch(target){
				case 'btnCamera1':
					this.srcCompare('video1', target);
				break;
				case 'btnCamera2':
					this.srcCompare('video2', target);
				break;
				case 'btnCamera3':
					this.srcCompare('video3', target);
				break;
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
			return document.querySelector('.password-table');
		},
		getLockBtn: function() {
			return document.getElementById('lock');
		},
		resetBtn: function() {
			return document.querySelector('[data-td="reset"]');
		},
		getSetPasswordBtn: function() {
			return document.getElementById('set-password');
		},
		generateUniqueNumbers: function() {
			for (var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], i = a.length; i--; ) {
    			var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    			this.getTd()[i].innerHTML = random;
			};
		},
		getInputPassword: function() {
			return document.querySelector('[type="password"]');
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
			var self = controller.view.password;
			self.getInputPassword().setAttribute('value', '');
			var a = self.getCurrentInputValue();
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